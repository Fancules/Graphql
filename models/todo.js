import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const task = sequelize.define('tasks', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    done: {
        allowNull: true,
        type: Sequelize.BOOLEAN
    },
    title: {
        type: Sequelize.STRING
    }
});

export default task;