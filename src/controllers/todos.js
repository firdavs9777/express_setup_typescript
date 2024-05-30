"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
var todo_1 = require("../models/todo");
var TODOS = [];
var createTodo = function (req, res, next) {
    var text = req.body.text;
    var newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
var getTodos = function (req, res, next) {
    res.json({ message: 'Showing the list of todo files', todos: TODOS });
};
exports.getTodos = getTodos;
var updateTodo = function (req, res, next) {
    var todoId = req.params.id;
    var updatedText = req.body.text;
    var todoIndex = TODOS.findIndex(function (todo) { return todoId === todoId; });
    if (todoIndex < 0) {
        throw new Error('Could not find todo item');
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated', updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
var deleteToDo = function (req, res, next) {
    var todoId = req.params.todoId;
    var todoIndex = TODOS.findIndex(function (todo) { return todo.id === todoId; });
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    TODOS.splice(todoIndex, 1);
    res.status(200).json({ mesage: 'Todo deleted' });
};
exports.deleteToDo = deleteToDo;
