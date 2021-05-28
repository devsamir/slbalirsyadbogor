import { IsDefined, MinLength } from "class-validator";
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
export default class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => User, (User) => User.id, { nullable: false })
  user: number;
  @Column()
  @IsDefined({ message: "Judul Tidak Boleh Kosong" })
  @MinLength(1, { message: "Judul Tidak Boleh Kosong" })
  title: string;
  @Column({ nullable: true, default: "default-thumbnail.png" })
  thumbnail: string;
  @Column("text")
  @IsDefined({ message: "Isi Artikel Tidak Boleh Kosong" })
  @MinLength(1, { message: "Isi Artikel Tidak Boleh Kosong" })
  body: string;
  @Column({ default: 0 })
  viewer: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
