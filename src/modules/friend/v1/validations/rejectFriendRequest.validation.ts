import z from "zod";

export const rejectFriendRequestParamsSchema = z.object({
  friendRequestId: z.uuidv4(),
});

export type RejectFriendRequestInput = z.infer<
  typeof rejectFriendRequestParamsSchema
>;
