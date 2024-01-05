import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class User extends Model {
    public username!: string;
    public password!: string;
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "users",
        sequelize,
    }
);

export default User;