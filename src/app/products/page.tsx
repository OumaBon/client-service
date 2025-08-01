"use client";

import { useState, useEffect } from "react";
import { getAllProducts, Product } from "@/services/product.service";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Could not load products");
        console.error(err);
      }
    }

    fetchProducts();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Lists</h1>
      {products.map((product) => (
        <div
          key={product.slug}
          className="border rounded-lg p-4 mb-6 shadow-sm bg-white"
        >
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            <strong>Brand:</strong> {product.brand?.name}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Category:</strong> {product.category?.name}
          </p>
          <p className="text-lg font-bold mt-2">Base Price: ${product.price}</p>

          {/* Images */}
          <div className="flex gap-3 mt-3">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.image_url}
                alt={img.alt_text}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>

          {/* Variants */}
          <div className="mt-4">
            <h3 className="font-medium mb-2">Variants:</h3>
            <ul className="list-disc pl-5">
              {product.variants?.map((variant, idx) => (
                <li key={idx}>
                  Size: {variant.size}, Color: {variant.color}, SKU:{" "}
                  {variant.sku}, Stock: {variant.stock}, Price: $
                  {variant.price_override || product.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
