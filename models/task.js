const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: String,
    completed: Boolean
});

const MyTask = mongoose.model('mytasks', taskSchema);

module.exports = MyTask;