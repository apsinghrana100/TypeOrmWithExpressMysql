import * as express from "express";
import { myDataSource } from "./entity/app-data-source"

import UserRouter  from "./router/user_router"
import ProductRouter from "./router/company_product_router"
import * as cors from "cors"

 import ss from "./router/user_router"

 import * as swaggerUi from "swagger-ui-express"
//  const swaggerUi = require("swagger-ui-express");
 import * as swaggerJsDoc from "swagger-jsdoc"
//  const  swaggerJsDoc = require("swagger-jsdoc"); 

const app = express();


const options = {
    definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:8000",
			},
		],
	},
	apis: [],
}

const specs = swaggerJsDoc(options);

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs))

app.use(express.json());
app.use(cors());

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

