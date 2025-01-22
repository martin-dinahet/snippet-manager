import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  language: string;

  @Column()
  content: string;
}
