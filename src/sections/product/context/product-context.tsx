/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { createContext, useCallback, useMemo, useState } from "react";

// Utils
import type { PRODUCT } from "@/types";
import { _products } from "@/_mock";

/* -------------------------------------------------------------------------- */
/*                         PRODUCT PROVIDER COMPONENT                         */
/* -------------------------------------------------------------------------- */
type ProductContextType = {
  products: PRODUCT[];
  addProduct: (newProduct: PRODUCT) => void;
  updateProduct: (updatedProduct: PRODUCT) => void;
  deleteProduct: (productId: string) => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<PRODUCT[]>(_products);

  const addProduct = useCallback((newProduct: PRODUCT) => {
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((updatedProduct: PRODUCT) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  }, []);

  const deleteProduct = useCallback((rowId: string) => {
    setProducts((prev) => prev.filter((row: { id: string }) => row.id !== rowId));
  }, []);

  const memoizedValue = useMemo(() => ({ 
    products, 
    addProduct,
    updateProduct,
    deleteProduct 
  }), [products, addProduct, updateProduct, deleteProduct]);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <ProductContext.Provider value={memoizedValue}>
      {children}
    </ProductContext.Provider>
  );
};