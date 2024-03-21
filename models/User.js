const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username:{ 
    type: String,
    max: 50,
    required: true,
    unique: true,
  },
  emailId:{ 
    type: String,
    unique: true, 
    required: true,
    unique:true, 
  },
  mobile:{
    type: String,
    max:10,
    unique: true, 
    required: true,
  },
  password:{
    type: String,
    max:50,
    required: true,
  },
  gender:{
    type: String,
    max:50,
    required: true,
  },
  dob:{
    type: String,
    max:50,
  },
  address:{
    type: String,
    max:50,
  },
  profilePic:{
    type:String,
    default:""
  },
  coverPic:{
    type:String,
    default:""
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  }
},{timestamps:true});

module.exports=mongoose.model("User", UserSchema);