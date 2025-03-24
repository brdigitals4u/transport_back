import { prismaClient } from "../..";

type Props = {
  allHeaders: any;
  data: any;
  userId:any
};

export const User = async ({ allHeaders, data, userId }: Props) => {
  // Define the roles you want to fetch (In this case, only "ADMIN")
  const userIds = "ADMIN";

  const parentUserFilter = userId ? { parent_user: userId } : {};

  // Fetch user info based on role
  const userInfo = await prismaClient.user.findMany({
    where: { role: { not:userIds }, ...parentUserFilter }, // Fetch only ADMIN users
  });

  const f_headers = allHeaders;

  return { f_headers, f_data:userInfo };
};
