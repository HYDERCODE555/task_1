import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class SignUp {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : "varchar" , length : 30 ,nullable :false})
    name : string

    @Column({ type: 'varchar', length: 40, nullable:false , unique : true })
    email: string;
    
    @Column({type : "varchar", length : 15 , nullable : false})
    password : string

    @Column({type : "varchar", length : 15 , nullable : false})
    confirm_password :string
}