import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import path from 'path';
import router from './routers/rootRouter'
import sequelize from './db/dbSetup'

const app = express();

app.use(express.json());

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

app.use('/', router);

(async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {console.log(`app listening on port ${PORT}!`)})
    }catch(err){
        console.log(err)
    }
})();


