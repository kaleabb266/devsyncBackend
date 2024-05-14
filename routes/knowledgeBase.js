const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()

const postSchema = new mongoose.Schema({
    postTitle: String,
    postDetail: String,
    askedBy: String,
    answeredBy: {
        name: String,
        message: String
    },
    tags: [String],
    date: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)


router.get('/', async (req, res) => {
    const posts = await Post.find().sort('name')
    res.send(posts)

})


router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).send("no post found with this id")
    res.send(post);
})


router.post('/', async (req, res) => {
    let user = new Post({
        "postTitle": req.body.postTitle,
        "postDetail": req.body.postDetail,
        "askedBy": req.body.askedBy,
        "answeredBy": req.body.answeredBy,
        "tags": req.body.tags

    })

    user = await user.save()
    res.send(user)
})


router.put('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, { postTitle: req.body.postTitle }, { new: true })

    if (!post) return res.status(404).send("post not found")

    res.send(post)



})

router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return res.status(404).send("post not found")

    res.send(post)

})



module.exports = router