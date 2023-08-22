import {Column,Entity,PrimaryGeneratedColumn,ManyToMany,JoinTable, ManyToOne} from "typeorm";
import { Company } from "./company";


@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    product_id:number;

    @Column()
    product_name:string;

    @ManyToOne(()=>Company,company=>company.product)
    company : Company
}