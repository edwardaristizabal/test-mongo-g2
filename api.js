var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var TaskModel = require('./task_schema');

// Connecting to database 
var query = "mongodb+srv://<user>:<user_pass>@<cluster_server>/<db_name>?retryWrites=true&w=majority"

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

router.get('/findall', function (req, res) {
    TaskModel.find(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post('/delete', function (req, res) {

    TaskModel.findOne({}, function (err, user) {
        user.key_to_delete = undefined;
        user.save();
    });
});

router.post('/save', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }
    var newTask = new TaskModel(task);

    newTask.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});

module.exports = router;