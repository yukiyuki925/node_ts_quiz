import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../users/user.entity";
import { Question } from "../questions/questions.entity";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.quizzes, { onDelete: "CASCADE" })
  created_by!: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions!: Question[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
