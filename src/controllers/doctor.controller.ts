import { validateUserRegistration } from "../Models/Doctor";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Doctor } from "../Models/Doctor";
import { User } from "../Models/User";
import AppMail from "../services/mail/mail";

export const createDoctor = async (req: Request, res: Response) => {
    const { error } = validateUserRegistration(req.body);
    if (error) return res.status(400).json({ status: "failed", message: error.details[0].message });
  
    const userExists = Boolean(
      await Doctor.findOne({
        email: req.body.email,
      }).countDocuments()
    );
  
    if (userExists)
      return res.status(400).json({
        status: "failed",
        message: "Email is already taken",
      });
  
    const doctor = new Doctor({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      imageUrl: req.body.imageUrl,
    });
  
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    doctor.password = hashedPassword;
    await doctor.save();
    doctor.password = "";
  
    res.json({ message: 'User registerd', doctor });
  };


  // export const createReport = async(req: any, res: Response, next: NextFunction) => {
  //   const { reports } = req.body

  //   try {
  //       const user = await User.findById(req.params.id)
  //       if(!user){
  //           return res.status(404).json({message: "no user found"})
  //       }

  //       user.reports.push(reports)
  //       await user.save()

  //       const doctor = await Doctor.findById(req.user.id)
  //       if(!doctor){
  //         return res.status(404).json({message: "no user found"})
  //       }

  //       doctor.reports.push(reports)
  //       await doctor.save()

  //       new AppMail(user.email, `${user.firstname} ${user.lastname}`, "", reports).reportMessage()
  //       return res.status(201).json({message: "report successfully  created"})
  //   } catch (error) {
  //       // next(res.status(500).json({ message: "Internal server error" }))
  //       console.log(error);
  //   }
  // }


  export const createReport = async (req: any, res: Response, next: NextFunction) => {
    const { reports } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.reports.push(reports);
        await user.save();

        const doctor = await Doctor.findById(req.user.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        doctor.reports.push(reports);
        await doctor.save();

        new AppMail(user.email, `${user.firstname} ${user.lastname}`, "", reports).reportMessage();
        return res.status(201).json({ message: "Report successfully created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
