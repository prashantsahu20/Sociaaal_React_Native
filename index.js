const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose= require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")
const commentRouter = require("./routes/comments")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("MongoDB Connected")).catch((err)=> console.log(err));

const app = express();

// Use Morgan middleware for logging HTTP requests
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());



// app.use(
//     cors({
//           origin: "*"
//     }),
// );
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/post/comment",commentRouter);
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
