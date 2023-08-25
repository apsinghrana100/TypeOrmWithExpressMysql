import { Request, Response } from "express";
import { myDataSource } from "../entity/app-data-source";
import { User } from "../entity/user.entity";
import { User_Profile } from "../entity/user_profile";

const userRepository = myDataSource.getRepository(User);
const userProfileRepository = myDataSource.getRepository(User_Profile);


export const fetchData = async (req: Request, res: Response) => {
    try {
        // const users = await userRepository.find({relations:{profile:true}}); // incase of "lazy".we have to manully told to the..we have relationship
        //using repository
        // const users = await userRepository.find(); // incase of "eger" we  dont need to mention/told we have relationship.they automaticlly show all field/
        // Using DataSource
        // const users = await myDataSource.createQueryBuilder()
        //                 .select("user")
        //                 .from(User, "user")
        //                 .innerJoinAndSelect("user.profile","profile")
        //                 .getMany();

        // Using entity manager:

        // const users = await myDataSource.manager
        //               .createQueryBuilder(User,"user")
        //               .leftJoinAndSelect("user.profile","profile")
        //               .getMany();


        // Using repository

        const users = await myDataSource
                    .getRepository(User)
                    .createQueryBuilder("user")
                    .innerJoinAndSelect("user.profile","profile")
                    .getMany();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};

// const user = await dataSource
//     .createQueryBuilder()
//     .select("user")
//     .from(User, "user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()

export const fetchDataById = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        // const user = await userRepository.findOneBy({ id: parseInt(user_id) });
        const user = await myDataSource
                           .getRepository(User)
                          .createQueryBuilder("user")
                          .innerJoinAndSelect("user.profile","profile")
                           .where("user.id = :user_id",{user_id})
                          .getOne();

        if (user) { 
            res.status(200).json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};

export const addUserData = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, age, gender } = req.body;
        // const userProfileData = await userProfileRepository.create({
        //     age,
        //     gender,
        // });
        // const userProfile = await userProfileRepository.save(userProfileData);

        // const user = await userRepository.create({
        //     firstName,
        //     lastName,
        //     profile: userProfile,
        // });

        // const output = await userRepository.save(user);
       
        // / Create the user profile and save it
            const userProfile = await userProfileRepository
            .createQueryBuilder()
            .insert()
            .into(User_Profile)
            .values({ age, gender })
            .execute();

        // Create the user and associate it with the saved profile
            const output = await userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ firstName, lastName, profile: userProfile.raw.insertId })
            .execute();

            const apiResponse = {
                statusCode: "200",
                message: "Successful operation",
                data: output
            };
            // res.status(200).json({ msg: "Data added successfully", output });
            res.status(200).json(apiResponse);
        } catch (error) {
            res.status(400).json({ msg: "Something went wrong", error });
        }
    };

// const apiResponse = {
//     statusCode: "200",
//     message: "Successful operation",
//      data: output
//   };
export const updateById = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { firstName } = req.body;
        // const isUserExists = await userRepository.findOneBy({id:parseInt(user_id)});
        
         const isUserExists = await userRepository.findOneBy({ id: parseInt(user_id) });


        if (isUserExists) {
            /* isUserExists.firstName = firstName;
             await userRepository.save(isUserExists);*/
             await myDataSource
                            .createQueryBuilder()
                            .update(User)
                            .set({ firstName: firstName })
                            .where("id = :id", { id: user_id })
                            .execute();
            res.status(200).json({ msg: "Update successful" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong In update" });
    }
};

export const deleteData = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const isUserExists = await userRepository.findOneBy({id:parseInt(user_id)});
        if(isUserExists)
        {
            // const deleteResponse = await userRepository.delete({ id: parseInt(user_id) });
            const deleteResponse = await myDataSource
                                    .createQueryBuilder()
                                    .delete()
                                    .from(User)
                                    .where("id = :id",{id:user_id})
                                    .execute();

            res.status(200).json({ msg: "Delete User Successful!!" , deleteResponse});
        }else {
            res.status(404).json({msg:"User does not exists!!"})
        }
       
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong in Delete" });
    }
};
