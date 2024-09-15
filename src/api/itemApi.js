import mongoose from "mongoose";
import { DATABASE_URL } from './env.js'
import express from 'express'

mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'))
const app = express();
app.use(express.json())

app.post('/product', async (req, res) => {
  const newProduct= await Product.create(req.body);
  res.status(201).send(newProduct)
});

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}