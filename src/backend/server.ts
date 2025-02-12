import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import { product, category } from "./typing/model";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
dotenv.config();

// CRUD product
app.get("/product", async (_: Request, res: Response) => {
  try {
    const GetProducts =
      (await prisma.products.findMany({
        where: {
          deletedAt: null,
        },
      })) || [];
    res.status(200).json(GetProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Products" });
  }
});

app.post("/product", async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      image,
      stock,
      warehouseId,
      categoryId,
    }: product = req.body;
    if (!warehouseId) {
      res.status(400).json({ error: "warehouseId not found" });
    }
    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        price,
        image,
        warehouseId,
        categoryId,
        stock,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Create Product" });
  }
});

// end product

// CRUD category
app.get("/category", async (_: Request, res: Response) => {
  try {
    const GetCategories =
      (await prisma.categories.findMany({
        where: {
          deletedAt: null,
        },
      })) || [];
    res.status(200).json(GetCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Categories" });
  }
});

app.post("/category", async (req: Request, res: Response) => {
  try {
    const { name }: category = req.body;
    await prisma.categories.create({
      data: {
        name,
      },
    });
    res.status(201).json({ message: "Success Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Create Category" });
  }
});

app.put("/category/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name }: category = req.body;
    await prisma.categories.update({
      where: { id: parseInt(id) },
      data: {
        name,
        deletedAt: new Date(),
      },
    });
    console.log(`product ${id} soft deleted`);
    res.status(200).json({ message: "Success Update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Update Category" });
  }
});

//end category

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
