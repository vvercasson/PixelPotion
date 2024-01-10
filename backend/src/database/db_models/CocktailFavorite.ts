import { DataTypes, Model, Sequelize } from "sequelize";

interface ICocktailFavorite {
    id: number;
    cocktailId: number;
    userId: number;
}

export class CocktailFavoriteModel extends Model<ICocktailFavorite> implements ICocktailFavorite {
    public id!: number;
    public cocktailId!: number;
    public userId!: number;

    static defineCocktailModel(sequelize: Sequelize) {
        CocktailFavoriteModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
            , cocktailId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                }
            }
        }, {
            sequelize,
            modelName: 'cocktail',
            timestamps: false
        });
    }
}