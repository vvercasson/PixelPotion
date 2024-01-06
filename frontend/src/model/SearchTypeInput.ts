export interface SearchTypeInput {
    id: number;
    searchType: string;
}

export const searchTypeInputs: SearchTypeInput[] = [
    { id: 1, searchType: 'Cocktail Name' },
    { id: 2, searchType: 'Ingredient Name' },
];
