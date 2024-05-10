import { NextFunction, Request, Response } from "express";
import { Prediction } from "../Models/Predictions";
import axios from "axios";
import { User } from "../Models/User";

export const predict = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    const response = await axios.post(
      "https://palmmed.onrender.com/predict",
      req.body
    );

    // const newBody = {
    //   ...req.body,
    //   ...response.data
    // }

    // console.log(newBody)

    const newbody = {
      ...req.body,
      ...response.data,
    };

    const finalBody = {
      patient_report: newbody,
    };

    const finalJSON = JSON.stringify(finalBody);
    console.log(finalJSON);
    

    if (response.data) {
      const reponseData = await axios.post(
        "https://hearty-o4ui.onrender.com/api/v1/llm/predict",
        finalBody
      );
      const results = await Prediction.create({
        ...req.body,
        doctor_id: req.user.id,
        prediction: response.data,
        user_id: user._id,
        ai_assisted_text: reponseData.data,
      });
      
      if (!results) {
        return res.status(400).json({ message: "prediction failed" });
      }
      return res.status(201).json({ resData: reponseData.data, results });
    }
  } catch (error) {
    console.log(error);
  }
};

export const findAll = async (req: any, res: Response) => {
  try {
    const data = await Prediction.find()
      .populate("user_id")
      .populate("doctor_id")
      .exec();
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
