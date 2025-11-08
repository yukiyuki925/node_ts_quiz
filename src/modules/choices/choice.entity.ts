import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Question } from "../questions/questions.entity";
import { UserAnswer } from "../userAnswers/userAnswer.entity";

@Entity("choices")
export class Choice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Question, (question) => question.choices, {
    onDelete: "CASCADE",
  })
  question!: Question;

  @Column({ length: 255 })
  text!: string;

  @Column({ type: "boolean", default: false })
  is_correct!: boolean;

  @OneToMany(() => UserAnswer, (answer) => answer.selected_choice)
  answers!: UserAnswer[];
}
