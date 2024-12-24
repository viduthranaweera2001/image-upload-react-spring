import React, { useState } from "react";
import axios from "axios";
import '../styles/CreateProduct.css'

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("image", formData.image);

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/products`, data, {
            // .post("http://localhost:8081/products", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                alert("Product created successfully!");
                console.log("Response:", response.data);
                setFormData({
                    name: "",
                    price: "",
                    description: "",
                    image: null,
                });
            })
            .catch((error) => {
                console.error("Error creating product:", error);
                alert("Failed to create product. Please try again.");
            });
    };

    return (
        <div className="create-product2-container">
            <h1 className="create-product2-title">Create Product2</h1>
            <form className="create-product2-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Price:</label>
                    <input
                        className="form-input"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Image:</label>
                    <input
                        className="form-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {formData.image && (
                    <img
                        className="image-preview"
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                    />
                )}
                <button className="submit-button" type="submit">
                    Create Product
                </button>
            </form>
        </div>


    );
};

export default CreateProduct;
