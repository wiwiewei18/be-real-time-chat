Features:

Http:

- Authentication:
  ✔ Sign up
  ✔ Sign in
- Friend:
  ✔ Send friend request,
  ✔ Accept friend request,
  ✔ Reject friend request,
  ✔ Get friend request list,
  ✔ Get friend list,
  ✔ Remove friend
- Chat:
  ✔ Create chat,
  ✔ Get chat list,
  - Delete chat,
- Message:
  - Get message list

Web socket:

- Chat:
  ✔ Join chat,
  ✔ Leave chat,
  ✔ Send/Receive message

Bugs:

- User 2 sends friend request to user 1 that already sent friend request to user 2
- Add chat name, participants
- Create chat doesn't require senderId

---

- Push notification
- Status: Online Indicator, Read Receipt

NOTE:

- http: create chat -> chatId
- ws: emit chat:join (chatId) -> join chat:chatId
- ws: on chat:receive
- ws: emit chat:send (chatId, message) -> emit chat:receive (chat:chatId)
