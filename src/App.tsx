/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Route, Routes } from 'react-router-dom';

// UI Local Components
import Layout from './layouts/dashboard/layout';
import { ProductListView, ProductAddEditView } from './sections';

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
        <Route path="/dashboard/products" element={<ProductListView />} />
        <Route path="/dashboard/products/add" element={<ProductAddEditView />} />
      </Routes>
    </Layout>
  )
}

export default App;