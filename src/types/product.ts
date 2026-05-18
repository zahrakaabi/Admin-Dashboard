export type PRODUCT = {
  // generated
  id: string;
  slug: string;
  creationAt?: Date;

  // from form directly
  title: string;
  description: string;
  images: (string | File)[];
  code : string;
  categoryId: string;
  stock: number;
  maxStock?: number;
  quantity: number;
  prices: {
    regular: number;
    sale: number;
  };
  colors: string[];
  sizes: (number | string)[];
  gender: string;
};

export interface CategoryNode {
  id: string;
  title: string;
  slug: string;
  image?: string;
  description?: string;

  children?: CategoryNode[];
  products?: PRODUCT[];
};