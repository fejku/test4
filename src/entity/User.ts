import { IsEmail, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";
import locale from "@locale/pl";

@Entity({ schema: "auth" })
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @IsEmail({}, { message: locale.provideCorrectEmail })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Length(6)
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  toJSON() {
    return classToPlain(this);
  }
}
