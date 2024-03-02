export type Item = {
    [x: string]: any;
    
    id?: string | number;
    name?: string,
    description?: string,
    price?: number,
    image?: string,
    category?: string;
    rating?: number; 
}