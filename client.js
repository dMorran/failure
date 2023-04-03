import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const packageDefinition = loadSync("./library.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const library = loadPackageDefinition(packageDefinition).library;

import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const addBook = () => {
  readline.question("Enter book ID: ", (id) => {
    readline.question("Enter book name: ", (name) => {
      readline.question("Enter book author: ", (author) => {
        const book = {
          id: id,
          name: name,
          author: author,
        };
        client.AddBook({ book: book }, (err, response) => {
          console.log("Book added successfully: ", response);
          readline.close();
        });
      });
    });
  });
};

const getBook = () => {
  readline.question("Enter book ID: ", (id) => {
    client.GetBook({ id: id }, (err, response) => {
      console.log("Book retrieved successfully: ", response);
      readline.close();
    });
  });
};

const updateBook = () => {
  readline.question("Enter book ID: ", (id) => {
    readline.question("Enter updated book name: ", (name) => {
      readline.question("Enter updated book author: ", (author) => {
        const book = {
          id: id,
          name: name,
          author: author,
        };
        client.UpdateBook({ book: book }, (err, response) => {
          console.log("Book updated successfully: ", response);
          readline.close();
        });
      });
    });
  });
};

const deleteBook = () => {
  readline.question("Enter book ID: ", (id) => {
    client.DeleteBook({ id: id }, (err, response) => {
      console.log("Book deleted successfully: ", response);
      readline.close();
    });
  });
};

const main = () => {
  readline.question(
    "Select operation: add, get, update, delete: ",
    (operation) => {
      switch (operation) {
        case "add":
          addBook();
          break;
        case "get":
          getBook();
          break;
        case "update":
          updateBook();
          break;
        case "delete":
          deleteBook();
          break;
        default:
          console.log("Invalid operation");
          readline.close();
          break;
      }
    }
  );
};

const client = new library.LibraryService(
  "localhost:50051",
  credentials.createInsecure()
);

main();
