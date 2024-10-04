import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";
import app from "./src/app.js";

const startServer = async () => {
  connectDB();
  const port = config.port || 5000;
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

startServer();
