import z from "zod";

export const userDTO = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
});

export type UserDTOType = z.infer<typeof userDTO>;
