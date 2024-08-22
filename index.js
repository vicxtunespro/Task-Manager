const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Web pages initialization
app.set('view engine', 'ejs');
app.set('views', 'src');

//middleware to parse json bodies
app.use(express.json());
app.use(express.static('public'))

const Blogs = [
    {
        id:1,
        blogName: "New trends",
        content: "Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i slovoslagarskoj industriji. Lorem Ipsum postoji kao industrijski standard još od 16-og stoljeća, kada je nepoznati tiskar uzeo tiskarsku galiju slova i posložio ih da bi napravio knjigu s uzorkom tiska. Taj je tekst ne samo preživio pet stoljeća, već se i vinuo u svijet elektronskog slovoslagarstva, ostajući u suštini nepromijenjen. Postao je popularan tijekom 1960-ih s pojavom Letraset listova s odlomcima Lorem Ipsum-a, a u skorije vrijeme sa software-om za stolno izdavaštvo kao što je Aldus PageMaker koji također sadrži varijante Lorem Ipsum-a",
        date: "Tuesday, 24 August, 2024"
    }
]

//first page
app.get('/', (req, res)=>{
    res.render('index');
})

//Displaying all resources
app.get('/blogs', (req, res)=>{
    res.render('blogs', {blogs: Blogs});
})

//Display specific resource
app.get('/blogs/:id', (req, res)=>{

    //collect the id from the json body
    const blogID = parseInt(req.params.id);

    //search for the resource with the collected id.
    const blog = Blogs.find(blog => blog.id === blogID);

    if(!blog){
        res.send(`No Blog post found with id:${blogID}`);
    }else{
        res.json(blog);
    }
})


//add new resource
app.post('/blogs', (req, res)=>{
    const newBlog = {
        id: Blogs.length + 1,
        blogName: req.body.bolgName,
        content: req.body.content,
        date: req.body.date
    }

    Blogs.push(newBlog);

    res.status(201).json(newBlog);
})

//update a blog
app.put('/blogs/:id', (req, res)=>{

    //collect the id
    const blogID = parseInt(req.params.id);

    //search for the blog post
    const blog = Blogs.find(blog => Blogs.id === blogID);

    if(!blog){
        return res.status(404).json({mssg: "Book not found"});
    }

    blog.blogName = req.body.blogName || blog.blogName;
    blog.content = req.body.content || book.content;
    res.json(blog);
})

app.delete('/blogs/:id',(req, res)=>{
    //collect the id
    const blogID = parseInt(req.params.id);

    //search for index of the blog post
    const blogIndex = Blogs.findIndex(blog => Blogs.id === blogID);

    if(blogIndex === -1){
        res.status(404).json({error: "Blog post not found"});
    }else{
        Blogs.splice(blogIndex, 1);
        res.status(204).json({message: "Blog post deleted successfully"});
    }
})


//Listening to port
app.listen(port, ()=>{
    console.log(`Server running on port:${port}`);
});