import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface User {
  email: string;
  number: string;
}

const users: User[] = [
  { email: "jim@gmail.com", number: "221122" },
  { email: "jam@gmail.com", number: "830347" },
  { email: "john@gmail.com", number: "221122" },
  { email: "jams@gmail.com", number: "349425" },
  { email: "jams@gmail.com", number: "141424" },
  { email: "jill@gmail.com", number: "822287" },
  { email: "jill@gmail.com", number: "822286" },
];

let pendingRequest: NodeJS.Timeout | null = null;

app.post("/search", (req: Request, res: Response) => {
  const { email, number }: { email: string; number?: string } = req.body;

  if (pendingRequest) {
    clearTimeout(pendingRequest);
  }

  pendingRequest = setTimeout(() => {
    const result = users.filter((user) => {
      return user.email === email && (!number || user.number === number);
    });

    res.json(result);
    pendingRequest = null;
  }, 5000);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
