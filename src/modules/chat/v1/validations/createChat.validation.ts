import z from "zod";

export const createChatBodySchema = z.object({
  participantUserIds: z.array(z.uuidv4()).length(2),
});

export type createChatInput = z.infer<typeof createChatBodySchema>;
