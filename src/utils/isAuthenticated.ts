import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

type JWT_VERIFY = {
  userId: string;
  role: string;
};

export const isAuthenticated = async (req: any, res: any, next: any) => {
  const token = req?.headers?.authorization.replace(/^Bearer\s+/, "");

  const isJwtVerify = jwt.verify(token, JWT_SECRET) as JWT_VERIFY;

  if (isJwtVerify?.userId) {
    const decoded = jwt.verify(token, JWT_SECRET) as JWT_VERIFY;

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.userId; 
    req.role = decoded?.role; 

  
   // console.log(decoded)
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};
