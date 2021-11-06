import Sequelize from 'sequelize';

const DATABASE = "db_todo";
const USER = "root";
const PASSWORD = "226634552";

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: "localhost",
    dialect: 'mysql'
});

export default sequelize;