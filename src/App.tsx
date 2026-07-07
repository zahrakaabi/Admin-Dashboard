/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Route, Routes } from 'react-router-dom';

// UI Local Components
import Layout from './layouts/dashboard/layout';
import { ProductListView, ProductNewEditForm, ProductRoutesLayout } from './sections';

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
          <Route path="/dashboard/product" element={<ProductListView />} />
          <Route path="/dashboard/product/add" element={<ProductNewEditForm />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App;