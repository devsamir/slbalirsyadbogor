import { IsDefined, IsEmail, MinLength } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Suggestion {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  @IsDefined({ message: "Nama Harus Diisi" })
  @MinLength(1, { message: "Nama Harus Disii" })
  fullName: string;
  @Column()
  @IsDefined({ message: "Nama Harus Diisi" })
  @IsEmail({}, { message: "Format Email Salah" })
  email: string;
  @Column()
  @IsDefined({ message: "Saran & Kritik Harus Diisi" })
  @MinLength(1, { message: "Saran & Kritik Harus Disii" })
  suggestion: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
