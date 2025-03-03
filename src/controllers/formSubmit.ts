import { Request, Response } from "express";
import { prismaClient } from "..";

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

    return res.json({ success: true, message: "Data saved successfully", data: createdRecord });

  } catch (error: any) {
    console.error("General Error:", error);
    return res.json({ success: false, message: "Internal Server Error", error: error?.message || String(error) });
  }
};
