import {
  Server,
  loadPackageDefinition,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

// Import Firebase Admin libraries
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase app with service account config
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
};
admin.initializeApp(firebaseConfig);

// Initialize Firestore
const db = admin.firestore();

const server = new Server();

const packageDefinition = loadSync("./library.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const library = loadPackageDefinition(packageDefinition).library;

const addBook = async (call, callback) => {
  const book = call.request.book;
  const bookRef = db.collection("books").doc(book.id);
  try {
    await bookRef.set(book);
    const docSnapshot = await bookRef.get();
    const data = docSnapshot.data();
    const response = {
      id: data.id,
      title: data.title,
      author: data.author,
    };
    callback(null, response);
  } catch (error) {
    console.log("Error adding book: ", error);
    callback(error);
  }
};

const getBook = async (call, callback) => {
  const id = call.request.id;
  const bookRef = db.collection("books").doc(id);
  try {
    const docSnapshot = await bookRef.get();
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      const response = {
        id: data.id,
        title: data.title,
        author: data.author,
      };
      callback(null, response);
    } else {
      const error = new Error(`Book with id ${id} not found`);
      callback(error);
    }
  } catch (error) {
    console.log("Error getting book: ", error);
    callback(error);
  }
};

const updateBook = async (call, callback) => {
  const book = call.request.book;
  const bookRef = db.collection("books").doc(book.id);
  try {
    await bookRef.update(book);
    const response = {
      id: book.id,
      title: book.title,
      author: book.author,
    };
    callback(null, response);
  } catch (error) {
    console.log("Error updating book: ", error);
    callback(error);
  }
};

const deleteBook = async (call, callback) => {
  const id = call.request.id;
  const bookRef = db.collection("books").doc(id);
  try {
    const docSnapshot = await bookRef.get();
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      await bookRef.delete();
      const response = {
        id: data.id,
        title: data.title,
        author: data.author,
      };
      callback(null, response);
    }
  } catch (error) {
    console.log("Error deleting book: ", error);
    callback(error);
  }
};

server.addService(library.LibraryService.service, {
  addBook: addBook,
  getBook: getBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
});

server.bindAsync("localhost:50051", ServerCredentials.createInsecure(), () => {
  console.log("Server running at http://localhost:50051");
  server.start();
});
