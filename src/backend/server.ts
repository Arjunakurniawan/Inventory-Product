import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import { product, category, warehouse, transaction } from "./typing/model";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
dotenv.config();

// CRUD product
app.get("/product", async (_: Request, res: Response) => {
  try {
    const GetProducts =
      (await prisma.product.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
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

    if (!warehouseId || !categoryId) {
      res.status(400).json({ error: "warehouseId not found" });
    }

    await prisma.product.create({
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
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Create Product" });
  }
});

app.delete("/product/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        deletedAt: new Date(),
      },
    });
    console.log("product soft deleted successfully");
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Delete Product" });
  }
});

// end product

// CRUD category
app.get("/category", async (_: Request, res: Response) => {
  try {
    const GetCategories =
      (await prisma.category.findMany({
        where: {
          deletedAt: null,
        },
      })) || [];
    console.log("fetching category", GetCategories);
    res.status(200).json(GetCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Categories" });
  }
});

app.post("/category", async (req: Request, res: Response) => {
  try {
    const { name }: category = req.body;
    await prisma.category.create({
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

app.delete("/category/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        deletedAt: new Date(),
      },
    });
    console.log("category soft deleted");
    res.status(200).json({ message: "Success Delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Delete Category" });
  }
});

app.put("/category/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name }: category = req.body;
    await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });
    console.log("product soft deleted");
    res.status(200).json({ message: "Success Update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Update Category" });
  }
});

//end category

//CRUD warehouse
app.get("/warehouse", async (_: Request, res: Response) => {
  try {
    const GetWarehouses =
      (await prisma.warehouse.findMany({
        where: {
          deletedAt: null,
        },
      })) || [];
    res.status(200).json(GetWarehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Warehouses" });
  }
});

app.post("/warehouse", async (req: Request, res: Response) => {
  try {
    const { name, address, phone }: warehouse = req.body;
    await prisma.warehouse.create({
      data: {
        name,
        address,
        phone,
      },
    });
    res.status(201).json({ message: "Success Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Create Warehouse" });
  }
});

app.delete("/warehouse/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.warehouse.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.status(200).json({ message: "Category is Soft Delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Delete Warehouse" });
  }
});

app.put("/warehouse/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address, phone }: warehouse = req.body;
    await prisma.warehouse.update({
      where: { id: parseInt(id) },
      data: {
        name,
        address,
        phone,
      },
    });
    res.status(200).json({ message: "Success Update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Update Warehouse" });
  }
});
//end warehouse

//CRUD Transaction
app.get("/transaction", async (_: Request, res: Response) => {
  try {
    const getTransaction = await prisma.transaction.findMany({
      where: {
        deletedAt: null,
      },
    });
    res.status(200).json(getTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Transactions" });
  }
});

app.get("/transaction/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getTransaction =
      (await prisma.transaction.findUnique({
        where: {
          id: parseInt(id),
          deletedAt: null,
        },
        include: {
          transactionItem: {
            include: {
              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      })) || [];
    console.log(getTransaction);
    res.status(200).json(getTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Get Transactions" });
  }
});

app.post("/transaction", async (req: Request, res: Response) => {
  try {
    const { type, productId, quantity }: transaction = req.body;

    await prisma.transaction.create({
      data: {
        type,
        transactionItem: {
          create: {
            productId,
            quantity,
          },
        },
      },
    });
    res.status(201).json({ message: "Success Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Create Transaction" });
  }
});
//end Transaction

const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to Prisma!");
  } catch (error) {
    console.error("Error connecting to Prisma:", error);
  }
};

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

connectPrisma();
