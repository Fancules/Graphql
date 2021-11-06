import express from 'express';
import path from 'path';
import databaseConnection from "./utils/database.js";
import exgql from 'express-graphql';
import schema from './graphql/schema.js';
import resolver from './graphql/resolver.js';

const app = express();
const PORT = process.env.PORT || 8880;

app.use(express.static(path.resolve() + '/public'));
app.use(express.json());
app.use('/graphql', exgql.graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

app.use((req, res) => [
   res.send('index.js') 
]);

async function start () {
    try{
        await databaseConnection.sync();
        app.listen(PORT, () => {
            console.log('ready');
        });
    }catch(e){
        console.log(e);
    }
}

start();