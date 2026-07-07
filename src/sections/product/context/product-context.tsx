/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { createContext, useMemo, useState } from "react";

// Utils
import type { PRODUCT } from "@/types";
import { _products } from "@/_mock";

/* -------------------------------------------------------------------------- */
/*                         PRODUCT PROVIDER COMPONENT                         */
/* -------------------------------------------------------------------------- */
type ProductContextType = {
  products: PRODUCT[];
  addProduct: (newProduct: PRODUCT) => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<PRODUCT[]>(_products);

  const addProduct = (newProduct: PRODUCT) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const memoizedValue = useMemo(() => ({ 
    products, 
    addProduct 
  }), [products]);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <ProductContext.Provider value={memoizedValue}>
      {children}
    </ProductContext.Provider>
  );
}