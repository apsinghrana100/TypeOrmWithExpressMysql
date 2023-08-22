import {Column,Entity,PrimaryGeneratedColumn,OneToMany,JoinColumn, ManyToOne} from "typeorm";
import { Product } from "./product";

@Entity()
export class Company{
    @PrimaryGeneratedColumn()
    company_id:number;

    @Column()
    company_name:string;

    @OneToMany(()=>Product,(product)=>product.company,{cascade:true})
    product : Product;
}