import { IsDefined, MinLength } from "class-validator";
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
  name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column("text")
  @IsDefined({ message: "Saran & Kritik Harus Diisi" })
  @MinLength(1, { message: "Saran & Kritik Harus Disii" })
  saran: string;
  @Column("boolean", { default: false })
  dibaca: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
