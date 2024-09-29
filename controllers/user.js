const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in the required fields.",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign(
          {
            id: user.id,
          },
          secret,
          {
            expiresIn: "1d",
          }
        ),
      });
    } else {
      return res.status(400).json({
        message: "Invalid login or password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Failed to log in.",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Please fill in the required fields.",
      });
    }

    const newUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (newUser) {
      return res.status(400).json({
        message: "Another user already signed up with this email.",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (createdUser && secret) {
      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        name,
        token: jwt.sign(
          {
            id: createdUser.id,
          },
          secret,
          {
            expiresIn: "1d",
          }
        ),
      });
    } else {
      return res.status(400).json({
        message: "Failed to create a new user.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

const current = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  login,
  signup,
  current,
};
