import express from 'express';

import UserRegister from '../Controller/UserRegister.js';
import UserLogin from '../Controller/UserLogin.js';
import Transaction from '../Controller/Transaction.js';
import authenticateToken from '../Middleware/AuthenticateToken .js';

import GetTransaction from '../Controller/GetTransacion.js';
import DeleteTransaction from '../Controller/DeleteTransaction.js';

const router = express.Router();

router.post("/register", UserRegister);

router.post("/login", UserLogin);

router.post("/transaction", authenticateToken, Transaction);

router.get("/get/transaction", authenticateToken, GetTransaction);

router.delete("/delete/transaction/:id", authenticateToken, DeleteTransaction);

export default router;