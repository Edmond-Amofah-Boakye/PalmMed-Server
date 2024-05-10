import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { rateLimit } from "express-rate-limit";
import { DBCONNECTION } from "./connection/connection";
import { options as swaggerJsDocsOptions } from "./options";
import cors from "cors"
import users from "./routes/users.routes";
import appHealth from "./routes/health.routes";
import chats from "./routes/chat.routes";
import messages from "./routes/message.routes";
import predictions from "./routes/predictions.routes";
import doctors from "./routes/doctor.routes";
import reports from "./routes/Report.routes"
import chatV2 from "./routes/chat.v2.routes"
import messagesV2 from "./routes/messages.v2.routes"


dotenv.config();

const app = express();
app.use(cors())

// const limit = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "too many request from this IP",
// });
const swaggerSpecs = swaggerJsDocs(swaggerJsDocsOptions);

// app.use("/api", limit);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));



app.use("/api/v1/health", appHealth);
app.use("/api/v1/users", users);
app.use("/api/v1/chats", chats);
app.use("/api/v1/messages", messages);
app.use("/api/v1/predictions", predictions);
app.use("/api/v1/doctors", doctors);
app.use("/api/v1/reports", reports);
app.use("/api/v2/chats", chatV2);
app.use("/api/v2/messages", messagesV2);



app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.send(`cannot find ${req.originalUrl} on this server`).status(404);
  next();
});

const PORT = process.env.PORT || 6200;

DBCONNECTION()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to server", err);
  });

// process.on("unhandledRejection", ()=> {
//     console.log("sorry, could not process request");
//     server.close(()=> {
//         process.exit(1)
//     })
// })
