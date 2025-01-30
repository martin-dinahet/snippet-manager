import "reflect-metadata";
import { AppDataSource } from "./data-source";

export async function InitializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
