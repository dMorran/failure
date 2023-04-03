import {
  Server,
  loadPackageDefinition,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

// Import Firebase libraries
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore/lite";

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyDV3OVZ_JzdxSrG6rfjzaFufO6dEeoCjUY",
  authDomain: "grpcproto-f09a8.firebaseapp.com",
  projectId: "grpcproto-f09a8",
  storageBucket: "grpcproto-f09a8.appspot.com",
  messagingSenderId: "789447821286",
  appId: "1:789447821286:web:98176a763a4b7ec9a27827",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  const bookRef = doc(collection(db, "books"), book.id);
  try {
    await setDoc(bookRef, book);
    const docSnapshot = await getDoc(bookRef);
    const data = docSnapshot.data();
    const response = {
      id: data.id,
      name: data.name,
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
  const bookRef = doc(collection(db, "books"), id);
  try {
    const docSnapshot = await getDoc(bookRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const response = {
        id: data.id,
        name: data.name,
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
  const bookRef = doc(collection(db, "books"), book.id);
  try {
    await updateDoc(bookRef, book);
    const response = {
      id: book.id,
      name: book.name,
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
  const bookRef = doc(collection(db, "books"), id);
  try {
    await deleteDoc(bookRef);
    const response = {
      id: id,
      message: `Book with id ${id} deleted successfully`,
    };
    callback(null, response);
  } catch (error) {
    console.log("Error deleting book: ", error);
    callback(error);
  }
};

server.addService(library.LibraryService.service, {
  AddBook: addBook,
  GetBook: getBook,
  UpdateBook: updateBook,
  DeleteBook: deleteBook,
});

server.bindAsync("localhost:50051", ServerCredentials.createInsecure(), () => {
  console.log("Server running at http://localhost:50051");
  server.start();
});
