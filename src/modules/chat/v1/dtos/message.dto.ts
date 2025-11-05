import z from "zod";

export const messageDTO = z.object({
  id: z.string(),
  chatId: z.string(),
  senderId: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export type MessageDTOType = z.infer<typeof messageDTO>;
