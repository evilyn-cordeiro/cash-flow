import { Router } from "express";
import {
  createAppointment,
  listAppointmentsByMei,
} from "../controllers/appointmentController";

const router = Router();

router.post("/create", createAppointment);
router.get("/mei/:meiId", listAppointmentsByMei);

export default router;
