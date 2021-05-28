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
export default class Teacher {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => User, (User) => User.id, { nullable: false })
  user: number;
  @Column()
  @IsDefined({ message: "Nama Guru Harus Diisi" })
  fullName: string;
  @Column()
  @IsDefined({ message: "Posisi Harus Diisi" })
  position: string;
  @Column({ nullable: true, default: "-" })
  address: string;
  @Column("enum", { enum: ["P", "L"] })
  @IsDefined({ message: "Gender Harus Diisi" })
  gender: "P" | "L";
  @Column("date")
  @IsDefined({ message: "Tanggal Lahir Harus Diisi" })
  birth: Date;
  @Column({ nullable: true, default: "default-photo.png" })
  photo: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column("boolean", { default: true, select: false })
  active: boolean;
}
