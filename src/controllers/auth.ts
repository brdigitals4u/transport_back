import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { errorCode } from "../exceptions/root";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;
  if (!role) {
    return res.json({
      code: errorCode.MISSING_REQUIRED_ROLL,
      message: `'role' field is required!`,
    });
  }



  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    return res.status(404).json({
      code: errorCode.USER_ALREADY_EXISTS,
      message: `user already exits!`,
    });
  }

  if (role !== (role as "student" | "tutor")) {
    return res.status(404).json({
      code: errorCode.USER_ALREADY_EXISTS,
      message: "User role doesn't not exist",
    });
  }
  try {
    const maxIdUser = await prismaClient.user.findFirst({
      orderBy: { id: "desc" },
    });

    // Calculate the next available ID
    // console.log('dileep',maxIdUser)

    let nextId = maxIdUser ? maxIdUser.id + 1 : 1;


  user = await prismaClient.user.create({
    data: {
      id:nextId,
      name,
      email,
      role: role,
      password: hashSync(password, 10),
    },
  });
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  return res.status(200).json({user,token});
} catch (error) {
  return res.status(404).json({
    message: error,
  });
}
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email: email } });
  if (!user) {
    return res.status(404).json({
      code: errorCode.USER_ALREADY_EXISTS,
      message: "User Not exist!",
    });
  }

  if (!compareSync(password, user.password)) {
    return res.status(404).json({
      code: errorCode.USER_ALREADY_EXISTS,
      message: "Password Not Match",
    });
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  return res.status(200).json({ user, token });
};

// export const Address = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const {
//     address,
//     cityId,
//     tutorId,
//     courseId,
//     profilePic,
//     classType,
//     education,
//     timing,
//   } = req.body;
  

//   try {
//     let result = await prismaClient.profile.upsert({
//       where: { tutorId },
//       create: {
//         address,
//         cityId,
//         tutorId,
//         courseId,
//         profilePic,
//         classType,
//         education,
//         timing,
//       },
//       update: {
//         address,
//         cityId,
//         courseId,
//         profilePic,
//         classType,
//         education,
//         timing,
//       },
//     });
//     let message = result.updatedAt.getTime() - result.createdAt.getTime() <= 1000 ? "Successfully added" : "Successfully updated";
//     console.log({data:result, message})
//     return res.status(200).json({data:result, message});
//   } catch (error: any) {
//     console.log(error)
//     return res.status(404).json({
//       ...error?.meta,
//       message: "field should be unique",
//       code: errorCode.MISSING_REQUIRED_ROLL,
//     });
//   }
// };

// export const CreateCourse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { name } = req.body;

//   if (!name || typeof name !== "string") {
//     return res.status(404).json({
//       message: "'name' field is required and must be a string!",
//       code: errorCode.USER_ALREADY_EXISTS,
//     });
//   }

//   try {
//     let course = await prismaClient.course.findFirst({ where: { name: name } });

//     if (!course) {
//       return res.status(404).json({
//         message: "Course already exists!",
//         code: errorCode.USER_ALREADY_EXISTS,
//       });
//     }

//     course = await prismaClient.course.create({
//       data: {
//         name: name,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });

//     return res.json(course);
//   } catch (error) {
//     return res.status(404).json({
//       message: error,
//     });
//   }
// };
