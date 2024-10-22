import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config({
  path: ".env",
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server and listen on the specified port
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running at: ${process.env.PORT || 3001}`);
    });
    // Handle errors in the Express app
    app.on("error", (err) => {
      console.log("Express Error !!", err);
    });
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });
