import { Request,Response } from "express"
import { Product } from "../entity/product"
import { Company } from "../entity/company"
import { myDataSource } from "../entity/app-data-source"



const productRespositery =myDataSource.getRepository(Product);
const companyRespositery =myDataSource.getRepository(Company);
export const addProduct = async(req:Request,res:Response)=>{

    const { company_name, product_name} = req.body;
    console.log(company_name)
    try {
        const companyOutput = await companyRespositery.create({
            company_name
        });

        const output1 = await companyRespositery.save(companyOutput);        
        const productOutput = await productRespositery.create({
            product_name,
            company: output1
        })

        const output = await productRespositery.save(productOutput);
        res.status(200).json({msg:"inserted successfully",output})
    } catch (error) {
            res.send(`something went wrong ${error}`)
    }

        

      
}

