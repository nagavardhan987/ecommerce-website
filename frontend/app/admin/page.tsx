"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  stock: string;
  image_url: string;
}

export default function AdminPage() {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock || "0", 10),
      };
      await axios.post(`${API_BASE}/products`, payload);
      setMessage("Product created successfully 🎉");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Error creating product. Check backend / CORS.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#f97316 0,transparent 45%),radial-gradient(circle at bottom right,#38bdf8 0,transparent 45%),#020617",
        padding: "2.5rem 0",
        fontFamily: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "rgba(15,23,42,0.96)",
          borderRadius: "26px",
          boxShadow: "0 22px 60px rgba(15,23,42,0.85)",
          overflow: "hidden",
          color: "#e5e7eb",
        }}
      >
        {/* Header / hero */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "2.25rem",
            padding: "2.4rem 2.6rem 2.1rem",
            background:
              "linear-gradient(135deg,#22c55e 0%,#0ea5e9 40%,#6366f1 75%,#ec4899 100%)",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.1rem",
                fontWeight: 800,
                margin: 0,
                letterSpacing: "0.03em",
              }}
            >
              Admin Control Center
            </h1>
            <p
              style={{
                marginTop: "0.8rem",
                maxWidth: "480px",
                fontSize: "0.98rem",
                lineHeight: 1.6,
                color: "#f9fafb",
              }}
            >
              Add new products, update stock, and keep your ecommerce storefront
              always fresh and exciting.
            </p>
            <div
              style={{
                marginTop: "1.3rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                flexWrap: "wrap",
                fontSize: "0.85rem",
              }}
            >
              <span
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  backgroundColor: "rgba(15,23,42,0.9)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Manage inventory
              </span>
              <span style={{ color: "#eef2ff" }}>
                🛒 Products here appear instantly on{" "}
                <strong>Shop the Latest Tech &amp; Fashion</strong>.
              </span>
            </div>
          </div>

          {/* Admin illustration */}
          <div
            style={{
              position: "relative",
              height: "210px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "22px",
                background:
                  "url('https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=800') center/cover",
                boxShadow: "0 20px 45px rgba(15,23,42,0.9)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-18px",
                left: "6%",
                right: "6%",
                display: "flex",
                justifyContent: "space-between",
                gap: "0.6rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderRadius: "16px",
                  padding: "0.55rem 0.8rem",
                  backgroundColor: "rgba(15,23,42,0.95)",
                  fontSize: "0.8rem",
                  color: "#e5e7eb",
                }}
              >
                <div style={{ fontWeight: 600 }}>Live Store Stats</div>
                <div>Instant sync with customer storefront and cart.</div>
              </div>
              <div
                style={{
                  width: "120px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "2px solid rgba(248,250,252,0.9)",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Admin ecommerce"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form section */}
        <section
          style={{
            padding: "2.6rem 2.6rem 2.9rem",
            background:
              "radial-gradient(circle at top left,#111827 0,transparent 45%),#020617",
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: "0.35rem",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#f9fafb",
            }}
          >
            Add a New Product
          </h2>
          <p
            style={{
              margin: 0,
              marginBottom: "1.4rem",
              fontSize: "0.9rem",
              color: "#9ca3af",
            }}
          >
            Fill in the details below. Use a high‑quality image URL for best
            results on the storefront.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: "1.6rem 2.2rem",
              alignItems: "flex-start",
            }}
          >
            {/* Left side: fields */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#e5e7eb",
                  }}
                >
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="e.g. Wireless Noise‑Cancelling Headphones"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid #4b5563",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#e5e7eb",
                  }}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Short catchy description shown on product cards…"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid #4b5563",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.9rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#e5e7eb",
                    }}
                  >
                    Price (₹)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 2499"
                    value={form.price}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid #4b5563",
                      backgroundColor: "#020617",
                      color: "#e5e7eb",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#e5e7eb",
                    }}
                  >
                    Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    placeholder="e.g. 15"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid #4b5563",
                      backgroundColor: "#020617",
                      color: "#e5e7eb",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#e5e7eb",
                  }}
                >
                  Image URL
                </label>
                <input
                  name="image_url"
                  placeholder="Paste a product image URL (JPEG/PNG)…"
                  value={form.image_url}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid #4b5563",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
            </div>

            {/* Right side: preview and submit */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              <div
                style={{
                  borderRadius: "18px",
                  padding: "1rem",
                  background:
                    "linear-gradient(145deg,#1f2937,#0f172a 45%,#4f46e5 100%)",
                  boxShadow: "0 18px 40px rgba(15,23,42,0.9)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#a5b4fc",
                    marginBottom: "0.4rem",
                  }}
                >
                  Live Preview
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: "0.7rem",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        marginBottom: "0.25rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#f9fafb",
                      }}
                    >
                      {form.name || "Product name"}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: "0.4rem",
                        fontSize: "0.85rem",
                        color: "#cbd5f5",
                      }}
                    >
                      {form.description || "Short description will appear here."}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "#bbf7d0",
                        fontWeight: 700,
                      }}
                    >
                      {form.price
                        ? `₹${form.price} · Stock: ${form.stock || 0}`
                        : "Price · Stock"}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "110px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      backgroundColor: "#111827",
                      border: "1px solid rgba(148,163,184,0.6)",
                    }}
                  >
                    <img
                      src={
                        form.image_url ||
                        "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400"
                      }
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "0.3rem",
                  padding: "0.75rem 1.4rem",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  background:
                    "linear-gradient(135deg,#22c55e,#4ade80,#a3e635)",
                  color: "#022c22",
                  boxShadow: "0 14px 30px rgba(34,197,94,0.55)",
                }}
              >
                Create Product
              </button>

              {message && (
                <p
                  style={{
                    margin: "0.4rem 0 0",
                    fontSize: "0.9rem",
                    color: message.startsWith("Error")
                      ? "#fecaca"
                      : "#bbf7d0",
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
