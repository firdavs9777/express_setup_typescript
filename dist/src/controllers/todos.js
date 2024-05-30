"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ message: 'Showing the list of todo files', todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todoId === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo item');
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated', updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteToDo = (req, res, next) => {
    const todoId = req.params.todoId;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    TODOS.splice(todoIndex, 1);
    res.status(200).json({ mesage: 'Todo deleted' });
};
exports.deleteToDo = deleteToDo;
