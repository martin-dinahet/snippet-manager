import { InitializeDatabase } from "@/lib/database";
import { AppDataSource } from "@/lib/data-source";
import { UpdateSnippetDto } from "@/lib/dto/snippet.dto";
import { Snippet } from "@/lib/entities/Snippet";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const snippetRepository = AppDataSource.getRepository(Snippet);
    const snippet = await snippetRepository.findOne({
      where: { id: params.id },
    });
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    return NextResponse.json(snippet);
  } catch (err) {
    return NextResponse.json({ error: "Failed to retrieve snippet" }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const snippetRepository = AppDataSource.getRepository(Snippet);
    const updateData: UpdateSnippetDto = await request.json();
    const snippet = await snippetRepository.findOne({ where: { id: params.id } });
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    await snippetRepository.update(params.id, updateData);
    const updatedSnippet = await snippetRepository.findOne({ where: { id: params.id } });
    return NextResponse.json({ updatedSnippet });
  } catch (err) {
    return NextResponse.json({ error: "Failed to retrieve snippet" }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const snippetRepository = AppDataSource.getRepository(Snippet);
    const snippet = await snippetRepository.findOne({ where: { id: params.id } });
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    snippetRepository.delete(params.id);
    return NextResponse.json({ message: "Snippet deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failwed to delete snippet" }, { status: 404 });
  }
};
