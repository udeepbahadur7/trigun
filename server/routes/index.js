const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.json(uuidv4());
});

module.exports = router;
