import z from "zod";

export const sendFriendRequestBodySchema = z.object({
  receiverUsername: z.string().min(1, "Receiver username is required"),
});

export type SendFriendRequestInput = z.infer<
  typeof sendFriendRequestBodySchema
>;
