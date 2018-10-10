const me = require("./customModules/objects/objectTypeOperation.js");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var clientConnection;
var database;
var package = require("./package.json");

const url = "mongodb://localhost:27017";
const dbName = "appDB";
const collectionName = "AppCollection";
openConnection = () => {
  MongoClient.connect(
    url,
    (err, client) => {
      clientConnection = client;
      assert.equal(null, err);
      console.log("Connected successfully to server");
    }
  );
};

insert = object => {
  openConnection();
  database = clientConnection.db(dbName);
  database.collection(collectionName).insertOne(object, (err, res) => {
    if (err) throw err;
    console.log("1 document inserted");
    return res;
  });
  closeConnection();
};

closeConnection = () => {
  clientConnection.close();
};

const student = {
  _id: "7",
  first_name: "Vinoth Kumar",
  sur_name: "Venkatachalapathy",
  age: 27,
  address: "Samayapuram",
  phone_number: "7871985524"
};

console.log(insert(student));
