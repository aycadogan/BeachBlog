require('dotenv').config()
const express = require('express')
const blogRouter = require('./routes/blogs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Blog = require('./models/Blog.model');
const methodOverride = require('method-override')

const app = express()

//connect to mongoose
mongoose.connect(process.env.MONGODB_URL)

//set template engine
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//routes
app.get('/', async (request, response) => {
    let blogs = await Blog.find().sort({ timeCreated: 'desc' });
  
    response.render('index', { blogs: blogs });

})

app.use(express.static('public'))
app.use('/blogs', blogRouter)


app.listen(3004)

