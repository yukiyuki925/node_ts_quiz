import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { Question } from "../questions/questions.entity";
import { Choice } from "../choices/choice.entity";

@Entity("user_answers")
export class UserAnswer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "CASCADE",
  })
  question!: Question;

  @ManyToOne(() => Choice, (choice) => choice.answers, {
    nullable: true,
    onDelete: "SET NULL",
  })
  selected_choice!: Choice | null;

  @Column({ type: "text", nullable: true })
  text_answer!: string | null;

  @Column({ type: "boolean", default: false })
  is_correct!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  answered_at!: Date;
}
