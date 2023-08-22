import { Request, Response } from "express";
import { myDataSource } from "../entity/app-data-source";
import { User } from "../entity/user.entity";
import { User_Profile } from "../entity/user_profile";

const userRepository = myDataSource.getRepository(User);
const userProfileRepository = myDataSource.getRepository(User_Profile);

export const fetchData = async (req: Request, res: Response) => {
    try {
        // const users = await userRepository.find({relations:{profile:true}}); // incase of "lazy".we have to manully told to the..we have relationship
        const users = await userRepository.find(); // incase of "eger" we  dont need to mention/told we have relationship.they automaticlly show all field/
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};

export const fetchDataById = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const user = await userRepository.findOneBy({ id: parseInt(user_id) });
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
        const userProfileData = await userProfileRepository.create({
            age,
            gender,
        });
        const userProfile = await userProfileRepository.save(userProfileData);

        const user = await userRepository.create({
            firstName,
            lastName,
            profile: userProfile,
        });

        const output = await userRepository.save(user);

        res.status(200).json({ msg: "Data added successfully", output });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
};

export const updateById = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { firstName } = req.body;
        const user = await userRepository.findOneBy({ id: parseInt(user_id) });
        if (user) {
            user.firstName = firstName;
            await userRepository.save(user);
            res.status(200).json({ msg: "Update successful" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong" });
    }
};

export const deleteData = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        await userRepository.delete({ id: parseInt(user_id) });
        res.status(200).json({ msg: "Delete successful" });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong in Delete" });
    }
};
