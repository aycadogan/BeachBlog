const express = require('express')
const blogRouter = require('./routes/blogs')
const app = express()

//set template engine
app.set('view engine','ejs')

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


app.listen(3000)

