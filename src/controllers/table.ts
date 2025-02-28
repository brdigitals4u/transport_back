import { Request, Response } from "express";
import { prismaClient } from "..";
import moment from "moment";

// interface TableDataResponse {
//   headers: { field: string; headerName: string; width: number }[];
//   data: any[];
// }

export const TableData = async (req: Request, res: Response) => { 
  const { formId } = req.body;
  console.log(formId)
  try {
    if (!formId) {
      console.error("Error: formId is missing or undefined");
      return { headers: [], data: [] };
    }

    const validFormId = formId; // Convert to number as per schema
    if (!validFormId) {
      console.error("Error: formId must be a valid number");
      return { headers: [], data: [] };
    }

    const tableInfo = await prismaClient.my_forms.findUnique({
      where: { formid: validFormId },
      select: { dbtable: true },
    });
    console.log("testing ------",tableInfo)

    if (!tableInfo || !tableInfo.dbtable) {
      console.error("Error: Table not found for formId:", validFormId);
      return { headers: [], data: [] };
    }

    const fields = await prismaClient.my_forms_columns.findMany({
      where: { formid: validFormId },
      select: {
        field: true,
        title: true,
      },
      orderBy: { sortno: "asc" },
    });

    const headers = fields.map((field) => ({
      field: field.field,
      headerName: field.title ?? "",
      width:150
    }));

    const allHeaders = [
      { field: "id", headerName: "Id"  },
      ...headers,
      { field: "createdAt", headerName: "Create Date", width: 200 },
      { field: "updatedAt", headerName: "Update Date", width: 200 },
    ];

    // ✅ Correct way to query a dynamic table name in Prisma
    //const rawData = await moment.$queryRawUnsafe<any[]>(`SELECT * FROM "${tableInfo.dbtable}"`);
    const rawData = await prismaClient.$queryRawUnsafe<any[]>(`SELECT * FROM "${tableInfo.dbtable}"`);


    // ✅ Format date fields using moment.js
    const data = rawData.map((row: any) => ({
      ...row,
      createdAt: row.createdAt ? moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") : null,
      updatedAt: row.updatedAt ? moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss") : null,
    }));

   // console.log("Fetched Data:", allHeaders, data);
    
    return res.status(200).json({ headers: allHeaders, data } as any); // ✅ Correct return structure
  } catch (error: any) {
    console.error("Error fetching table data:", error.message);
    return { headers: [], data: [] };
  }
}
