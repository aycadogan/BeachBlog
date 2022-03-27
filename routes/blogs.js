const express = require('express')
const Blog = require('../models/Blog')
const router = express.Router()

router.get('/new', (req,res) => {
    res.render('newBlog')
})
router.get('/:id', (req,res) => {
    res.send(req.params.id)
})
router.post('/', async (req,res) => {
    console.log(req.body);
    let blog = new Blog({
        title:req.body.title,
        author:req.body.author,
        description: req.body.description
    })

    try{
        blog = await blog.save()
        res.redirect(`blogs/${blog.id}`)
    }catch(err){
        console.log(err);
    }
})


module.exports = router;