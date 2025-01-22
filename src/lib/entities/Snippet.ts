import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  language: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("text")
  description: string;

  @Column("text")
  content: string;
}
