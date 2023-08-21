import * as express from "express"
import { fetchDataById , fetchData, addUserData, updateById, deleteData} from "../controller.js/user_controller";


const router = express.Router();


router.get("/users", fetchData); 

router.get("/users/:user_id", fetchDataById );

router.post("/user/AddData",addUserData);

router.patch("/user/UpdateData/:user_id",updateById);

router.delete("/user/deleteData/:user_id",deleteData);




export default router;