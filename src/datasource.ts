import { DataSource } from "typeorm";

export default new DataSource({
  migrationsTableName: "migrations",
  type: "sqlite",
  database: "./data/quiz.sqlite",
  synchronize: true,
  migrationsRun: true,
  logging: ["query", "error", "log"],
  entities: [process.env.DB_TYPEORM_ENTITIES || "src/**/*.entity.ts"],
  migrations: [],
  subscribers: [
    process.env.DB_TYPEORM_SUBSCRIBERS || "src/subscribers/**/*.ts",
  ],
});
