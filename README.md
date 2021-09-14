# cerebro

## Para correr el repo en local

cd app
npm i
npm run start


## Infraestructura

1. correr el stack determinado por el yaml: bucket-s3.cloudformation.yaml
2. correr el pipeline CI dentro del repo para actualizar el contenido de las lambda en el s3.
3. Correr el stack determinado por el yaml: infra.cloudformation.yaml