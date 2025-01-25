export class CreateSnippetDto {
  title: string;
  language: string;
  description: string;
  tags: Array<string>;
  content: string;
}

export class UpdateSnippetDto {
  title?: string;
  language?: string;
  description?: string;
  tags?: Array<string>;
  content?: string;
}
