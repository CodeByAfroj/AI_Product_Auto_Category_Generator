import Product from "../model/Product.js";
import generateAIData from "../services/aiService.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Call AI Service
    const aiResult = await generateAIData(title, description);

    // Save in DB
    const product = await Product.create({
      title,
      description,
      ...aiResult
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};