"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get<Product[]>(`${API_BASE}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setCart(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock,
        },
      ];
    });
  };

  const increaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartItemsCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fed7aa 0, transparent 45%), radial-gradient(circle at bottom right, #bfdbfe 0, transparent 45%), #0f172a",
        padding: "2.5rem 0",
        fontFamily: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          backgroundColor: "rgba(248,250,252,0.96)",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(15,23,42,0.45)",
          overflow: "hidden",
        }}
      >
        {/* Hero section (unchanged) */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "2rem",
            padding: "2.5rem 2.75rem 2rem",
            background:
              "linear-gradient(135deg,#4f46e5 0%,#ec4899 40%,#f97316 100%)",
            color: "#f9fafb",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.4rem",
                fontWeight: 800,
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              Shop the Latest Tech & Fashion
            </h1>
            <p
              style={{
                marginTop: "0.9rem",
                maxWidth: "460px",
                fontSize: "0.98rem",
                lineHeight: 1.6,
                color: "#e5e7eb",
              }}
            >
              Discover hand‑picked gadgets, accessories, and lifestyle products
              at student‑friendly prices.
            </p>
          </div>
        </section>

        {/* Content section */}
        <section
          id="products-section"
          style={{
            padding: "2.4rem 2.75rem 2.8rem",
            background:
              "radial-gradient(circle at top left,#e5e7eb 0,transparent 45%), #f9fafb",
          }}
        >
          {/* Cart */}
          <div
            style={{
              marginBottom: "1.6rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {/* Left: title + detailed list */}
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Your Cart
              </h2>
              <p
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                {cart.length === 0
                  ? "No items yet. Add something you like!"
                  : "Review items before checkout."}
              </p>

              {cart.length > 0 && (
                <div
                  style={{
                    marginTop: "0.8rem",
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                    padding: "0.75rem 1rem",
                  }}
                >
                  {cart.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: "#6b7280" }}>
                          ₹{item.price} × {item.quantity}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <button
                          onClick={() => decreaseQty(item.id)}
                          style={{
                            padding: "0.15rem 0.45rem",
                            borderRadius: "999px",
                            border: "none",
                            backgroundColor: "#e5e7eb",
                            cursor: "pointer",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            minWidth: "1.4rem",
                            textAlign: "center",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          style={{
                            padding: "0.15rem 0.45rem",
                            borderRadius: "999px",
                            border: "none",
                            backgroundColor: "#22c55e",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            padding: "0.15rem 0.6rem",
                            borderRadius: "999px",
                            border: "none",
                            backgroundColor: "#ef4444",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: summary */}
            <div
              style={{
                minWidth: "220px",
                borderRadius: "14px",
                border: "1px dashed #e5e7eb",
                backgroundColor: "#ffffff",
                padding: "0.75rem 1rem",
                fontSize: "0.86rem",
              }}
            >
              {cart.length === 0 ? (
                <span style={{ color: "#6b7280" }}>
                  Cart (0 items) · Total: ₹0
                </span>
              ) : (
                <>
                  <strong
                    style={{ display: "block", marginBottom: "0.3rem" }}
                  >
                    Cart ({cartItemsCount} items) · Total: ₹
                    {cartTotal.toFixed(2)}
                  </strong>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.1rem",
                      color: "#374151",
                    }}
                  >
                    {cart.map(item => (
                      <li key={item.id}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Products grid */}
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              margin: "0 0 1rem",
              color: "#111827",
            }}
          >
            Featured Products
          </h3>

          {loading ? (
            <p style={{ color: "#6b7280" }}>Loading products…</p>
          ) : products.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              No products yet. Add items from the colorful admin panel at{" "}
              <strong>/admin</strong>.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(230px,1fr))",
                gap: "1.4rem",
              }}
            >
              {products.map(product => (
                <article
                  key={product.id}
                  style={{
                    position: "relative",
                    borderRadius: "18px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 10px 25px rgba(15,23,42,0.07)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      height: "170px",
                      backgroundColor: "#e5e7eb",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        product.image_url ||
                        "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800"
                      }
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div style={{ padding: "0.9rem 1rem 1.1rem" }}>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "#f97316",
                        fontWeight: 700,
                        marginBottom: "0.25rem",
                      }}
                    >
                      Hot Pick
                    </div>

                    <h4
                      style={{
                        margin: 0,
                        marginBottom: "0.25rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      {product.name}
                    </h4>

                    {product.description && (
                      <p
                        style={{
                          margin: 0,
                          marginBottom: "0.4rem",
                          fontSize: "0.85rem",
                          color: "#6b7280",
                        }}
                      >
                        {product.description}
                      </p>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "0.4rem",
                        gap: "0.5rem",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            color: "#16a34a",
                          }}
                        >
                          ₹{product.price}
                        </span>
                        <span
                          style={{
                            marginLeft: "0.3rem",
                            fontSize: "0.8rem",
                            color: "#9ca3af",
                          }}
                        >
                          · In stock: {product.stock}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => addToCart(product)}
                          style={{
                            padding: "0.45rem 0.9rem",
                            borderRadius: "999px",
                            border: "none",
                            background:
                              "linear-gradient(135deg,#4f46e5,#ec4899)",
                            color: "#f9fafb",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          style={{
                            padding: "0.45rem 0.7rem",
                            borderRadius: "999px",
                            border: "none",
                            background:
                              "linear-gradient(135deg,#f97316,#dc2626)",
                            color: "#ffffff",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
