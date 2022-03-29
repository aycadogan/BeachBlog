const Blog = require('../models/Blog.model')
const multer = require('multer')

//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: function(req,file,callback){
        callback(null, './public/uploads/images')
    },

    //add back the extension
    filename:function (req,file,callback) {
        callback(null,Date.now()+file.originalname)
    }
})

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits:{
        fieldSize: 1024 * 1024 * 3
    }
})

exports.getAllBlogs = async (request, response) => {
    let blogs = await Blog.find().sort({ timeCreated: 'desc' });
  
    response.render('index', { blogs: blogs });

}

exports.getAddBlog = (req,res) => {
    res.render('newBlog')
}

exports.viewParams = async (req,res) => {
    console.log(req.params.slug);
    let blog = await Blog.findOne({slug:req.params.slug})
    if(blog){
        res.render('createdBlog', {blog:blog})
    }else{
        res.redirect('/')
    }
}

exports.postAddBlog = upload.single('image'), async (req,res) => {
    console.log(req.body);
    let blog = new Blog({
        title:req.body.title,
        author:req.body.author,
        description: req.body.description,
        img:req.file.filename
    })

    try{
        blog = await blog.save()
        res.redirect(`blogs/${blog.slug}`)
    }catch(err){
        console.log(err);
    }
}

exports.getEditView = async (req,res) => {
    let blog = await Blog.findById(req.params.id)
    res.render('edit',{ blog:blog})
}

exports.postEditBlog =  async (request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.title = request.body.title;
    blog.author = request.body.author;
    blog.description = request.body.description;
  
    try {
      blog = await blog.save();
      //redirect to the view route
      response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
      console.log(error);
      response.redirect(`/blogs/edit/${blog.id}`, { blog: blog });
    }
  }

exports.postDeleteBlog = async(req,res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/')
}

