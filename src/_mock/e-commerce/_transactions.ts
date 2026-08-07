export interface ProductTransaction {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  createdAt: Date;
};

export const TRANSACTIONS: ProductTransaction[] = [
  // 2025 Sales
  { id: 'o1', productId: 'classic-leather-loafers', quantity: 10, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-01-15') },
  { id: 'o2', productId: 'classic-leather-loafers', quantity: 5,  unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-02-10') },
  { id: 'o3', productId: 'classic-leather-loafers', quantity: 8,  unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-03-22') },
  { id: 'o4', productId: 'classic-leather-loafers', quantity: 12, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-04-05') },
  { id: 'o5', productId: 'classic-leather-loafers', quantity: 20, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-05-18') },
  { id: 'o6', productId: 'classic-leather-loafers', quantity: 18, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-06-11') },
  { id: 'o7', productId: 'classic-leather-loafers', quantity: 25, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-07-09') },
  { id: 'o8', productId: 'classic-leather-loafers', quantity: 30, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-08-14') },
  { id: 'o9', productId: 'classic-leather-loafers', quantity: 22, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-09-20') },
  { id: 'o10', productId: 'classic-leather-loafers', quantity: 15, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-10-12') },
  { id: 'o11', productId: 'classic-leather-loafers', quantity: 19, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-11-28') },
  { id: 'o12', productId: 'classic-leather-loafers', quantity: 28, unitPrice: 97.14, unitCost: 45.00, createdAt: new Date('2025-12-05') },

  // 2026 Sales
  { id: 'o13', productId: 'classic-leather-loafers', quantity: 14, unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-01-10') },
  { id: 'o14', productId: 'classic-leather-loafers', quantity: 9,  unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-02-14') },
  { id: 'o15', productId: 'classic-leather-loafers', quantity: 11, unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-03-19') },
  { id: 'o16', productId: 'classic-leather-loafers', quantity: 7,  unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-04-23') },
  { id: 'o17', productId: 'classic-leather-loafers', quantity: 24, unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-05-30') },
  { id: 'o18', productId: 'classic-leather-loafers', quantity: 21, unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-06-15') },
  { id: 'o19', productId: 'classic-leather-loafers', quantity: 26, unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-07-08') },
  { id: 'o20', productId: 'classic-leather-loafers', quantity: 35, unitPrice: 120.00, unitCost: 45.00, createdAt: new Date('2026-08-17') },
];