import { DataTypes, Model, Sequelize } from "sequelize";

interface IUser {
    id: number;
    username: string;
    password: string;
}

export class UserModel extends Model<IUser> {
    public username!: string;
    public password!: string;

    static defineUserModel(sequelize: Sequelize) {
        UserModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'user',
            timestamps: false
        });
    }
}
