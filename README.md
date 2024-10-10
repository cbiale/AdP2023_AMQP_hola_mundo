# Arquitectura de Protocolos

## Ejemplos de aplicaciones usando AMQP 0.9.1

En los ejemplos se usan TypeScript.

Ejemplos:
- hola_mundo: ejemplo básico usando default exchange.
- direct_exchange: ejemplo de uso de direct exchange.
- topic_exchange: ejemplo de uso de topic exchange.
- fanout_exchange: ejemplo de uso de fanout exchange.
- header_exchange: ejemplo de uso de header exchange.

### Consideraciones

Verificar que sucede en los ejemplos de direct y topic exchange si se crea una cola por cliente consumidor (dejando que la cola sea creada por el broker) y se tienen varios consumidores ejecutandose.

Comparar con lo visto en clases.

## Ejemplos de aplicaciones usando AMQP 1.0

En los ejemplos se usan TypeScript.

Ejemplos:
- comunicacion_pares: ejemplo de comunicación entre pares (sin broker).
- comunicacion_broker: ejemplo de comunicación usando RabbitMQ como broker.
