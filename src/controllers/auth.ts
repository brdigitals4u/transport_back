import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { errorCode } from "../exceptions/root";
import nodemailer from "nodemailer";
import { JwtPayload } from "jsonwebtoken";

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

  if (role !== (role as "ADMIN" | "CARRIER")) {
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


    let nextId = maxIdUser ? maxIdUser.id + 1 : 1;

    user = await prismaClient.user.create({
      data: {
        id: nextId,
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

    return res.status(200).json({ user, token });
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


export const Forgotpassword = async (req:any, res:Response) => {
  const { email } = req.body;

  try {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token (valid for 1 hour)
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Reset password link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?user=${token}`;
    //upia whlh jyju lutg
    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link is valid for 1 hour.</p>`,
    });

    return res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Reset Password API
export const ForgotpasswordToken = async (req:any, res:Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  console.log(token, newPassword)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (!decoded || typeof decoded === "string") {
      return res.status(400).json({ message: "Invalid token" });
    }

    const userEmail = decoded.email as string;

    const user = await prismaClient.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash new password
    const hashedPassword = hashSync(newPassword, 10);
    await prismaClient.user.update({
      where: { email: userEmail },
      data: { password: hashedPassword },
    });

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
}