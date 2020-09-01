const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "dist"

const file =  process.env.NODE_ENV === "development" ?
"ts" :
"js"

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    rootDir + "/modules/**/infra/typeorm/entities/*." + file
  ],
  "migrations": [
    rootDir + "/shared/infra/typeorm/migrations/*." + file
  ],
  "cli": {
    "migrationsDir": "src/shared/infra/typeorm/migrations/",
  }
}
