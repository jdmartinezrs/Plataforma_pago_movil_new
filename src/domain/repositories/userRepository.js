import User from "../models/userModel.js";
import { Op } from "sequelize";

class UserRepository {



    async postNewUser(data) {
        return await User.create(data);
    }

        async findByUsername(username) {
        return await User.findOne({
            where: {
                [Op.or]: [
                    { usr_name: username },
                    
                ]
            }
        });
    }


    async userLogin(usr_name) {
        return await User.findOne({ where: { usr_name } });
    }

}

export default new UserRepository();