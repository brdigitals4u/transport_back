import { Request, Response } from "express";
import { prismaClient } from "..";

export const Form = async (req: Request, res: Response) => {
  const { formId } = req.body;

  try {
    // Fetch form details
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

    // Map columns to their respective sections
    const sectionColumnsMap = new Map<string, any[]>();
    const columnsWithoutSection: any[] = [];

    columns.forEach((column) => {
      if (column.sectionid) {
        if (!sectionColumnsMap.has(column.sectionid)) {
          sectionColumnsMap.set(column.sectionid, []);
        }
        sectionColumnsMap.get(column.sectionid)?.push(column);
      } else {
        columnsWithoutSection.push(column);
      }
    });

    // Structure sections with columns
    const structuredSections = sections.map((section) => ({
      ...section,
      columns: sectionColumnsMap.get(section.sectionid) || [],
    }));

    // Build final response
    const result: any = {
      formid: form.formid,
      title: form.title,
      sections: structuredSections,
    };

    // If there are columns without a section, include them separately
    if (columnsWithoutSection.length > 0) {
      result.columns = columnsWithoutSection;
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error fetching form data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
