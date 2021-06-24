const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();
/* GET users listing. */
router.get('/:username', async function (req, res, next) {
  const { username } = req.params;
  if (!username) {
    return res.json({ status: false, error: 'Username required' })
  }
  try {
    const user = await prisma.user.findFirst({
      where: { username }
    })
    console.log(user);
    res.json({ status: true, user });
  } catch (err) {
    console.error(err);
    console.error(err.stack);
    res.json({ status: false, error: 'Error getting user detail' })
  }
});


router.get('/', async function (req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users })
  } catch (err) {
    res.json({ success: false, })
  }
});



router.post('/', async function (req, res, next) {
  console.log(req.body);
  try {
    const newUser = await prisma.user.create({
      data: req.body,
    });
    return res.json({ status: true, user: newUser });
  } catch (err) {
    res.json({ success: false, error: 'Error creating user' })
  }
})
router.put('/', async function (req, res, next) {
  try {
    const user = await prisma.user.findFirst({
      where: { username }
    })
    if (!user) {
      res.json({ success: false, error: "No user with username" })
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return res.json({ success: true, user });

  } catch (err) {
    res.json({ success: false, error: "Error updting user" })
  }
})
module.exports = router;
