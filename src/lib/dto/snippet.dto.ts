export class CreateSnippetDto {
  title: string;
  language: string;
  description: string;
  content: string;
}

export class UpdateSnippetDto {
  title?: string;
  language?: string;
  description?: string;
  content?: string;
}
