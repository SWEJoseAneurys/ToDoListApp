const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const logger = require('morgan');
//cross origin access
const cors = require('cors');
const app = express();
const MyTask = require('./models/task');
//access
app.use(cors({
    origin: "*"
}));
//logs the different requests to our server
app.use(logger('dev'));
//parse stringified objects (JSON)
app.use(express.json());
//server build folder
app.use(express.static(path.join(__dirname, 'build')));
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.li7admh.mongodb.net/ToDoList?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//HOMEPAGE - Display all tasks on to-do list
app.get('/', async (req, res) => {
    //get tasks from MongoDB
    let response = await MyTask.find({});
    //display tasks
    res.json(response);
});

//CREATE TASK - Add new task
app.post('/create_task', async (req,res) => {
    const task = req.body.newTask;
    console.log(req.body);
    //create task to add to to-do list
    let response = await MyTask.create({
        task,
        completed: false,
    });
    res.send('good route')
});

//DISPLAY TASKS - Show tasks on home page
app.get('/get_tasks', async (req, res) => {
    let response = await MyTask.find();
    res.json(response);
});

//UPDATE TASKS - Mark task as completed
app.put('/update_task/:taskId', async (req, res) => {
    let response = await MyTask.findByIdAndUpdate(req.params.taskId, {completed:true}, {new: true});
    console.log(response);
    res.json(response)
});

//DELETE TASKS - Delete a task
app.delete('/delete/:taskId', async (req, res) => {
    let response = await MyTask.findByIdAndDelete(req.params.taskId)
});


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});