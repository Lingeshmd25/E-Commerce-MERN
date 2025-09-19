import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="text-center">
          <h5 className="card-title">{product.name}</h5>
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className="img-fluid rounded"
            style={{
              maxWidth: "150px",
                maxHeight: "120px",
              objectFit: "cover",
              border: "1px solid #ddd"
            }}
          />
        </div>
        <div className="mt-3">
          <p className="card-text text-truncate">{product.description}</p>
          <p className="fw-bold">₹{product.price}</p>
        </div>
        <Link to={`/product/${encodeURIComponent(product._id)}`} className="btn btn-primary mt-auto">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
