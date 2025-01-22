import { AppDataSource, InitializeDatabase } from "@/lib/database";
import { CreateSnippetDto } from "@/lib/dto/createSnippet.dto";
import { Snippet } from "@/lib/entities/Snippet";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const dataSource = await InitializeDatabase();
  const snippetRepository = AppDataSource.getRepository(Snippet);
  const snippets = await snippetRepository.find();
  return NextResponse.json(snippets);
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const dataSource = await InitializeDatabase();
    const snippetRepository = AppDataSource.getRepository(Snippet);
    const createSnippetDto: CreateSnippetDto = await request.json();
    const snippet = snippetRepository.create(createSnippetDto);
    const result = snippetRepository.save(snippet);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create snippet" }, { status: 500 });
  }
};
