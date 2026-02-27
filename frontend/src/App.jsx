import React, { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5050/api/products/create",
        { title, description }
      );
      setResult(response.data);
    } catch (err) {
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          AI Product Auto Category Generator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Generating..." : "Create Product"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border">
            <h3 className="text-xl font-semibold mb-4">
              AI Generated Result
            </h3>

            <p>
              <span className="font-medium">Primary Category:</span>{" "}
              {result.primaryCategory}
            </p>

            <p>
              <span className="font-medium">Sub Category:</span>{" "}
              {result.subCategory}
            </p>

            <div className="mt-4">
              <p className="font-medium mb-2">SEO Tags:</p>
              <div className="flex flex-wrap gap-2">
                {result.seoTags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium mb-2">Sustainability Filters:</p>
              <div className="flex flex-wrap gap-2">
                {result.sustainabilityFilters?.map((filter, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;