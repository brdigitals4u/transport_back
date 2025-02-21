import { Request, Response } from "express";
import { prismaClient } from "..";

export const Form = async (req: Request, res: Response) => {
  const { formId } = req.body;

  try {
    // Fetch the form details
    const form = await prismaClient.my_forms.findUnique({
      where: { formid: formId },
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Fetch sections
    const sections = await prismaClient.my_forms_sections.findMany({
      where: { formid: formId },
    });

    // Fetch columns
    const columns = await prismaClient.my_forms_columns.findMany({
      where: { formid: formId },
    });
    console.log(columns.length)

    // Structure sections and ensure all sections are included even if they have no columns
    const structuredSections = sections.map((section) => ({
      ...section,
      columns: columns.filter((col) => col.sectionid === section.sectionid) || [],
    }));
    console.log(structuredSections.length)

    // Build final response structure
    const result = {
      ...form,
      sections: structuredSections,
    };

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error fetching form data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
