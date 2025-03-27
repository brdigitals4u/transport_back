import { prismaClient } from "..";

export const executeDynamicQuery = async (query: string, dependencies: any) => {
  try {
    // Replace placeholders (e.g., {country_id}) with actual values
    // Object.keys(dependencies).forEach((key) => {
    //   query = query.replace(`{${key}}`, dependencies[key]);
    // });

    // Execute the raw SQL query and explicitly cast the result

  
   
    const results = (await prismaClient.$queryRawUnsafe(query)) as { id: number; name: string }[];
    return results.map((row) => ({
      value: row.id,
      label: row.name,
    }));

  } catch (error) {
    console.error("Error executing dynamic query:", error);
    return [];
  }
};
