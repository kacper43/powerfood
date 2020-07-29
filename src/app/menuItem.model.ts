export interface MenuItem {
    id: number;
    name: string;
    toppings: string;
    sizes: Array<{size: string, price: number}>;
    category: string;
}
