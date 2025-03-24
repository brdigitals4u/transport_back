import { Request, Response } from "express";
export const Gps = (req:any, res:Response) => {
   console.log("testing")
   res.status(200).json({ data:"testing" });
}