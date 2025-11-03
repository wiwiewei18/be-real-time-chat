import { Request, Response } from "express";
import { BaseController } from "../../../../shared/http/controllers/base.controller";
import { AsyncErrorHandler } from "../../../../shared/http/utils/AsyncErrorHandler";
import { ChatService } from "../services/chat.service";

export class ChatController extends BaseController {
  constructor(private chatService: ChatService) {
    super();
  }

  public createChat = AsyncErrorHandler(async (req: Request, res: Response) => {
    const createChatOutput = await this.chatService.createChat();

    this.created(res, "Chat created successfully", createChatOutput);
  });

  public getChats = AsyncErrorHandler(async (req: Request, res: Response) => {
    const getChatsOutput = await this.chatService.getChats(
      (req as any).user.userId
    );

    this.ok(res, "Chats list fetched successfully", getChatsOutput);
  });
}
