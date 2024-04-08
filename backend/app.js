import express from "express";
import sqlite3 from "sqlite3";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const sqlite = sqlite3.verbose();

app.use(express.json());
app.use(express.static("../dist"));

const db = new sqlite.Database("./db/users.sqlite", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Активна база данных users.sqlite");
});

db.run(
  "CREATE TABLE if not exists users (id integer primary key autoincrement, name string unique, password string)"
);
// db.run("INSERT INTO users (name, age) VALUES ('Max', 26), ('Alex', 27), ('Ivan', 29)");

const selectUser = (id) => {
  return new Promise((resolve, reject) => {
    db.get("select id, name, age from users where id=?", [id], (err, row) => {
      if (err) reject(err);
      if (!row) reject("User not found");
      resolve(row);
    });
  });
};

app.get("/api/users", async function (_, res) {
  let result = [];

  const requestUsers = new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });

  try {
    const data = await requestUsers;
    result = data;
  } catch (error) {
    console.error(error);
  }

  res.send(result);
});

// получение одного пользователя по id
app.get("/api/users/:id", async function (req, res) {
  const id = req.params.id; // получаем id

  // находим пользователя по id
  const requestUser = selectUser(id);

  // отправляем пользователя
  try {
    const user = await requestUser;
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// получение отправленных данных
app.post("/api/users", async function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { name: userName, password: userPassword } = req.body;

  // добавляем пользователя в массив
  const insertUser = new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, password) VALUES (?, ?)",
      [userName, userPassword],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });

  try {
    const userId = await insertUser;
    const user = { id: userId, name: userName };

    res.send(user);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      res.status(400).send({
        errors: {
          username: "Пользователь уже существует",
        },
      });
    } else {
      res.sendStatus(500);
    }
  }
});

// удаление пользователя по id
app.delete("/api/users/:id", async function (req, res) {
  const id = req.params.id;

  let user;
  const requestUser = selectUser(id);

  try {
    user = await requestUser;
  } catch (error) {
    res.status(404).send(error);
  }

  const deletedUser = new Promise((resolve, reject) => {
    db.run("delete from users where id=(?)", id, function (err) {
      if (err) reject(err);
      resolve(id);
    });
  });

  try {
    await deletedUser;

    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// изменение пользователя
app.put("/api/users", async function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;

  const updatedUser = new Promise((resolve, reject) => {
    db.run(
      "update users set name=(?), age=(?) where id=(?)",
      [userName, userAge, id],
      function (err) {
        if (err) reject(err);
        resolve(id);
      }
    );
  });

  try {
    const userId = await updatedUser;
    const user = { id: userId, name: userName, age: userAge };

    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(3001, function () {
  console.log("Сервер ожидает подключения...");
});
