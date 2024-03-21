const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  comment:{
    type: String,
    max:200,
  },
  username:{
    type: String,
    required:true,
    max:200,
  },
  postId:{
    type:String,
    required:true
  }
},
{timestamps:true}
);

module.exports = mongoose.model("Comment", CommentSchema);