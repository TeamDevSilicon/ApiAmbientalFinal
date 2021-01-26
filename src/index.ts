import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from 'morgan';
import * as cors from 'cors';
import { useExpressServer } from "routing-controllers";


// creates express app, registers all controller routes and returns you express app instance
let express = require("express"); // or you can import it if you have installed typings
let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
// // app.use() // you can configure it the way you want
useExpressServer(app, {
    cors: true,
    controllers: [__dirname + "/controladores/*.ts"],
    routePrefix: "api"
    // controllers: [UsuarioControlador, UsuarioNivelControlador, TutorControlador, PersonaControlador, RegistroControlador]
});

createConnection();
app.listen(50000);
console.log("Express server corriendo en puerto 50000. ");

