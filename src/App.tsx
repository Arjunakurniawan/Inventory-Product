import Navbar from "./components/layout/navbar";
import TableAll from "./components/shared/tableAll";
import TableProduct from "./components/product/tableProduct";
import TableCategory from "./components/category/tableCategory";
import FormAddProduct from "./components/product/formAddProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TableAll />} />
        <Route path="/product" element={<TableProduct />} />
        <Route path="/FormAddProduct" element={<FormAddProduct />} />

        <Route path="/category" element={<TableCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
