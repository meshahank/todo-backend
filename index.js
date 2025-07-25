const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// POST a new todo
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  const newTodo = await prisma.todo.create({
    data: { title, description },
  });
  res.status(201).json(newTodo);
});

// UPDATE a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const updated = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, description, isCompleted },
  });
  res.json(updated);
});

// DELETE a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.json({ message: "Todo deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
