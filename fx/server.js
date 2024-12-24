import express from "express";
const app = express();
const port = 4005;
import router from "./route.js";

// Parse JSON bodies
app.use(express.json());

// Use the router for all routes starting with `/`
app.use("/", router);

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
