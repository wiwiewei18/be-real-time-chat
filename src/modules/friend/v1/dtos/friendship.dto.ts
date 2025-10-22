import z from "zod";
import { userDTO } from "../../../auth/v1/dtos/user.dto";

export const friendshipDTO = z.object({
  id: z.string(),
  requester: userDTO.optional(),
  receiver: userDTO.optional(),
  status: z.string(),
});

export type FriendshipDTOType = z.infer<typeof friendshipDTO>;
