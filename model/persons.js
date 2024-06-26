const mongoose = require("mongoose");

const password = process.env.DB_PASSWORD;

// const url = process.env.DB_URL.replace('<password>', password)
const url = process.env.DB_URL.replace("<password>", password);
console.log("connecting to", url);

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\b\d{2,3}-\d{6,}\b/.test(v);
      },
      message: props => `${props.value} is not a valid phone number format!`
    },
    required: true
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
