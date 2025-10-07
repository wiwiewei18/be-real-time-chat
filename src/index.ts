import dotenv from "dotenv";
import { App } from "./shared/app";
import { Socket } from "./shared/socket";
import { ProcessErrorHandler } from "./shared/processErrorHandler";

dotenv.config({ quiet: true });

const processErrorHandler = new ProcessErrorHandler();

processErrorHandler.handleUncaughtExceptions();

const server = new App().server;

const PORT = Number(process.env.PORT) || 5000;

new Socket(server, PORT);

const httpServer = server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

processErrorHandler.handleUnhandledRejections(httpServer);
