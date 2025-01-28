import { DataSource } from "typeorm";
import { Snippet } from "@/lib/entities/Snippet";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Snippet],
  migrations: [],
  subscribers: [],
});
