import "reflect-metadata";
import { DataSource } from "typeorm";
import { Snippet } from "./entities/Snippet";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Snippet],
  migrations: [],
  subscribers: [],
});

export const InitializeDatabase = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data source has been initialized");
    })
    .catch((err) => {
      console.error(`Error during data source initialization: ${err}`);
    });
};
