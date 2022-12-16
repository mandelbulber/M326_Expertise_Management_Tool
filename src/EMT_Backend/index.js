const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");

db.sequelize.sync({ alter: true }).then(() => {
  addTestData();
});
// force: true will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
//  console.log('Drop and Resync Database with { force: true }');
//  initial();
//});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/competence.routes")(app);
require("./app/routes/difficulty.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/status.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

const Role = db.role;
const Status = db.status;
const Competence = db.competence;
const User = db.user;
const Resource = db.resource;
const Category = db.category;
const Difficulty = db.difficulty;

function addTestData() {
  Difficulty.findOrCreate({
    where: { id: 1, name: db.DIFFICULTIES[0] },
  });

  Difficulty.findOrCreate({
    where: { id: 2, name: db.DIFFICULTIES[1] },
  });

  Difficulty.findOrCreate({
    where: { id: 3, name: db.DIFFICULTIES[2] },
  });

  Category.findOrCreate({
    where: { id: 1, name: "TestCategory1" },
  });

  Category.findOrCreate({
    where: { id: 2, name: "TestCategory2" },
  });

  Role.findOrCreate({
    where: { id: 1, name: db.ROLES[0] },
  });

  Role.findOrCreate({
    where: { id: 2, name: db.ROLES[1] },
  });

  Status.findOrCreate({
    where: { id: 1, name: "TestStatus1" },
  });

  Status.findOrCreate({
    where: { id: 2, name: "TestStatus2" },
  });

  User.findOrCreate({
    where: {
      id: 1,
      email: "test@test.com",
      password: "$2a$08$aobMGyJJEby4irclcekV6..wAgJf3/MibRkPGF3eiODbZnvZiMj0q",
      firstname: "Test",
      lastname: "ing",
    },
  }).then((user) => {
    if (user[1]) {
      user[0].setRoles([1, 2]);
    }
  });

  User.findOrCreate({
    where: {
      id: 2,
      email: "test2@test.com",
      password: "$2a$08$aobMGyJJEby4irclcekV6..wAgJf3/MibRkPGF3eiODbZnvZiMj0q",
      firstname: "Test2",
      lastname: "ing",
    },
  }).then((user) => {
    if (user[1]) {
      user[0].setRoles([1]);
    }
  });

  Competence.findOrCreate({
    where: {
      id: 1,
      name: "TestCompetence1",
      description: "TestCompetence1Desc",
      categoryId: 1,
      difficultyId: 1,
    },
  }).then((competence) => {
    if (competence[1]) {
      competence[0].addUser(1, { through: { statusId: 1 } });
    }
  });

  Competence.findOrCreate({
    where: {
      id: 2,
      name: "TestCompetence2",
      description: "TestCompetence2Desc",
      categoryId: 2,
      difficultyId: 2,
    },
  }).then((competence) => {
    if (competence[1]) {
      competence[0].addUser(1, { through: { statusId: 2 } });
    }
  });;

  Resource.findOrCreate({
    where: {
      id: 1,
      url: "https://someResource1.com/",
      competenceId: 1,
    },
  });

  Resource.findOrCreate({
    where: {
      id: 2,
      url: "https://someResource2.com/",
      competenceId: 2,
    },
  });
}
