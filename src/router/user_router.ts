import * as express from "express"
import { fetchDataById , fetchData, addUserData, updateById, deleteData} from "../controller.js/user_controller";


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

router.get("/users", fetchData); 

router.get("/users/:user_id", fetchDataById );

router.post("/user/AddData",addUserData);

router.patch("/user/UpdateData/:user_id",updateById);

router.delete("/user/deleteData/:user_id",deleteData);




export default router;