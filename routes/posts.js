const express = require('express');
const Post = require('../models/Post');
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    myStat
} = require('../controllers/postController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate); // Protect all post routes
router.get("/create",(req,res)=>{res.render("post")})
router.get("/:id/edit",async(req,res)=>{
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        res.render("edit",{id,post});
    }catch(err){res.status(500).json({err:err.message})}
})
router.get("/dashboard",async (req,res)=>{
    const {_id,username} = req.user;
    try{
        const posts = await Post.find({author:_id}).populate("author","username");
        res.render("dashboard",{posts,username});
    } catch(err){
        res.status(500).json({error:err.message});
    }
});
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
