import { AppDataSource, InitializeDatabase } from "@/lib/database";
import { Snippet } from "@/lib/entities/Snippet";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    const dataSource = await InitializeDatabase();
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
