import { prismaClient } from "../..";

type Props = {
  allHeaders: any;
  data: any;
};

export const Carrier = async ({ allHeaders, data }: Props) => {
  // Extract unique user_ids and ensure they are numbers
  const userIds = [...new Set(data.map((item: any) => Number(item.user_id)))];

  // Fetch user info based on user_ids
  const userInfo = await prismaClient.user.findMany({
    where: { id: { in: userIds as any } }, // Ensures `in` receives a proper `number[]`
    select: { id: true, name: true },
  });

  // Create a map of user_id to user name for quick lookup
  const userMap = new Map(userInfo.map(user => [user.id, user.name]));

  // Replace user_id with user name
  const f_data = data.map((item: any) => ({
    ...item,
    user_id: userMap.get(Number(item.user_id)) || "Unknown User",
  }));

  const f_headers = allHeaders;

  return { f_headers, f_data };
};
