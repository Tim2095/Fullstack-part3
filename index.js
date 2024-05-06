const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./model/persons");

app.use(cors());

app.use(express.json());
app.use(express.static("dist"));

morgan.token("req-body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then((person) => res.json(person));
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  await Person.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "The person is deleted",
  });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name === "" || body.number === "") {
    res.status(400).json({ error: "content is missing" });
    return;
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.find({}).then((person) => {
    const reqTime = new Date();
    res.send(`The phonebook has info of ${person.length} people
    <p>${reqTime}</p>
  `);
  });
});

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
