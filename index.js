const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDB = require("./config/db");
const routes = require("./Routes/Routes");
const app = express();
dotenv.config();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:8081",              // Expo Web local
  "https://brightpath-frotend.onrender.com", // Optional self-origin for APIs
  "exp://ulnrsjs-9563-juma-8081.exp.direct", // Expo Go (if you're accessing from this tunnel)
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Blocked by CORS: ${origin}`); // Debugging log
        callback(new Error("CORS Policy Violation: Access Denied"));
      }
    },
    credentials: true, // Allows cookies and credentials to be sent
  })
);

app.use("/api",routes);
const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  try {
    await ConnectDB();
    console.log(`server running localhost ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});