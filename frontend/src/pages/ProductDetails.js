import { useParams, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import API from "../api/api";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ must be inside the component
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ maxWidth: "800px", width: "100%" }}>
        <div className="card-header text-center">
          <h3>{product.name}</h3>
        </div>

        <div className="card-body d-flex flex-wrap">
          <div className="col-md-4 text-center mb-3">
            <img
              src={product.imageUrl || "https://via.placeholder.com/400"}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxWidth: "120px",
                maxHeight: "200px",
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div className="col-md-8">
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Description:</strong> {product.description}</p>
            {product.tags && <p><strong>Tags:</strong> {product.tags.join(", ")}</p>}

            {/* ✅ Back Button */}
            <button
              className="btn btn-secondary mt-3"
              onClick={() => navigate(-1)} // go back
            >
              &larr; Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
