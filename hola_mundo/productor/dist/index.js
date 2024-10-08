"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const buffer_1 = require("buffer");
function publicar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // se conecta al broker
            const coneccion = yield amqplib_1.default.connect('amqp://adp:adp@localhost:5672');
            // creamos un canal
            const canal = yield coneccion.createChannel();
            // nombre de la cola
            const cola = 'ejemplo_cola';
            // se declara la cola
            // considerar que si la cola ya existe, esta función simplemente verifica su existencia y
            // asegura que los parámetros de configuración sean los mismos. 
            // Si la cola no existe, se crea con los parámetros proporcionados.
            // mensaje a enviar
            const mensaje = '¡Hola, AMQP!';
            // se publica mensaje en la cola
            canal.sendToQueue(cola, buffer_1.Buffer.from(mensaje));
            // se informa
            console.log(`[productor] Enviado '${mensaje}' a la cola '${cola}'`);
            // cerramos el canal
            yield canal.close();
            // cerramos la conección
            yield coneccion.close();
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
publicar();
