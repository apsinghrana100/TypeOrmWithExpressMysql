import express from "express";
import { myDataSource } from "./entity/app-data-source"
import UserRouter  from "./router/user_router"
import ProductRouter from "./router/company_product_router"
import cors from "cors"
 import swaggerUi from "swagger-ui-express"
//  import swaggerJsDoc from "swagger-jsdoc"
 import User from "./router/user_router"
 import swaggerSpec from "./swagger/swagger"
  import swaggerDocument  from "./schemas/user_schema.json";
 
const app = express();
app.use(express.json());
app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// register routes
app.use("/api/", UserRouter);
app.use("/api/", ProductRouter);


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

