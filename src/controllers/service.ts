import { Request, Response } from "express";
import { prismaClient } from ".."; // Assuming this is where your Prisma client instance is imported from
import { isEmpty, omit } from "lodash";
import { configServices } from "docker-compose";

export const GetCity = async (req: Request, res: Response) => {
  const { name,id } = req.body;
  console.log("Dileep -------------------------",id)
  // try {
  //   let cities = await prismaClient.city.findMany({
  //     where: {
  //       OR: [
  //         {
  //           id:id
  //         },
  //         {
  //           name: {
  //             mode: "insensitive",
  //             startsWith: name,
  //           },
  //         },
  //         {
  //           state: {
  //             name: {
  //               mode: "insensitive",
  //               startsWith: name,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       state: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //       country: {
  //         select: {
  //           id:true,
  //           name: true,
  //         },
  //       },
  //     },
  //     orderBy: [{ name: "asc" }, { state: { name: "asc" } }],
  //   });
  //   const citilist = cities.map((city) =>
  //     omit(city, [
  //       "state_id",
  //       "state_code",
  //       "country_id",
  //       "country_code",
  //       "created_at",
  //       "updated_at",
  //       "wikiDataId",
  //     ])
  //   );

    
  //   return  res.status(200).json({ citilist });
  // } catch (error) {
  //   return res.status(500).json({ error: "Internal server error" });
  // }
};

export const Course = async (req: Request, res: Response) => {
  // const { name } = req.body;
  // try {
  //   let Course = await prismaClient.course.findMany({
  //     where: {
  //       name: {
  //         mode: "insensitive",
  //         startsWith: name,
  //       },
  //     },
  //     orderBy: [{ name: "asc" }],
  //   });
  //   return res.status(200).json({ Course });
  // } catch (error) {
  //   return res.status(500).json({ error: "Internal server error" });
  // }
};

export const Classtype = async (req: Request, res: Response) => {
    // const { name } = req.body;
    // try {
    //   let classTypeList = await prismaClient.classtype.findMany({
    //     where: {
    //       name: {
    //         mode: "insensitive",
    //         startsWith: name,
    //       },
    //     },
    //     orderBy: [{ name: "asc" }],
    //   });
    //   return res.status(200).json({ classTypeList });
    // } catch (error) {
    //   return res.status(500).json({ error: "Internal server error" });
    // }
  };

  export const Timing = async (req: Request, res: Response) => {
    // const { name } = req.body;
    // try {
    //   let timingList = await prismaClient.timing.findMany({
    //     where: {
    //       name: {
    //         mode: "insensitive",
    //         startsWith: name,
    //       },
    //     },
    //     orderBy: [{ name: "asc" }],
    //   });
    //   return res.status(200).json({ timingList });
    // } catch (error) {
    //   return res.status(500).json({ error: "Internal server error" });
    // }
  };
  export const Education = async (req: Request, res: Response) => {
    // const { name } = req.body;
    // try {
    //   let educationList = await prismaClient.education.findMany({
    //     where: {
    //       name: {
    //         mode: "insensitive",
    //         startsWith: name,
    //       },
    //     },
    //     orderBy: [{ name: "asc" }],
    //   });
    //   return res.status(200).json({ educationList });
    // } catch (error) {
    //   return res.status(500).json({ error: "Internal server error" });
    // }
  };

export const GetTutorsFilter = async (req: Request, res: Response) => {
  // const {
  //   courseId = [],
  //   timing = [],
  //   classType = [],
  //   education = [],
  //   cityId,
  //   tutorId,
  // } = req.body;
  // try {
  //   const whereClause: any = { cityId };

  //   if (!isEmpty(courseId)) {
  //     whereClause.courseId = { array_contains: courseId };
  //   }

  //   if (!isEmpty(timing)) {
  //     whereClause.timing = { array_contains: timing };
  //   }

  //   if (!isEmpty(classType)) {
  //     whereClause.classType = { array_contains: classType };
  //   }

  //   if (!isEmpty(education)) {
  //     whereClause.education = { array_contains: education };
  //   }

  //   if (tutorId) {
  //     whereClause.tutorId = tutorId;
  //   }

  //   console.log(whereClause);
  //   const tutors = await prismaClient.profile.findMany({
  //     where: whereClause,
  //     select: {
  //       tutorId: true,
  //       courseId: true,
  //       timing: true,
  //       classType: true,
  //       education: true,
  //     },
  //   });
    

  //   // Mapping over tutors to fetch associated data
  //   const usersPromises = tutors.map(async (item) => {
  //     const { tutorId, courseId, timing, classType, education } = item;
  //     const courseIds = courseId as number[];
  //     const timingIds = timing as number[];
  //     const classTypeIds = classType as number[];
  //     const educationIds = education as number[];

  //     // Fetching data from related tables
  //     const userPromise = prismaClient.user.findMany({
  //       where: {
  //         id: tutorId,
  //       },
  //       select: {
  //         name: true,
  //       },
  //     });

  //     const coursesPromise = prismaClient.course.findMany({
  //       where: {
  //         id: {
  //           in: courseIds,
  //         },
  //       },
  //       select: {
  //         name: true,
  //       },
  //     });

  //     const timingsPromise = prismaClient.timing.findMany({
  //       where: {
  //         id: {
  //           in: timingIds,
  //         },
  //       },
  //       select: {
  //         name: true,
  //       },
  //     });

  //     const classTypesPromise = prismaClient.classtype.findMany({
  //       where: {
  //         id: {
  //           in: classTypeIds,
  //         },
  //       },
  //       select: {
  //         name: true,
  //       },
  //     });

  //     const educationsPromise = prismaClient.education.findMany({
  //       where: {
  //         id: {
  //           in: educationIds,
  //         },
  //       },
  //       select: {
  //         name: true,
  //       },
  //     });

  //     // Await all promises to resolve
  //     const [
  //       userResult,
  //       coursesResult,
  //       timingsResult,
  //       classTypesResult,
  //       educationsResult,
  //     ] = await Promise.all([
  //       userPromise,
  //       coursesPromise,
  //       timingsPromise,
  //       classTypesPromise,
  //       educationsPromise,
  //     ]);

  //     // Extracting names from results
  //     const userName = userResult.length > 0 ? userResult[0].name : null;
  //     const courseNames = coursesResult.map((course) => course.name);
  //     const timingNames = timingsResult.map((timing) => timing.name);
  //     const classTypeNames = classTypesResult.map((classType) => classType.name);
  //     const educationNames = educationsResult.map((education) => education.name);

  //     return {
  //       user: userName,
  //       courses: courseNames,
  //       timings: timingNames,
  //       classType: classTypeNames,
  //       education: educationNames,
  //     };
  //   });

  //   // Resolve all promises and send response
  //   const data = await Promise.all(usersPromises);
  //   return res.status(200).json({ data });

  // } catch (error) {
  //   console.error("Error fetching tutors:", error);
  //   return res.status(500).json({ error: "Internal server error" });
  // }
};