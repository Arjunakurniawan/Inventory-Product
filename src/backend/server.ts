import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PrismaClient, TransactionsDetails } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
dotenv.config();

app.use(bodyParser.json());

app.get("/", async (_: Request, res: Response) => {
  try {
    const GetProducts = (await prisma.products.findMany()) || [];
    res.status(200).json(GetProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Products" });
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { product, warehouse, transaction, category } = req.body;
    const CreateProduct = await prisma.products.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        createdAt: new Date(),
        category: {
          connectOrCreate: {
            where: { id: category.id },
            create: { name: category.name },
          },
        },
        warehouse: {
          connectOrCreate: {
            where: { id: warehouse.id },
            create: {
              name: warehouse.name,
              address: warehouse.address,
              phone: warehouse.phone,
              createdAt: new Date(),
            },
          },
        },
        transactionsDetails: {
          connectOrCreate: {
            where: { id: transaction.id },
            create: { type: transaction.type, date: transaction.date },
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "Create Products Success", data: CreateProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Create Products" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
