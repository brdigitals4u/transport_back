import { Request, Response } from "express";
import { prismaClient } from "..";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { transporter } from "../utils/mailTransporter";
import { mailSend, mailSendUser } from "../utils/mailSend";

export const formSubmit = async (req: Request, res: Response) => {
  const { formId, formData } = req.body;
  
  try {
    if (!formId || typeof formId !== "string") {
      return res.json({ success: false, message: "Invalid table name" });
    }

    if (!formData || typeof formData !== "object") {
      return res.json({ success: false, message: "Invalid form data" });
    }
    
    const dbtable = await prismaClient.my_forms.findUnique({
      where: { formid: formId },
      select: { dbtable: true }
    });

    if (!dbtable || !dbtable.dbtable) {
      return res.json({ success: false, message: "Table not found" });
    }

    // Dynamically access the Prisma model
    const modelName = dbtable.dbtable as keyof typeof prismaClient;

    if (!prismaClient[modelName]) {
      return res.json({ success: false, message: `Table does not exist in Prisma client` });
    }

    const createdRecord = await (prismaClient[modelName] as any).create({
      data: formData,
    });
    console.log(createdRecord)
    
    if(dbtable.dbtable === "user"){
      const email = formData?.email
      const message = formData?.name;
      await mailSendUser({message, email})
    }



    return res.json({ success: true, message: "Data saved successfully", data: createdRecord });

  } catch (error: any) {
    console.error("General Error:", error);
    return res.json({ success: false, message: "Internal Server Error", error: error?.message || String(error) });
  }
};




export const SendMailFuc = async (req:any, res:Response) => {
  const { email } = req.body;

  try {
    // Reset password link
    const message = `test`;

    await mailSend({message, email})

    return res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



