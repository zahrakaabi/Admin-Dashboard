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

export const _products: PRODUCT[] = [
  {
    id: 'classic-leather-loafers',
    title: 'Classic Leather Loafers',
    slug: 'classic-leather-loafers',
    images: ['https://images.unsplash.com/photo-1777915423816-0a7ca479342e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2xhc3NpYyUyMExlYXRoZXIlMjBMb2FmZXJzJTIwd29tYW4lMjB3aGl0ZXxlbnwwfHwwfHx8MA%3D%3D'],
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
    images: ['https://images.unsplash.com/photo-1610664676282-55c8de64f746?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
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
    images: ['https://images.unsplash.com/photo-1601592996763-f05c9c80a7f1?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
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
    images: ['https://images.unsplash.com/photo-1719421992052-e7d4394fa7fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE92ZXJzaXplZCUyMEhlYXZ5d2VpZ2h0JTIwSG9vZGllJTIwd2hpdGUlMjBmb3IlMjBraWRzfGVufDB8fDB8fHww'],
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
    images: ['https://images.unsplash.com/photo-1642375352634-ad952121fdb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VXJiYW4lMjBXYXRlcnByb29mJTIwQmFja3BhY2slMjBibGFjayUyMGZvciUyMHdvbWFufGVufDB8fDB8fHww'],
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
    images: ['https://images.unsplash.com/photo-1555583743-991174c11425?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VmludGFnZSUyMERlbmltJTIwSmFja2V0JTIwZm9yJTIwbWVufGVufDB8fDB8fHww'],
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
    images: ['https://images.unsplash.com/photo-1637160151663-a410315e4e75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBGaXRuZXNzJTIwVHJhY2tlciUyMFdhdGNoJTIwYmxhY2slMjBmb3IlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D'],
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
    images: ['https://images.unsplash.com/photo-1604400389379-bd02bdc0f022?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENsYXNzaWMlMjBXaGl0ZSUyMENhc3VhbCUyMFNuZWFrZXJzJTIwZm9yJTIwa2lkc3xlbnwwfHwwfHx8MA%3D%3D'],
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
    images: ['https://images.unsplash.com/photo-1752778598489-ae34ac74ab34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEF0aGxldGljJTIwQ29tcHJlc3Npb24lMjBTaG9ydHMlMjBibGFjayUyMGZvciUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D'],
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
    images: ['https://images.unsplash.com/photo-1708799366365-a24608103bed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9sYXJpemVkJTIwU3BvcnQlMjBTdW5nbGFzc2VzJTIwYmxhY2slMjBmb3IlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D'],
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