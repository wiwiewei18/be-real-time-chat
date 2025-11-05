import z from "zod";

export const getMessagesParamsSchema = z.object({
  id: z.uuidv4(),
});

export type GetMessagesInput = z.infer<typeof getMessagesParamsSchema>;
