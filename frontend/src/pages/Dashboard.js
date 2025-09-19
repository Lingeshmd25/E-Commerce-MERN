import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import API from "../api/api";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { products, fetchProducts } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    tags: "",
    imageFile: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user) return;
    setLoadingUser(false);
    if (user.role === "Admin") {
      fetchProducts();
    } else {
      Swal.fire("Access Denied", "You are not authorized", "error");
    }
  }, [user]);

  if (loadingUser) return <p>Loading...</p>;
  if (user.role !== "Admin") return null;

  // ---------------- Validation ----------------
  const validateForm = () => {
    const { name, description, price, stock, category, imageFile } = formData;
    const errors = [];
    if (!name?.trim()) errors.push("• Product name is required");
    if (!description?.trim()) errors.push("• Description is required");
    if (!price || Number(price) <= 0) errors.push("• Price must be > 0");
    if (!stock || Number(stock) < 0) errors.push("• Stock cannot be negative");
    if (!category?.trim()) errors.push("• Category is required");
    if (!imageFile && !editingId) errors.push("• Product image is required");
    if (errors.length > 0) {
      Swal.fire({ icon: "error", title: "Validation Errors", html: errors.join("<br />") });
      return false;
    }
    return true;
  };

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let imageUrl = "";

      // Only upload if new image selected
      if (formData.imageFile) {
        const data = new FormData();
        data.append("file", formData.imageFile);
        data.append("upload_preset", "ml_default"); // Must match preset

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/de9zgmdpf/image/upload",
          { method: "POST", body: data }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error?.message || "Cloudinary upload failed");
        }

        const result = await res.json();
        imageUrl = result.secure_url; // ✅ assign uploaded URL
      }

      // Build payload
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category.trim(),
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        imageUrl,
      };

      if (editingId) {
        await API.put(`/products/${editingId}`, payload);
        Swal.fire("Success", "Product updated successfully", "success");
      } else {
        await API.post("/products", payload);
        Swal.fire("Success", "Product created successfully", "success");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      tags: "",
      imageFile: null,
    });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      tags: product.tags?.join(",") || "",
      imageFile: null,
    });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await API.delete(`/products/${id}`);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  // ---------------- Stats & Pagination ----------------
  const totalStock = products.reduce((acc, p) => acc + Number(p.stock || 0), 0);
  const totalCategories = [...new Set(products.map((p) => p.category))].length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mt-3">
      <h2 className="text-center my-4">Admin Dashboard</h2>

      {/* Stats */}
      <div className="row mb-3">
        <div className="col-md-4 mb-3">
          <div className="card p-3 text-center bg-light">
            <h6>Total Products</h6>
            <h3>{products.length}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 text-center bg-light">
            <h6>Total Stock</h6>
            <h3>{totalStock}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 text-center bg-light">
            <h6>Total Categories</h6>
            <h3>{totalCategories}</h3>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="text-center mb-4">{editingId ? "Edit Product" : "Create Product"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {["name", "description", "price", "stock", "category", "tags"].map((field) => (
                <div className="col-md-6 col-12 mb-3" key={field}>
                  <label className="form-label fw-bold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === "price" || field === "stock" ? "number" : "text"}
                    className="form-control"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                </div>
              ))}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label fw-bold">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                />
                {formData.imageFile && (
                  <img
                    src={URL.createObjectURL(formData.imageFile)}
                    alt="Preview"
                    width="100"
                    className="mt-2 rounded"
                  />
                )}
              </div>
            </div>
            <div className="d-flex flex-wrap mt-3">
              <button type="submit" className="btn btn-success me-2 mb-2">{editingId ? "Update" : "Create"}</button>
              {editingId && <button type="button" className="btn btn-secondary mb-2" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      {/* Products Table */}
      <h5>Product List</h5>
      <table className="table table-bordered align-middle text-center">
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Tags</th><th>Image</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? currentProducts.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>{p.tags?.join(", ")}</td>
              <td>
                <img src={p.imageUrl || "https://via.placeholder.com/100"} alt={p.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }} />
              </td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="7">No products found</td></tr>}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-secondary me-2" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>Prev</button>
          <span className="align-self-center mx-2">Page {currentPage} of {totalPages}</span>
          <button className="btn btn-secondary ms-2" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
