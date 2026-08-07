export type PRODUCT = {
  id: string;
  title: string;
  slug: string;
  images: (string | File)[];
  description: string;
  code: string;
  sku: string;
  category: string;
  parentCategory: string,
  gender: string;
  prices: {
    regular: number;
    sale: number;
    cost: number
  };
  stock: number;
  maxStock: number;
  quantity: number;
  colors: string[];
  sizes: (number | string)[];
  status: string;
  inventoryType: 'in stock' | 'out of stock' | 'low stock';
  creationAt: Date;
};