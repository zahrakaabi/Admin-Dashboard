/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Navigate, Route, Routes } from 'react-router-dom';

// UI Local Components
import Layout from './layouts/dashboard/layout';
import { 
  EcommerceView,
  AnalyticsView,

  // product
  ProductCreateView,
  ProductEditView, 
  ProductListView, 
  ProductRoutesLayout, 

  // user
  UserRoutesLayout,
  UserListView
} from './sections';

// Styles
import './App.css';

/* -------------------------------------------------------------------------- */
/*                                APP COMPONENT                               */
/* -------------------------------------------------------------------------- */
function App() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Navigate to="e-commerce" replace />} />
        <Route path="e-commerce" element={<EcommerceView />} />
        <Route path="analytics" element={<AnalyticsView />} />

        <Route element={<ProductRoutesLayout />}>
          <Route path="product" element={<ProductListView />} />
          <Route path="product/add" element={<ProductCreateView />} />
          <Route path="product/:productId/edit" element={<ProductEditView />} />
        </Route>

        <Route element={<UserRoutesLayout />}>
          <Route path="user" element={<UserListView />} />
        </Route>
      </Route>

      {/* bare "/" redirect to the dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;