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

db.sequelize.sync({ alter: true }).then((response) => {
  db.user.findByPk(1).then((result) => {
    if (result == null) { // Only run addTestData if not already run
      addTestData();
    }
  });
});

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
require("./app/routes/resource.routes")(app);
require("./app/routes/user_competences.routes")(app);

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
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Difficulty.findOrCreate({
    where: { id: 2, name: db.DIFFICULTIES[1] },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Difficulty.findOrCreate({
    where: { id: 3, name: db.DIFFICULTIES[2] },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Category.findOrCreate({
    where: { id: 1, name: "SQL" },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Category.findOrCreate({
    where: { id: 2, name: "NodeJs" },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Role.findOrCreate({
    where: { id: 1, name: db.ROLES[0] },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Role.findOrCreate({
    where: { id: 2, name: db.ROLES[1] },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Status.findOrCreate({
    where: { id: 1, name: "ToDo" },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Status.findOrCreate({
    where: { id: 2, name: "In Progress" },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });
  Status.findOrCreate({
    where: { id: 3, name: "Done" },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  User.findOrCreate({
    where: {
      id: 1,
      email: "test@test.com",
      password: "$2a$08$aobMGyJJEby4irclcekV6..wAgJf3/MibRkPGF3eiODbZnvZiMj0q",
      firstname: "Test",
      lastname: "ing",
    },
  })
    .then((user) => {
      if (user[1]) {
        user[0].setRoles([1, 2]);
      }
    })
    .catch((err) => {
      console.log(err.message + " | " + err.name);
    });

  User.findOrCreate({
    where: {
      id: 2,
      email: "test2@test.com",
      password: "$2a$08$aobMGyJJEby4irclcekV6..wAgJf3/MibRkPGF3eiODbZnvZiMj0q",
      firstname: "Test2",
      lastname: "ing",
    },
  })
    .then((user) => {
      if (user[1]) {
        user[0].setRoles([1]);
      }
    })
    .catch((err) => {
      console.log(err.message + " | " + err.name);
    });

  User.findOrCreate({
    where: {
      id: 3,
      email: "admin@emt.com",
      password: "$2a$08$aobMGyJJEby4irclcekV6..wAgJf3/MibRkPGF3eiODbZnvZiMj0q",
      firstname: "admin",
      lastname: "admin",
    },
  })
    .then((user) => {
      if (user[1]) {
        user[0].setRoles([1, 2]);
      }
    })
    .catch((err) => {
      console.log(err.message + " | " + err.name);
    });

  User.findOrCreate({
    where: {
      id: 4,
      email: "teacher@emt.com",
      password: "$2a$08$aobMGyJJEby4irclcekV6..wAgJf3/MibRkPGF3eiODbZnvZiMj0q",
      firstname: "teacher",
      lastname: "teacher",
    },
  })
    .then((user) => {
      if (user[1]) {
        user[0].setRoles([1]);
      }
    })
    .catch((err) => {
      console.log(err.message + " | " + err.name);
    });

  Competence.findOrCreate({
    where: {
      id: 1,
      name: "Create a Database",
      description: "Be able to create a database in mysql",
      categoryId: 1,
      difficultyId: 1,
    },
  })
    .then((competence) => {
      if (competence[1]) {
        competence[0].addUser(1, { through: { statusId: 1 } });
      }
    })
    .catch((err) => {
      console.log(err.message + " | " + err.name);
    });

  Competence.findOrCreate({
    where: {
      id: 2,
      name: "Create Table",
      description: "Be able to create a table in mysql",
      categoryId: 1,
      difficultyId: 1,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Competence.findOrCreate({
    where: {
      id: 3,
      name: "Add data to table",
      description: "Be able to add data to a table in mysql",
      categoryId: 1,
      difficultyId: 1,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Competence.findOrCreate({
    where: {
      id: 4,
      name: "Select data from database",
      description: "Be able to select data from database in mysql",
      categoryId: 1,
      difficultyId: 2,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Competence.findOrCreate({
    where: {
      id: 5,
      name: "Edit existing date on database",
      description: "Be able to edit existing date on database in mysql",
      categoryId: 1,
      difficultyId: 2,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Competence.findOrCreate({
    where: {
      id: 6,
      name: "Use Joins in Select",
      description: "Be able to use joins in a select query in mysql",
      categoryId: 1,
      difficultyId: 3,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Competence.findOrCreate({
    where: {
      id: 7,
      name: "Create a NodeJs app",
      description: "Be able to initialize a nodejs app",
      categoryId: 2,
      difficultyId: 1,
    },
  })
    .then((competence) => {
      if (competence[1]) {
        competence[0].addUser(1, { through: { statusId: 2 } });
      }
    })
    .catch((err) => {
      console.log(err.message + " | " + err.name);
    });

  Competence.findOrCreate({
    where: {
      id: 8,
      name: "NodeJs Stuff 2",
      description: "NodeJs Stuff 2",
      categoryId: 2,
      difficultyId: 1,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Competence.findOrCreate({
    where: {
      id: 9,
      name: "NodeJs Stuff 3",
      description: "NodeJs Stuff 3",
      categoryId: 2,
      difficultyId: 2,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });
  Competence.findOrCreate({
    where: {
      id: 10,
      name: "NodeJs Stuff 4",
      description: "NodeJs Stuff 4",
      categoryId: 2,
      difficultyId: 3,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });
  Competence.findOrCreate({
    where: {
      id: 11,
      name: "NodeJs Stuff 5",
      description: "NodeJs Stuff 5",
      categoryId: 2,
      difficultyId: 3,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });
  Competence.findOrCreate({
    where: {
      id: 12,
      name: "NodeJs Stuff 6",
      description: "NodeJs Stuff 6",
      categoryId: 2,
      difficultyId: 3,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Resource.findOrCreate({
    where: {
      id: 1,
      url: "https://www.w3schools.com/sql/sql_syntax.asp",
      competenceId: 1,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });

  Resource.findOrCreate({
    where: {
      id: 2,
      url: "https://www.w3schools.com/nodejs/",
      competenceId: 7,
    },
  }).catch((err) => {
    console.log(err.message + " | " + err.name);
  });
}
