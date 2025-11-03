import z from "zod";
import { userDTO } from "../../../auth/v1/dtos/user.dto";

export const chatParticipantDTO = z.object({
  id: z.string(),
  user: userDTO.optional(),
});

export type ChatParticipantDTOType = z.infer<typeof chatParticipantDTO>;
