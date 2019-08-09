require('dotenv').config()
const config = (() => {
  switch (process.env.ENV) {
    case 'local':
      return {
        type: 'postgres',
        // url: "postgres://postgres:secret@db:5432/simple_movie",
        "host": "db",
        "port": 5432,
        "username": "postgres",
        "password": "secret",
        "database": "simple_movie",
        // synchronize: true,
        "migrationsTableName": "migrations",
        logging: true,
        entities: ['./src/database/models/*.ts'],
        migrations: ['./src/database/migrations/*.ts'],
        subscribers: ['./src/database/subscribers/*.ts'],
        cli: {
          entitiesDir: './src/database/models',
          migrationsDir: './src/database/migrations',
          subscribersDir: './src/database/subscribers'
        },
        migrationsRun: false
      }
  }
})()

module.exports = config
