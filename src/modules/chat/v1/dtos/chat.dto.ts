import z from "zod";

export const chatDTO = z.object({
  id: z.string(),
});

export type ChatDTOType = z.infer<typeof chatDTO>;
