const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'blogDB'

});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err)
        return;
    }
    else{
        console.log('Successfully connected to MySQL database!')
    }
})

//API endpoints
app.post('/api/posts', (req, res) => {
    const {title, content} = req.body;
    const query = 'INSERT INTO blog_posts (title, content) VALUES (?, ?)';
    db.query(query, [title, content], (err, result) => {
        if(err){
            console.error('Error inserting into blog post:', err)
            res.status(500).json({message: 'Error fetching blog posts'});
            return;
        }
        res.status(200).json(result)
    });
});

app.get('/api/posts', (req, res) => {
    const query = 'SELECT * FROM blog_posts';
    db.query(query, (err, results) => {
        if (err){
            console.error('Error fetching blog posts: ', err)
            res.status(500).json({message: 'There was an error fetching blog posts.'});
            return;
        }
        res.status(200).json(results);
    })
})

app.delete('/api/posts/', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM blog_posts WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting blog post:', err);
            res.status(500).json({message: 'Error deleting blog post'});
            return;
        }
        res.status(200).json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`)
});