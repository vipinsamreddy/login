// server.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { IUser } from './model/IUser';
import { StatusCodes } from 'http-status-codes';
import { validatePassword } from './login/passwordHelper';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/login', async (req: Request, res: Response) => {
  
  const user:IUser = req.body as IUser;
  const isValidPassword: boolean = validatePassword(user.password);

  if (isValidPassword)
    res.status(StatusCodes.OK).json({ message: 'Login successful', statusCode: StatusCodes.OK });
  else
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid password', statusCode: StatusCodes.BAD_REQUEST });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});