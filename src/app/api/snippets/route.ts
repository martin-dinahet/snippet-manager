import { InitializeDatabase } from "@/lib/database";
import { AppDataSource } from "@/lib/data-source";
import { CreateSnippetDto } from "@/lib/dto/snippet.dto";
import { Snippet } from "@/lib/entities/Snippet";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  try {
    console.log("Attempting to initialize AppDataSource...");
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log("AppDataSource initialized successfully.");
    console.log("Fetching snippets...");
    const snippetRepository = AppDataSource.getRepository(Snippet);
    const snippets = await snippetRepository.find();
    console.log(`Fetched ${snippets.length} snippets.`);
    return NextResponse.json(snippets);
  } catch (err) {
    console.error("Error in GET /api/snippets:", err);
    let errorMessage = "Unknown error occurred";
    let errorDetails = {};
    if (err instanceof Error) {
      errorMessage = err.message;
      errorDetails = {
        name: err.name,
        stack: err.stack,
      };
    }
    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: 500 });
  }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const snippetRepository = AppDataSource.getRepository(Snippet);
    const createSnippetDto: CreateSnippetDto = await request.json();
    const snippet = snippetRepository.create(createSnippetDto);
    const result = snippetRepository.save(snippet);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create snippet" }, { status: 500 });
  }
};
