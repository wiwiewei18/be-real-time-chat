import z from "zod";

export const deleteFriendParamsSchema = z.object({
  friendId: z.uuidv4(),
});

export type DeleteFriendInput = z.infer<typeof deleteFriendParamsSchema>;
