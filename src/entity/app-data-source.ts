import { DataSource } from "typeorm";
import { User } from "./user.entity";

export const myDataSource = new DataSource({
    type :"mysql",
    host : "localhost",
    port : 3306,
    username :"root",
    password : "root",
    database : "test",
    entities : [User],
    logging :true,
    synchronize : true
});

