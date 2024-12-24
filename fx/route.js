import { Router } from "express";
import { fetchApi } from "../controller.js";

const router = Router();

// Debug log
console.log("Router is being loaded.");

router.post("/api", fetchApi);

export default router;
