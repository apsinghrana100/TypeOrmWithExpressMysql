import * as express from "express";
import { myDataSource } from "./entity/app-data-source"

import UserRouter  from "./router/user_router"
import ProductRouter from "./router/company_product_router"

const app = express();
app.use(express.json());

// register routes
app.use("/", UserRouter);
app.use("/", ProductRouter);

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(8000 ,()=>{
            console.log("server is runnig on port numebr 8000");
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });

