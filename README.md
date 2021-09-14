# cerebro
Se pensó en una solución con un servidor cuya capa de acceso fuera con express, para disponibilizarlo con instancias de EC2, configurar un autoscaling y un balanceador. Es por ello que el repo tiene la forma por capas.

Más adelante se decidió disponibilizar la solución a través de api gateway y de funciones lambda, pero pues se mantuvo la estructura del mismo y solo se agrego un componente nuevo (archivo) que servia de handler para la lambda. Una de las ventajas de usar una arquitectura por capas.

Nota: Algunos comandos necesitan python por debajo así que asegurate de tenerlo instalado (versión 3) y de instalar las dependecias necesarias para correr algunos scripts en local. Realiza lo siguiente:

1. cd scripts
2. pip install -r packages

## Para correr el repo en local
- cd app
- npm i
- npm run start


## Para compilar la solución

### Compilar las lambas
- cd app
- npm run build-lambdas

### Para subir las lambas al S3 desde local
Después de haber compilado las lambdas

- npm run upload-lambdas AKIA3OHRIFT3FHBVHBWW 6eKQ2H3hXPi+Rbk4YAjFAy3WmEsGebIKm5tmaNac

Nota: Estas credenciales están configuradas de manera estática dentro del código, pero se deben poner como un secret dentro de GIthub y una tarea en el pipeline que sobreescriba los valores. Dichas credenciales se eliminarán al cabo de unos días. (No se hizo por simplicidad, pero es un recomendación evidente de seguridad)

## Infraestructura
1. correr el stack determinado por el yaml: bucket-s3.cloudformation.yaml
2. correr el pipeline CI dentro del repo para actualizar el contenido de las lambda en el s3.
3. Correr el stack determinado por el yaml: infra.cloudformation.yaml