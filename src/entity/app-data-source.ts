import { DataSource } from "typeorm";
import { User } from "./user.entity";
import { User_Profile } from "./user_profile";
import { Product } from "./product";
import { Company } from "./company";


export const myDataSource = new DataSource({
    type :"mysql",
    host : "localhost",
    port : 3306,
    username :"root",
    password : "root",
    database : "test",
    entities : [User, User_Profile,Product,Company],
    logging :true,
    synchronize : true
});

