import z from "zod";

export const acceptFriendRequestParamsSchema = z.object({
  friendRequestId: z.uuidv4(),
});

export type AcceptFriendRequestInput = z.infer<
  typeof acceptFriendRequestParamsSchema
>;
