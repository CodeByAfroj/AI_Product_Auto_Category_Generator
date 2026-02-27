import express from "express";
import {createProduct} from "../controller/pController.js";


const router = express.Router();

router.post("/create", createProduct);

export default router;
