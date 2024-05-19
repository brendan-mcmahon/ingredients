export default interface Ingredient {
    ingredientId: string;
    name: string;
    type: number;
    tags: string[];
    status: number;
    location: number | null;
    statusDate: Date | null;
    expirationDate: Date | null;
}