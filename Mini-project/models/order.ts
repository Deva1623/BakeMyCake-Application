export type Order = {
    id: number;
    itemName: string;
    quantity: number;
    price: number;
    total: number;
    customerName: string;
    email: string;
    contactNumber: string;
    address: string;
    specialInstructions: string;
    processed: boolean;
  };