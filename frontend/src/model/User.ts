export interface User {
    id: number;
    username: string;
    password: string;
    cocktailFavoritesId: string[];
}

export const createUser = (id: number, username: string, password: string) => {
    const user: User = {
        id: id,
        username: username,
        password: password,
        cocktailFavoritesId: [],
    }
    return user;
}