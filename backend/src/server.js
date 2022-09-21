import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import {connectToMongoServer} from './services/database';

var indexRouter = require('./routes/index');

const app = express();
app.use(express.static(`${__dirname}/../media`));
dotenv.config({ path: '.env' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




connectToMongoServer( function( err, client ) {
    if (err) console.log(err);
    console.log('Mongo bağlandı')
    } 
);


app.use('/', indexRouter);

var httpServer = http.createServer(app);


httpServer.listen(3001, () => {
   // logger.log('info','Server Started At Port : 3000 ');
   console.log('Sunucu başladı Port : ', 3001);
});



