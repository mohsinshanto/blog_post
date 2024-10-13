const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.user.id });

    try {
        await post.save();
        res.redirect("/api/posts/");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.render("home",{posts});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.myStat = async (req,res)=>{
    console.log(req.user);
    const {_id,username} = req.user;
    try{
        const posts = await Post.find({author:_id}).populate("author","username");
        res.render("dashboard",{posts,username});
    } catch(err){
        res.status(500).json({error:err.message});
    }
}

// Get Post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.render("singlePost",{post});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Post
exports.updatePost = async (req, res) => {
    const { title, content } = req.body;
    
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.title = title;
        post.content = content;
        await post.save();
        res.redirect("/api/posts/dashboard");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.redirect("/api/posts/dashboard");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

