export interface Item {
  id: string;
  name: string;
  price: number;
  qty?: number;
}

export interface Invoice {
  number: number;
  customerName: string;
  date: string; // "yyyy-mm-dd"
  items: Item[];
}