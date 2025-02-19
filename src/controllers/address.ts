import { Request, Response } from "express";
import { prismaClient } from ".."; // Assuming this is where your Prisma client instance is imported from
import { isEmpty, omit } from "lodash";

export const GetCountry = async (req: Request, res: Response) => {
  // try {
  //   let country = await prismaClient.country.findMany({
  //     select:{
  //       id:true,
  //       name:true
  //     },
  //     orderBy: [{ name: "asc"  }],
  //   });
  //   return res.status(200).json({ country });
  // } catch (error) {
  //   return res.status(500).json({ error: "Internal server error" });
  // }
};

export const GetState = async (req: Request, res: Response) => {
    // const { country_id} = req.body;
    // try {
    //   let state = await prismaClient.state.findMany({
    //     where:{
    //         country_id:country_id
    //     },
    //     select:{
    //       id:true,
    //       name:true
    //     },
    //     orderBy: [{ name: "asc"  }],
    //   });
    //   return res.status(200).json({ state });
    // } catch (error) {
    //   return res.status(500).json({ error: "Internal server error" });
    // }
  };

  export const GetCity2 = async (req: Request, res: Response) => {
    // const { state_id} = req.body;
    // try {
    //   let city = await prismaClient.city.findMany({
    //     where:{
    //         state_id:state_id
    //     },
    //     select:{
    //       id:true,
    //       name:true
    //     },
    //     orderBy: [{ name: "asc"  }],
    //   });

    //   return res.status(200).json({ city });
    // } catch (error) {
    //   return res.status(500).json({ error: "Internal server error" });
    // }
  };

