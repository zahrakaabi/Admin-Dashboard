/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useParams } from 'react-router-dom';

// UI Local Component
import ProductNewEditForm from "../product-new-edit-form";
import { useProducts } from '../context/use-products';

/* -------------------------------------------------------------------------- */
/*                         PRODUCT EDIT VIEW COMPONENT                        */
/* -------------------------------------------------------------------------- */
function ProductEditView() {
/* --------------------------------- CONSTS --------------------------------- */
  const { productId } = useParams();
  const { products } = useProducts();

  const currentProduct = products.find((product) => product.id === productId);
  
/* -------------------------------- RENDERING ------------------------------- */
  return <ProductNewEditForm currentProduct={currentProduct} />
};

export default ProductEditView;