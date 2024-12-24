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
            .post("http://autorack.proxy.rlwy.net:17847/products", data, {
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
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                {formData.image && (
                    <img src={URL.createObjectURL(formData.image)} alt="Preview" />
                )}
                <button type="submit">Create Product</button>
            </form>
        </div>

    );
};

export default CreateProduct;
