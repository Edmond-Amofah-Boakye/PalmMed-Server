import express from "express";
const router = express.Router();
import auth from "../middlewares/auth";
import restrictAcsessTo from "../middlewares/restrictAccessTo";
import {
  allReport,
  createNewReport,
  deleteReport,
  editreport,
  findOneReport,
} from "../controllers/Reports.controller";

router.post(
  "/create/report/:id",
  auth,
  restrictAcsessTo("doctor"),
  createNewReport
);
router.get("/all", auth, restrictAcsessTo("doctor"), allReport);
router.get("/:id", auth, findOneReport);
router.patch("/edit/:id", auth, restrictAcsessTo("doctor, user"), editreport);
router.patch("/edit/:id", auth, restrictAcsessTo("doctor, user"), editreport);
router.delete("/delete/:id", auth, deleteReport);

export default router;
