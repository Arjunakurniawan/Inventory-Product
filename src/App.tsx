import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListScreen from "./screens/Product/ProductListScreen";
import ProductCreateScreen from "./screens/Product/ProductCreateScreen";
import CategoryListScreen from "./screens/Category/CategoryListScreen";
import HomeScreen from "./screens/Home/HomeScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductListScreen />} />
        <Route path="/products/create" element={<ProductCreateScreen />} />
        <Route path="/category" element={<CategoryListScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
