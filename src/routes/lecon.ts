import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const LeconController = require("../controllers/LeconController");


router.get("/", LeconController.getAllLecons);
router.post("/", LeconController.createLecon);
router.get("/:id", LeconController.getLeconById);
router.put("/:id", LeconController.updateLecon);
router.delete("/:id", LeconController.deleteLecon);



export const leconRouter = router;
