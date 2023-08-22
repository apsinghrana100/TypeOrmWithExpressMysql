import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User_Profile {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:"numeric"
    })
    age:number;

    @Column()
    gender:string
}