require('dotenv').config()
const express = require('express')
const blogRouter = require('./routes/blogs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//connect to mongoose
mongoose.connect(process.env.MONGODB_URL)

//set template engine
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

//routes
app.get('/', (req,res) => {
    const blogs = [
    {
        title:'lorem ipsum',
        snippet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, dolorum rem vero nulla totam assumenda ratione sunt laudantium eaque eius? ',
        author:'Joe',
        createdAt: new Date,
        img: 'placeholder.jpg'
    },
    {
        title:'lorem ipsum',
        snippet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, dolorum rem vero nulla totam assumenda ratione sunt laudantium eaque eius? ',
        author:'Joe',
        createdAt: new Date,
        img: 'placeholder.jpg'
    },
    {
        title:'lorem ipsum',
        snippet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, dolorum rem vero nulla totam assumenda ratione sunt laudantium eaque eius? ',
        author:'Joe',
        createdAt: new Date,
        img: 'placeholder.jpg'
    }
]

    res.render('index', { blogs:blogs})
})

app.use(express.static('public'))
app.use('/blogs', blogRouter)


app.listen(3001)

