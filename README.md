# Arquitectura de Protocolos

## Ejemplos de aplicaciones usando AMQP

En los ejemplos se usan TypeScript.

Ejemplos con TypeScript:
- hola_mundo: ejemplo básico usando default exchange.
- direct_exchange: ejemplo de uso de direct exchange.
- topic_exchange: ejemplo de uso de topic exchange.
- fanout_exchange: ejemplo de uso de fanout exchange.
- header_exchange: ejemplo de uso de header exchange.

## Consideraciones

Verificar que sucede en los ejemplos de direct y topic exchange si se crea una cola por cliente consumidor (dejando que la cola sea creada por el broker) y se tienen varios consumidores ejecutandose.

Comparar con lo visto en clases.