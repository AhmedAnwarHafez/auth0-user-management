import server from "./server.jsx";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

server.listen(PORT, function () {
  console.log("Listening on port", PORT);
});
