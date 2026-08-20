/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Route, Routes } from 'react-router-dom';

// UI Local Components
import Layout from './layouts/dashboard/layout';
import { 
  EcommerceView,
  ProductCreateView,
  ProductEditView, 
  ProductListView, 
  ProductRoutesLayout 
} from './sections';

// Styles
import './App.css';

/* -------------------------------------------------------------------------- */
/*                                APP COMPONENT                               */
/* -------------------------------------------------------------------------- */
function App() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Layout>
      <Routes>
        <Route element={<ProductRoutesLayout />}>
          // Overview
          <Route path="/dashboard" element={<EcommerceView />} />

          // Managment
          <Route path="/dashboard/product" element={<ProductListView />} />
          <Route path="/dashboard/product/add" element={<ProductCreateView />} />
          <Route path="/dashboard/product/:productId/edit" element={<ProductEditView />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App;