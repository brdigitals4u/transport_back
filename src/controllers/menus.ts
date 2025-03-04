import { Request, Response } from "express";
import { prismaClient } from "..";

interface MenuItem {
  id: number;
  parent_id: number | null;
  name: string;
  path: string;
  icon: string;
  roles: string[];
  subItems?: MenuItem[];
}

export const Menus = async (req: Request, res: Response) => {
  const { role } = req.body;

  try {
    // Fetch all parent menus (parent_id = null)
    const getParentMenu = await prismaClient.menus.findMany({
      where: {
        parent_id: null,
      },
    });
    // Process each parent menu asynchronously
    const menusList = await Promise.all(
      getParentMenu
        .filter((item) => {
          const rolesArray = item.roles as string[]; // Cast roles as a string array
          return Array.isArray(rolesArray) && rolesArray.includes(role);
        })
        .map(async (menu) => {
          // Fetch submenus for each parent menu
          const subItems = await prismaClient.menus.findMany({
            where: {
              parent_id: menu.id,
            },
            orderBy:{
              id:"asc"
            }
          });
          if(subItems.length > 0){
            return {
                ...menu,
                subItems: subItems.filter((sub) => {
                  const rolesArray = sub.roles as string[];
                  return Array.isArray(rolesArray) && rolesArray.includes(role);
                }),
              };
          }
          return {
            ...menu
          };
        })
    );

    return res.status(200).json({ data: menusList });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
