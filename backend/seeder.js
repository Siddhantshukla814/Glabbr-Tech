import connectDB from "./config/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Contacts from "./models/contactModel.js";
import { contacts } from "./data/contacts.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Contacts.deleteMany();

    await Contacts.insertMany(contacts);

    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.error("Error: " + err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Contacts.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (err) {
    console.error("Error: " + err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
