import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async (query = "") => {
    try {
      const params = new URLSearchParams();
      if (query) params.append("q", query); // send single query parameter

      const res = await API.get(`/products/search?${params.toString()}`);
      setProducts(res.data); // backend returns all matching products
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
        <h2 className="mb-2 mb-sm-0">Products</h2>
        <div className="w-100 w-sm-auto" style={{ minWidth: "180px", maxWidth: "250px" }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
