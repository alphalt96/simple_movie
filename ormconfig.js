require('dotenv').config()
const config = () => {
  switch (process.env.ENV) {
    case 'local':
      return {
        name: "simple_movie",
        type: "postgres",
        host: "127.0.0.1",
        port: 5432,
        username: "postgres",
        password: "secret",
        database: "simple_movie",
        entities: ["src/database/models/*.ts"],
        migrationsTableName: "migrations",
        migrations: ["src/database/migrations/*.ts"],
        synchronize: false,
        // "cli": {
        //     "migrationsDir": "migration"
        // }
      }
  }
}

module.exports = config
