import Todo from '../models/todo.js';
const players = [
    "De Jong",
    "Coutihno",
    "Pique"
]

export default {
    test: () => {
        return "Hello! You are good!!!"
    },
    num: () => 2,
    team: () => {
        return {
            club: "Barcelona",
            manager: {
                name: "Yurii",
                age: 29
            },
            estDate: 1899,
            players: players
        }
    },
    addPlayer({name}){
        players.push(name)
        return players
    },
    async getTodos() {
        const todos = await Todo.findAll();
        return todos;
    },
    async addTodo({todo}) {
        try{
            return await Todo.create({
                done: false,
                title: todo.title
            });
        }catch(e){
            throw new Error("Incorrect title");
        }
    },
    async completeTodo({id}){
        try{
            const todo = await Todo.findByPk(id);
            todo.done = true;
            todo.save();
            return todo;
        }catch(e){
            throw new Error('Incorrect Id');
        }
    },
    async removeTodo({id}){
        try{
            const todos = await Todo.findAll({id});
            await todos[0].destroy();
            return true;
        }catch(e){
            throw new Error("Incorrect ID");
            return false;
        }
    }
}