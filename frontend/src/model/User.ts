export interface User {
    id: string;
    username: string;
    password: string;
    cocktailFavoritesId: string[];
}

export const createTestUser = () => {
    const user: User = {
        id: '1',
        username: 'test',
        password: 'test',
        cocktailFavoritesId: [],
    }

    return user;
}

export const createUser = (username: string, password: string) => {
    const user: User = {
        id: '1',
        username: username,
        password: password,
        cocktailFavoritesId: [],
    }
    return user;
}