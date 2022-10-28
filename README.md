# Next.js Open Jira App

Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__ (se ejecuta el proceso, y luego se puede seguir escribiendo en la consola)

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno __.env.template__ a __.env__

## LLamar la base de datos con informacion de pruebas(seed, se puede utilizar POSTMAN)

```
http://localhost:3000/api/seed
```

