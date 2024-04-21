export default interface Ingredient {
    ingredientId: string;
    name: string;
    type: number;
    tags: string[];
    status: number;
    location: number;
    statusDate: Date | null;
    expirationDate: Date | null;
}