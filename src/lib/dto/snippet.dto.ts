export class CreateSnippetDto {
  title: string;
  language: string;
  tags: Array<string>;
  description: string;
  tags: Array<string>;
  content: string;
}

export class UpdateSnippetDto {
  title?: string;
  language?: string;
  tags?: Array<string>;
  description?: string;
  tags?: Array<string>;
  content?: string;
}
