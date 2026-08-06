/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Types
import type { PRODUCT } from "@/types";

/* -------------------------------------------------------------------------- */
/*                              PRODUCTS MOCK DATA                            */
/* -------------------------------------------------------------------------- */
export const PRODUCT_GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'woman', label: 'Woman' },
  { value: 'kids', label: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = [
  {
    parent: 'Clothing',
    children: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'],
  },
  {
    parent: 'Tailored',
    children: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'],
  },
  {
    parent: 'Accessories',
    children: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Fac masks']
  }
];

export const PRODUCT_COLOR_OPTIONS = [
  'Red', 'Blue', 'Pink', 'Green', 'Yellow', 'Purple', 'Black', 'White'
];

export const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];

export const ACCESSORIES_SIZES = [
  '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'
];

export const NEW_PRODUCTS: {
  id: string;
  name: string;
  image: string;
}[] = [
  {
    id: '0000001',
    name: 'Urban Explorer Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '0000002',
    name: 'Classic Leather Loafers',
    image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '0000003',
    name: 'Mountain Trekking Boots',
    image: 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '0000004',
    name: 'Elegance Stiletto Heels',
    image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const _products: PRODUCT[] = [
  {
    id: 'classic-leather-loafers',
    title: 'Classic Leather Loafers',
    slug: 'classic-leather-loafers',
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    description: 'Premium quality leather loafers designed for corporate and casual lifestyle.',
    code: 'SH-LOAF-001',
    sku: 'SKU-LOAF-X1',
    category: 'Shoes',
    parentCategory: 'Accessories',
    gender: 'woman',
    prices: {
      regular: 120.00,
      sale: 97.14
    },
    stock: 75,
    maxStock: 100,
    quantity: 20,
    colors: ['Black', 'White'],
    sizes: ['38', '39', '40'],
    status: 'sale',
    inventoryType: 'in stock',
    creationAt: new Date('2024-09-15T10:00:00Z'),
  },
  {
    id: 'nike-air-max-running',
    title: 'Nike Air Max Running Shoes',
    slug: 'nike-air-max-running',
    images: ['https://images.pexels.com/photos/19090/pexels-photo.jpg'],
    description: 'Engineered lightweight mesh upper for maximum breathability with responsive cushioning.',
    code: 'SH-NIKE-002',
    sku: 'SKU-NIKE-A2',
    category: 'Shoes',
    parentCategory: 'Accessories',
    gender: 'men',
    prices: {
      regular: 180.00,
      sale: 0
    },
    stock: 5,
    maxStock: 50,
    quantity: 5,
    colors: ['Blue', 'Black'],
    sizes: ['41', '42', '43'],
    status: 'new',
    inventoryType: 'low stock',
    creationAt: new Date('2025-01-10T14:30:00Z'),
  },
  {
    id: 'minimalist-leather-wallet',
    title: 'Minimalist Leather Wallet',
    slug: 'minimalist-leather-wallet',
    images: ['https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg'],
    description: 'Slim RFID blocking wallet made from genuine top-grain leather.',
    code: 'AC-WALL-003',
    sku: 'SKU-WALL-M3',
    category: 'Accessories',
    parentCategory: 'Accessories',
    gender: 'men',
    prices: {
      regular: 45.00,
      sale: 35.00
    },
    stock: 0,
    maxStock: 30,
    quantity: 0,
    colors: ['Black', 'White'],
    sizes: ['Oversized'],
    status: 'sale',
    inventoryType: 'out of stock',
    creationAt: new Date('2024-11-05T08:15:00Z'),
  },
  {
    id: 'oversized-cotton-hoodie',
    title: 'Oversized Heavyweight Hoodie',
    slug: 'oversized-cotton-hoodie',
    images: ['https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg'],
    description: '100% organic cotton ultra-soft brushed fleece lining for cozy fit.',
    code: 'CL-HOOD-004',
    sku: 'SKU-HOOD-O4',
    category: 'Clothing',
    parentCategory: 'Clothing',
    gender: 'kids',
    prices: {
      regular: 85.00,
      sale: 0
    },
    stock: 120,
    maxStock: 200,
    quantity: 45,
    colors: ['Pink', 'White'],
    sizes: ['S', 'M', 'L'],
    status: '',
    inventoryType: 'in stock',
    creationAt: new Date('2025-02-22T11:00:00Z'),
  },
  {
    id: 'urban-waterproof-backpack',
    title: 'Urban Waterproof Backpack',
    slug: 'urban-waterproof-backpack',
    images: ['https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg'],
    description: 'Spacious daily commute pack with dedicated 16-inch laptop compartment.',
    code: 'AC-BACK-005',
    sku: 'SKU-BACK-U5',
    category: 'Accessories',
    parentCategory: 'Accessories',
    gender: 'woman',
    prices: {
      regular: 95.00,
      sale: 79.99
    },
    stock: 42,
    maxStock: 80,
    quantity: 15,
    colors: ['Black', 'Blue'],
    sizes: ['Standard'],
    status: 'sale',
    inventoryType: 'in stock',
    creationAt: new Date('2024-08-19T17:45:00Z'),
  },
  {
    id: 'vintage-denim-jacket',
    title: 'Vintage Denim Jacket',
    slug: 'vintage-denim-jacket',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'],
    description: 'Classic fit retro wash jean jacket with reinforced metal buttons.',
    code: 'CL-DENM-006',
    sku: 'SKU-DENM-V6',
    category: 'Clothing',
    parentCategory: 'Clothing',
    gender: 'men',
    prices: {
      regular: 110.00,
      sale: 0
    },
    stock: 2,
    maxStock: 40,
    quantity: 2,
    colors: ['Blue'],
    sizes: ['M', 'L', 'XL'],
    status: 'low stock',
    inventoryType: 'low stock',
    creationAt: new Date('2025-03-01T09:00:00Z'),
  },
  {
    id: 'smart-fitness-watch',
    title: 'Smart Fitness Tracker Watch',
    slug: 'smart-fitness-watch',
    images: ['https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg'],
    description: 'Heart rate monitor, step counter, and sleep tracker with a 14-day battery life.',
    code: 'AC-WTCH-007',
    sku: 'SKU-WTCH-S7',
    category: 'Accessories',
    parentCategory: 'Accessories',
    gender: 'woman',
    prices: {
      regular: 150.00,
      sale: 129.00
    },
    stock: 60,
    maxStock: 150,
    quantity: 35,
    colors: ['Black', 'Pink'],
    sizes: ['One Size'],
    status: 'sale',
    inventoryType: 'in stock',
    creationAt: new Date('2024-07-30T13:20:00Z'),
  },
  {
    id: 'classic-white-sneakers',
    title: 'Classic White Casual Sneakers',
    slug: 'classic-white-sneakers',
    images: ['https://images.pexels.com/photos/6311653/pexels-photo-6311653.jpeg'],
    description: 'Clean design sneakers featuring a vulcanized rubber sole and comfortable footbed.',
    code: 'SH-SNEK-008',
    sku: 'SKU-SNEK-C8',
    category: 'Shoes',
    parentCategory: 'Accessories',
    gender: 'kids',
    prices: {
      regular: 65.00,
      sale: 0
    },
    stock: 89,
    maxStock: 120,
    quantity: 50,
    colors: ['White'],
    sizes: ['35', '36', '37', '38'],
    status: 'new',
    inventoryType: 'in stock',
    creationAt: new Date('2025-05-12T10:00:00Z'),
  },
  {
    id: 'athletic-compression-shorts',
    title: 'Athletic Compression Shorts',
    slug: 'athletic-compression-shorts',
    images: ['https://images.pexels.com/photos/1153838/pexels-photo-1153838.jpeg'],
    description: 'Moisture-wicking base layer with 4-way stretch fabric for intense training panels.',
    code: 'CL-SHRT-009',
    sku: 'SKU-SHRT-A9',
    category: 'Clothing',
    parentCategory: 'Clothing',
    gender: 'men',
    prices: {
      regular: 35.00,
      sale: 28.00
    },
    stock: 0,
    maxStock: 100,
    quantity: 0,
    colors: ['Black', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    status: '',
    inventoryType: 'out of stock',
    creationAt: new Date('2024-06-14T07:10:00Z'),
  },
  {
    id: 'polarized-sport-sunglasses',
    title: 'Polarized Sport Sunglasses',
    slug: 'polarized-sport-sunglasses',
    images: ['https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg'],
    description: '100% UV protection lenses with lightweight, flexible, and stress-resistant frame.',
    code: 'AC-SUN-010',
    sku: 'SKU-SUN-P10',
    category: 'Accessories',
    parentCategory: 'Accessories',
    gender: 'woman',
    prices: {
      regular: 55.00,
      sale: 0
    },
    stock: 14,
    maxStock: 40,
    quantity: 14,
    colors: ['Red', 'Black'],
    sizes: ['Standard'],
    status: '',
    inventoryType: 'in stock',
    creationAt: new Date('2024-10-02T15:55:00Z'),
  },
];