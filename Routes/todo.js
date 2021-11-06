import express from 'express';
import Todo from '../models/todo.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const todos = await Todo.findAll();
        res.status(200).json({todos});
    }catch(e){
        res.status(500).json({"errorMessage":"Error on the get request"});
    }
});

router.post('/', async (req, res) => {
    try{
        const todo = await Todo.create({
            done: false,
            title: req.body.title
        });
        res.status(200).json({todo});
    }catch(e){
        res.status(500).json({errorMessage:"Error on the server"});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const todo = await Todo.findByPk(req.params.id);
        todo.done = req.body.done;
        todo.save();
        res.status(200).json({todo});
    }catch(e){
        res.status(500).json({"errorMessage":"Error on the server"});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const todos = await Todo.findAll({
            where: {
                id : req.params.id
            }
        })
        await todos[0].destroy();
        res.status(204).json({});
    }catch(e){
        res.status(500).json({"errorMessage":"Error on the server"});
    }
});

export default router;