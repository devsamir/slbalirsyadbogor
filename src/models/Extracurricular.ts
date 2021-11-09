import { IsDefined } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Extracurricular {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => User, (User) => User.id, { nullable: false })
  user: number;
  @Column({ nullable: true, default: `public/uploads/default-extra.jpg` })
  thumbnail: string;
  @Column()
  @IsDefined({ message: "Nama Extrakulikuler Tidak Boleh Kosong" })
  nameExtracurricular: string;
  @Column("text", { nullable: true, default: "" })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
