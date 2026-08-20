/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Component
import ProductNewEditForm from "../product-new-edit-form";
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';

// Types
import { paths } from '@/routes/paths';

/* -------------------------------------------------------------------------- */
/*                        PRODUCT CREATE VIEW COMPONENT                       */
/* -------------------------------------------------------------------------- */
function ProductCreateView() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto w-full max-w-7xl">
      <CustomBreadcrumbs
        heading='Create a new product'
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.list },
          { name: 'create', href: paths.dashboard.product.create }
        ]}
      />

      <div className="mt-8">
        <ProductNewEditForm />
      </div>
    </div>
  );
};

export default ProductCreateView;