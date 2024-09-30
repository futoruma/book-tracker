const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

const all = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get books.",
    });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.author || !data.language || !data.description) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const book = await prisma.book.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add a new book.",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.book.delete({
      where: {
        id,
      },
    });

    return res.status(204).json("OK");
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to remove the book.",
    });
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;

    await prisma.book.update({
      where: {
        id,
      },
      data,
    });

    return res.status(204).json("OK");
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to edit the book.",
    });
  }
};

const book = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to get the book.",
    });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  book,
};
