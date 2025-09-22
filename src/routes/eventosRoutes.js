import express from "express";
import { getAllEventos, getEventoById, createEvento, updateEvento, deleteEvento } from "../controllers/eventosController.js";


const router = express.Router();

// Rotas para barbies - todas usando ID quando necessário
router.get("/:id", getEventoById ); 
router.get("/", getAllEventos );              
router.post("/", createEvento, ); 
router.put("/:id", updateEvento);
router.delete("/:id",  deleteEvento);    

export default router;