import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Quiz } from "../quizzes/quiz.entity";
import { Choice } from "../choices/choice.entity";
import { UserAnswer } from "../userAnswers/userAnswer.entity";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: "CASCADE" })
  quiz!: Quiz;

  @Column({ type: "text" })
  text!: string;

  @Column({ type: "varchar", default: "single_choice" })
  type!: "single_choice" | "multiple_choice" | "text";

  @OneToMany(() => Choice, (choice) => choice.question)
  choices!: Choice[];

  @OneToMany(() => UserAnswer, (answer) => answer.question)
  answers!: UserAnswer[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
