const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER, process.env.DB_PASSWORD);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hai1jds.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const portfolioCollection = client
      .db("portfolioData")
      .collection("projects");
    app.get("/project", async (req, res) => {
      const query = {};
      const cursor = portfolioCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const project = await portfolioCollection.findOne(query);
      res.send(project);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("portfolio server is running");
});

app.listen(port, () => {
  console.log(`portfolio  listening on port ${port}`);
});
