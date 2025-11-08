import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Quiz } from "../quizzes/quiz.entity";
import { UserAnswer } from "../userAnswers/userAnswer.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  email!: string;

  @Column({ length: 255 })
  password_hash!: string;

  @Column({
    type: "varchar",
    default: "user",
  })
  role!: "admin" | "user";

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  // リレーション
  @OneToMany(() => Quiz, (quiz) => quiz.created_by)
  quizzes!: Quiz[];

  @OneToMany(() => UserAnswer, (answer) => answer.user)
  answers!: UserAnswer[];
}
