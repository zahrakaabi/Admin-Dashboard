/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Outlet } from 'react-router-dom';

// Utils
import { ProductProvider } from './context/product-context';

/* -------------------------------------------------------------------------- */
/*                            PRODUCT ROUTES LAYOUT                           */
/* -------------------------------------------------------------------------- */
function ProductRoutesLayout() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}

export default ProductRoutesLayout;