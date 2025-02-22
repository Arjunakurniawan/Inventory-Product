import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import {
  ProductRequest,
  CategoryRequest,
  WarehouseRequestehouse,
  transaction,
  Product,
  ApiResponse,
} from "./typing/model";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
dotenv.config();

// CRUD product
app.get<string, null, ApiResponse<Product[]>>("/product", async (_, res) => {
  try {
    const products =
      (await prisma.product.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          category: true,
          warehouse: true,
        },
      })) || [];

    res.status(200).json({ data: products, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: [], message: "Error Get Products" });
  }
});


app.get<string, null, ApiResponse<Product | null>>("/product/:id", async (_, res) => {
  try {
    const products =
      (await prisma.product.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          category: true,
          warehouse: true,
        },
      })) || [];

    res.status(200).json({ data: products, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: [], message: "Error Get Products" });
  }
});


app.post<string, null, ApiResponse<null>, ProductRequest>(
  "/product",
  async (req, res) => {
    try {
      await prisma.product.create({
        data: req.body,
      });
      res
        .status(201)
        .json({ data: null, message: "Product created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: null, message: "Error Create Product" });
    }
  }
);

app.delete<string, { id: string }, ApiResponse<null>>(
  "/product/:id",
  async (req, res) => {
    try {
      await prisma.product.update({
        where: { id: parseInt(req.params.id) },
        data: {
          deletedAt: new Date(),
        },
      });
      console.log("product soft deleted successfully");
      res
        .status(204)
        .json({ data: null, message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: null, message: "Error Delete Product" });
    }
  }
);

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
    console.log("category soft deleted");
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
    const getTransaction = await prisma.transaction.findUnique({
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
    });
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

app.delete("/transaction/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        deletedAt: new Date(),
      },
    });
    res.status(200).json({ message: "transaction soft deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Delete Transaction" });
  }
});

app.put("/transaction/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, quantity, productId }: transaction = req.body;
    await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        type,
        transactionItem: {
          update: {
            where: { id: productId },
            data: {
              quantity,
            },
          },
        },
      },
    });
    console.log("succes update");
    res.status(200).json({ message: "Success Update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Update Transaction" });
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
