import { Router } from "express";
// import { isFirstLogin } from "../controller/auth.controller";
// import verifyToken from "../../middleware/verifyGoogle";

const prescriptionRouter = Router();


prescriptionRouter.get("/", (req, res) => {
    res.send("Hello, World!");
});

prescriptionRouter.post("/", (req, res) => {
    
});


export default prescriptionRouter;
