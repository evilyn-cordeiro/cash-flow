import { Router } from "express";
import {
  createService,
  listServices,
} from "../controllers/serviceController";

const router = Router();

router.post("/create", createService);
router.get("/", listServices);

export default router;
