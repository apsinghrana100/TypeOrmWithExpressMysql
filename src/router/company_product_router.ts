import * as express  from "express";
import { addProduct } from "../controller/company_product_controller";
const router = express.Router();


router.post('/productCompany/addData',addProduct);


export default router;