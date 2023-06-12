import amqp from 'amqplib';
import {Buffer} from 'buffer';

async function publicar() {
  try {
    // se conecta al broker
    const coneccion = await amqp.connect('amqp://adp:adp@localhost:5672');
    // creamos un canal
    const canal = await coneccion.createChannel();
    
    // nombre de la cola
    const cola = 'ejemplo_cola';
    // se declara la cola
    // considerar que si la cola ya existe, esta función simplemente verifica su existencia y
    // asegura que los parámetros de configuración sean los mismos. 
    // Si la cola no existe, se crea con los parámetros proporcionados.

    // mensaje a enviar
    const mensaje = '¡Hola, AMQP!';
    // se publica mensaje en la cola
    canal.sendToQueue(cola, Buffer.from(mensaje));
    // se informa
    console.log(`[productor] Enviado '${mensaje}' a la cola '${cola}'`);

    // cerramos el canal
    await canal.close();
    // cerramos la coneccion
    await coneccion.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

publicar();
