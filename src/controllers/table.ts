import { Request, Response } from "express";
import { prismaClient } from "..";
import moment from "moment";
import ImageKit from "imagekit";
import { dataSet } from "./dataset/dataSet";


// interface TableDataResponse {
//   headers: { field: string; headerName: string; width: number }[];
//   data: any[];
// }

export const TableData = async (req: any, res: Response) => { 
  const { formId, formIntData } = req.body;
  const userId = req.userId;
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

    if (!tableInfo || !tableInfo.dbtable) {
      console.error("Error: Table not found for formId:", validFormId);
      return { headers: [], data: [] };
    }

    const fields = await prismaClient.my_forms_columns.findMany({
      where: { formid: validFormId, listview:1 },
      select: {
        field: true,
        title: true,
        selectqry:true
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
      // { field: "createdAt", headerName: "Create Date", width: 200 },
      // { field: "updatedAt", headerName: "Update Date", width: 200 },
    ];
    
  
    const rawData = await prismaClient.$queryRawUnsafe<any[]>(`SELECT * FROM "${tableInfo.dbtable}"`);
    


    const lookupData: Record<string, Record<string, string>> = {};


for (const field of fields) {
  if (field.selectqry) {
    const result = await prismaClient.$queryRawUnsafe<any[]>(field.selectqry);
    
    // Store lookup data as { id: name }
    lookupData[field.field] = result.reduce((acc, row) => {
      acc[row.id] = row.name; // Assuming the select query returns { id, name }
      return acc;
    }, {} as Record<string, string>);
  }
}


// Transform `rawData` by replacing ID fields with actual names
const transformedData = rawData.map((row) => {
  const newRow = { ...row };
  
  for (const field of fields) {
    if (lookupData[field.field]) {
      newRow[field.field] = lookupData[field.field][row[field.field]] || row[field.field];
    }
  }

  return newRow;
});

    // console.log("field data+++++++++++++++++++++++",fields)
    // console.log("rowData+++++++++++++++++++++++", transformedData)


    // ✅ Format date fields using moment.js
    const data = transformedData.map((row: any) => ({
      ...row,
      createdAt: row.createdAt ? moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") : null,
      updatedAt: row.updatedAt ? moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss") : null,
    }));

    const {f_headers, f_data } = await dataSet({formId, allHeaders, data, userId})  

    return res.status(200).json({ headers: f_headers, data:f_data } as any); // ✅ Correct return structure
  } catch (error: any) {
    console.error("Error fetching table data:", error.message);
    return { headers: [], data: [] };
  }
}


export const getEditData = async (req: Request, res: Response) => { 
  const { formId, editId, target } = req.body;
  console.log(formId, editId, target)
  try {
    if (!formId) {
      console.error("Error: formId is missing or undefined");
      return { data: [] };
    }
    if (!formId) {
      console.error("Error: formId must be a valid number");
      return { data: [] };
    }
    const tableInfo = await prismaClient.my_forms.findUnique({
      where: { formid: formId },
      select: { dbtable: true },
    });
    if (!tableInfo || !tableInfo.dbtable) {
      console.error("Error: Table not found for formId:", formId);
      return { data: [] };
    }
    if(target === "edit"){
      const data = await prismaClient.$queryRawUnsafe<any[]>(`SELECT * FROM "${tableInfo.dbtable}" WHERE id=${editId}`);
      console.log(data)
       return res.status(200).json({ data:data } as any); 
    }
    if(target === "delete"){
       await prismaClient.$queryRawUnsafe<any[]>(`DELETE FROM "${tableInfo.dbtable}" WHERE id=${editId}`);
       return res.status(200).json({ message: "Record deleted successfully", dataDelete:true } as any); 
    }
    return res.status(400).json({ error: "Invalid target action" });
  } catch (error: any) {
    console.error("Error fetching table data:", error.message);
    return { data: [] };
  }
}



const imagekit = new ImageKit({
  publicKey: 'public_Hz2jf25tEf60/CkNVogH4eJrYsA=',
  privateKey: 'private_phGhIl4tFeX3oHV6iPgpIJSmEfs=',
  urlEndpoint: 'https://ik.imagekit.io/dileepskb350',
});

export const imageUpload = async (req: Request, res: Response) => { 
  const authParams = imagekit.getAuthenticationParameters();
  res.send(authParams);
}