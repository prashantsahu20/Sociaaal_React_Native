const router = require('express').Router()
const Comment = require("../models/Comment");
const Post= require("../models/Post");
 
//add comment
router.post("/add" , async(req,res)=>{
    try{
        const newComment= new Comment({
            comment:req.body.comment,
            userId:req.body.userId,
            postId:req.body.postId,
            username:req.body.username,
        });

        await newComment.save();
        // await Post.updateOne({_id:req.body.userId},{$push:{following: req.params.id}}); 
        res.status(200).json({
            status:true,
            message:"comment added successfully"
        });
    }catch(err){
          res.status(500).json(err);
    }
})

//delete comment

router.delete('/delete/:id', async(req,res) => {
       
        try{
              const comment= await Comment.findByIdAndDelete({_id:req.params.id});
               if(!comment) return res.status(200).json({
                status: false,
                message: 'No comment found'
               });
                  
                res.status(200).json({
                     status: true,
                     message: 'Deleted Successfully'
                 })
        }catch(err){
            res.status(500).json(err);
        }

})    

//get particular post all comment
router.get("/get/:id", (req, res) => {

    try{
    Comment.find({postId:req.params.id})
       .then((comments) => {
          res.status(200).json({
             status: true,
             message: "comments fetched successfull",
             data: comments,
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

//update comment 
router.put("/update/:id", async (req, res) => {
    try {
      Comment.findOneAndUpdate({_id : req.params.id},{$set: req.body})
      .then(()=>{
        res.status(200).json({
            status:true,
            message:"comment updated successfully"
         }); 
      })
      
    } catch (err) {
      res.status(500).json(err);
    }
  });   





module.exports=router