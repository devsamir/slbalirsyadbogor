import { IsDefined, MinLength } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Teacher {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  @IsDefined({ message: "Nama Guru Harus Diisi" })
  fullName: string;
  @Column({ nullable: true, default: "" })
  nuptk: string;
  @Column("enum", { enum: ["Pria", "Wanita"] })
  @IsDefined({ message: "Jenis Kelamin Harus Diisi" })
  @MinLength(1, { message: "Jenis Kelamin Harus Diisi" })
  kelamin: "Pria" | "Wanita";
  @Column()
  @IsDefined({ message: "Jabatan Harus Diisi" })
  @MinLength(1, { message: "Jabatan Harus Diisi" })
  jabatan: string;
  @Column({ nullable: true, default: "" })
  pelajaran: string;
  @Column({ nullable: true, default: "public/uploads/default-teacher.jpg" })
  photo: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
