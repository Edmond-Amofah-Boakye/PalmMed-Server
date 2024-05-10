import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import {
  User,
  validateUserLogin,
  validateUserRegistration,
  validateUserPasswordReset,
  validateUserPasswordDetails,
} from "../Models/User";
import AppMail from "../services/mail/mail";
import { IUser } from "../../shared/user";
import { Doctor } from "../Models/Doctor";
interface CustomRequest extends Request {
  user?: IUser;
}

export const createUser = async (req: Request, res: Response) => {
  const { error } = validateUserRegistration(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: "failed", message: error.details[0].message });

  const userExists = Boolean(
    await User.findOne({
      email: req.body.email,
    }).countDocuments()
  );

  const doctorExists = Boolean(
    await Doctor.findOne({
      email: req.body.email,
    }).countDocuments()
  );

  if (userExists || doctorExists)
    return res.status(400).json({
      status: "failed",
      message: "Email is already taken",
    });

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
  });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;

  await user.save();

  user.password = "";

  res.json({ message: "User registerd", user });
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateUserLogin(req.body);
  if (error)
    return res.status(400).json({
      status: "failed",
      message: error.details[0].message,
    });

  let user;

  user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = await Doctor.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ status: "failed", message: "Invalid email or password." });
  }

  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid email or password." });

  const token = jwt.sign({ id: user._id }, `${process.env.JWT_PRIVATE_KEY}`);
  // , {expiresIn: "15m"}

  res
    .status(200)
    .json({
      status: "success",
      message: "Successfully logged in",
      token: token,
      role: user.role,
    });
};

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};

//update use profile
export const updateUserProfile = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    let user;
    user = await User.findById(userId);

    if (!user) {
      user = await Doctor.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.imageUrl = req.body.imageUrl || user.imageUrl;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { error } = validateUserPasswordReset(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user;
  user = await User.findOne({ email });
  if (!user) {
    user = await Doctor.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
  }

  try {
    const token = generateResetToken();

    user.resetToken = token;
    user.tokenExpiration = Date.now() + 10 * 60 * 1000;
    await user.save();

    const link = `http://localhost:5173/password/reset/${user.resetToken}`;
    new AppMail(user.email, user.firstname, link).resetEmailMessage();
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (emailError) {
    return res.status(500).json({ message: "Failed to send reset email" });
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userTokenFound;

    userTokenFound = await User.findOne({ resetToken: req.params.token });
    if (!userTokenFound) {
      userTokenFound = await Doctor.findOne({ resetToken: req.params.token });

      if (!userTokenFound) {
        return res.status(404).json({ message: "token do not exist" });
      }
    }

    if (
      userTokenFound.tokenExpiration !== undefined &&
      Date.now() > userTokenFound.tokenExpiration
    ) {
      return res.status(400).json({ message: "Link has expired" });
    }
    return res.status(200).json({ message: "proceed to reset password" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const { error } = validateUserPasswordDetails(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let userExists;
    userExists = await User.findOne({ resetToken: req.params.token });
    if (!userExists) {
      userExists = await Doctor.findOne({ resetToken: req.params.token });
      if (!userExists) {
        return res.status(404).json({ message: "no user with toke found" });
      }
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    userExists.password = hashedPassword;
    await userExists.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const findMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    let user;
    user = await User.findById(req.user.id)
      .populate({
        path: "reports",
        populate: {
          path: "prediction_id",
          populate: {
            path: "doctor_id",
          },
        },
      })
      .exec();

    if (!user) {
      user = await Doctor.findById(req.user.id)
        .populate({
          path: "reports",
          populate: {
            path: "prediction_id",
            populate: {
              path: "doctor_id",
            },
          },
        })
        .exec();
      if (!user) {
        return res.status(200).json({ message: "no user found", user });
      }
    }

    user.password = "";

    res.status(200).json({
      message: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find()
      .populate({
        path: "reports",
        populate: [{ path: "prediction_id", populate: { path: "doctor_id" } }],
      })
      .exec();

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .populate({
        path: "reports",
        populate: [{ path: "prediction_id" }],
      })
      .exec();

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with the provided ID" });
    }
    user.password = "";
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
