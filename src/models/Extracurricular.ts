import { IsDefined } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Teacher from "./Teacher";

@Entity()
export default class Extracurricular {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => Teacher, (Teacher) => Teacher.id, { nullable: false })
  teacher: number;
  @Column({ nullable: true, default: "default-thumbnail.png" })
  thumbnail: string;
  @Column()
  @IsDefined({ message: "Nama Extrakulikuler Tidak Boleh Kosong" })
  nameExtracurricular: string;
  @Column("text")
  @IsDefined({ message: "Deskripsi Ektrakulikuler Tidak Boleh Kosong !" })
  description: string;
  @Column("time")
  extraOpen: string;
  @Column("time")
  extraClose: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column("boolean", { default: true, select: false })
  active: boolean;
}
