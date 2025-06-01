import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductListScreen from "./screens/Product/ProductListScreen";
import CategoryListScreen from "./screens/Category/CategoryListScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import WarehouseListScreen from "./screens/Warehouse/WarehouseListScreen";
import ProductEditScreen from "./screens/Product/ProductEditForm";
import ProductCreateForm from "./screens/Product/ProductCreateForm";
import TransactionListScreen from "./screens/Transaction/TransactionListScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductListScreen />} />
        <Route path="/product/create" element={<ProductCreateForm />} />
        <Route path="/product/edit/:id" element={<ProductEditScreen />} />
        <Route path="/category" element={<CategoryListScreen />} />
        <Route path="/warehouse" element={<WarehouseListScreen />} />
        <Route path="/transactions" element={<TransactionListScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
