import z from "zod";
import { chatParticipantDTO } from "./chatParticipant.dto";

export const chatDTO = z.object({
  id: z.string(),
  participants: z.array(chatParticipantDTO).optional(),
});

export type ChatDTOType = z.infer<typeof chatDTO>;
