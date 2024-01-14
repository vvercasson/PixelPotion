import { DataTypes, Model, Sequelize } from "sequelize";

interface IIngredient {
    name: string;
    measure: string;
}

interface IHomemadeCocktail {
    userId: number;
    id: number;
    name: string;
    ingredients: IIngredient[];
    instructions: string;
    image: File;
}

export class HomemadeCocktailModel extends Model<IHomemadeCocktail> implements IHomemadeCocktail {
    public id!: number;
    public userId!: number;
    public name!: string;
    public ingredients!: IIngredient[];
    public instructions!: string;
    public image!: File;

    static defineHomemadeCocktailModel(sequelize: Sequelize) {
        HomemadeCocktailModel.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
            , name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.ARRAY(DataTypes.JSON),
                allowNull: false,
            },
            instructions: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.BLOB,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'customCocktails',
            timestamps: false
        });
    }
}