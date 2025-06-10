import { Router } from "express";
import {
  createSchedule,
  listSchedulesByCustomer
} from "../controllers/appointmentController";

const router = Router();

router.post("/create", createSchedule);
router.get("/mei/:meiId", listSchedulesByCustomer);

export default router;
