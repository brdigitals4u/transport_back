import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from '@prisma/client'
import { ErrorMiddleware } from "./middlewares/error";

const cors = require('cors');

const app: Express = express();

// Define your CORS options
let corsOptions = { 
  origin: ['http://localhost:3000', 'http://anotherdomain.com', 'https://transport-front-git-dev-brdigitals4us-projects.vercel.app', 'https://transport-front-chi.vercel.app', 'http://52.53.157.148:3000'], // Replace with your allowed origins
  methods: "POST,GET,PUT,DELETE",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers if needed
};

// Use the CORS middleware with your options
app.use(cors(corsOptions));

//middleware
app.use(express.json())

//api first route
app.use('/api', rootRouter);


export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(ErrorMiddleware)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});