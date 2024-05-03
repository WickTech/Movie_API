# Movie API Backend

This backend API project allows you to manage movies using Node.js, Express.js, and MongoDB.

## Installation

### 1. Clone the Repository

Clone this repository to your local machine:

### 2. Install Dependencies

Navigate to the project directory and install the dependencies:

```bash
npm install
```

### 3. Add MongoDB URI

Create a `.env` file in the root directory of the project and add your MongoDB URI:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB Atlas credentials.

## Usage

Start the server with the following command:

```bash
node app.js
```

The server will run on port 3000 by default.

You can use the following endpoints to interact with the API:

- `POST /add-movie`: Add a new movie to the database.
- `GET /get-all`: Get all movies stored in the database.
- `GET /get-single?id=<movieId>`: Get a single movie by its ID.
- `GET /get-paginated?page=<page>&size=<size>`: Get movies using pagination.
- `POST /add-movies`: Add multiple movies to the database in a single request.

Replace `<movieId>`, `<page>`, and `<size>` with the actual values when making requests.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
