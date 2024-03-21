const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("../middleware/upload")

//add a post
router.post("/add",upload.single("imageUrl"), async (req, res) => {
  const newPost = new Post(req.body);
  try {
    if(req.file){
      newPost.imageUrl = req.file.filename;
    }



    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}); 


//update a post
router.put("/update/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post

router.get("/getPost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/get", (req, res) =>{
  Post.find()
   .then((posts)=>{
      res.status(200).json({
          status:true,
          message:"Users fetched Successfully!",
          data:posts,
      });
   })
   .catch((err) =>{
      res.status(500).json(err);
   });
});


//get particular user all posts
// router.get("/get/:id", (req, res) =>{
//   Post.find()
//    .then((posts)=>{
//       res.status(200).json({
//           status:true,
//           message:"Users fetched Successfully!",
//           data:posts,
//       });
//    })
//    .catch((err) =>{
//       res.status(500).json(err);
//    });
// });


router.get("/get/:id", (req, res) => {

  try{
  Post.find({userId:req.params.id})
     .then((posts) => {
        res.status(200).json({
           status: true,
           message: "posts fetched successfull",
           data: posts,
      });
  })
  .catch((err) => {
      res.status(500).json(err);
  });
  }
  catch(err){
   res.status(500).json(err);
  }
});

//like or unlike  a post
//batmann kuch accha hai tarika
router.put("/like/:id", async(req,res)=>{
  try {
     const post = await Post.findById({_id:req.params.id})
     let isLiked= false
     post.like.map(item=>{
      if(item === req.body.userId){
        isLiked=true
      }
     })

     if(isLiked){
      const res1=await Post.updateOne({_id:req.params.id},{$pull:{like: req.body.userId}});
      res.status(200).json({status:true, message: "like removed successfully"})
     }else{
      const res2=await Post.updateOne({_id:req.params.id},{$push:{like: req.body.userId}});
      res.status(200).json({status:true, message: "post liked successfully"})   
     }
  }
  catch(err){
      res.status(500).json(err);
  }
})



module.exports = router;
