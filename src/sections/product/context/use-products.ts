/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useContext } from "react";

// Utils
import { ProductContext } from "@/sections/product/context/product-context";

/* -------------------------------------------------------------------------- */
/*                           USE PRODUCT CUSTOM HOOK                          */
/* -------------------------------------------------------------------------- */
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct must be used within a ProductProvider');
  return context;
}