import { Request,Response } from "express";
import { myDataSource } from "../entity/app-data-source";
import { User } from "../entity/user.entity";


export const fetchData = async function (req: Request, res: Response){
    const users = await myDataSource.getRepository(User).find();
    res.json(users);
};


export const fetchDataById = (async(req:Request,res:Response)=>{

    const {user_id} = req.params;
    const users = await myDataSource.getRepository(User).findBy({id:parseInt(user_id)});
    res.json(users);
});

export const addUserData = (async function(req:Request,res:Response){
    const {firstName,lastName} = req.body
         const user = await myDataSource.getRepository(User).create({
            firstName,
            lastName
         });
            const output = await myDataSource.getRepository(User).save(user);
            
            res.status(200).json({msg:"data added successfully"});
            
        
});

export const updateById =async (req:Request,res:Response) => {
    try {


        const { user_id} =  req.params;
        const { firstName} = req.body;
        const user = await myDataSource.getRepository(User).findOneBy({id:parseInt(user_id)});
        user.firstName = firstName;

        await myDataSource.getRepository(User).save(user);
        res.status(200).json({msg:"update successfully"});
    } catch (error) {
        res.status(400).json({msg:"something went wrong"});
    }
            
}

export const deleteData = (async (req:Request,res:Response) => {
    try {
        const { user_id} =  req.params;
        const user = await myDataSource.getRepository(User).delete({id:parseInt(user_id)});
        res.status(200).json({msg:"delete Successfully"});
    } catch (error) {
            
        res.status(400).json({msg:"something went wrong in Delete"})
    }
    
    
});