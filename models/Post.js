const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  caption:{
    type: String,
    max:200,
  },
  username:{
    type: String,
    required:true,
    max:200,
  },
  imageUrl:{
    type:String,
  },
  like:{
    type:Array,
    default:[],
  },
  comments:{
    type:Array,
    default:[],
  },
},
{timestamps:true}
);

module.exports = mongoose.model("Post", PostSchema);