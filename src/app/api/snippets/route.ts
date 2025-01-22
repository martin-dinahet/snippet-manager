import { AppDataSource, InitializeDatabase } from "@/lib/database";
import { Snippet } from "@/lib/entities/Snippet";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const dataSource = await InitializeDatabase();
  const snippetRepository = AppDataSource.getRepository(Snippet);
  const snippets = await snippetRepository.find();
  return NextResponse.json(snippets);
};
