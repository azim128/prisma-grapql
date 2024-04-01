const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  res.status(201).json({ message: "User created successfully", user});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if( user.password !== password){
    return res.status(401).json({ error: "Invalid email or password" });
  }
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.status(200).json({ message: "Login successful",data: user.email});
});

module.exports = router;
