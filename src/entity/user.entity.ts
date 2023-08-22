import {Entity,Column,PrimaryGeneratedColumn ,OneToOne,JoinColumn} from "typeorm";
import { User_Profile } from "./user_profile";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
        id:number;

        @Column()
        firstName: string;
    
        @Column()
        lastName: string;

        @OneToOne(()=>User_Profile,(profile)=>profile.id,{cascade:true,eager:true,onDelete:"CASCADE"})
        @JoinColumn({
            name: "profile_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "fk_Uprofile_id"
        })
        profile : User_Profile;

}