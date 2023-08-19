export default interface Ingredient {
    ingredientId: string;
    name: string;
    type: number;
    tags: string[];
    status: number;
    statusDate: Date | null;
}