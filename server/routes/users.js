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
  const { username, firstName, lastName } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName
      },
    });
    return res.json({ status: true, user: newUser });
  } catch (err) {
    console.error(err);
    console.error(err.stack);
    res.json({ success: false, error: 'Error creating user' })
  }
})
router.put('/', async function (req, res, next) {
  console.log("reach here")
  const { username, firstName, lastName } = req.body;

  try {
    const user = await prisma.user.update({
      where: { username },
      data: {
        firstName,
        lastName
      }
    })

    return res.json({ success: true, user });

  } catch (err) {
    console.error(err);
    console.error(err.stack);
    res.json({ success: false, error: "Error updting user" })
  }
});

router.delete('/:username', async function (req, res, next) {
  const { username } = req.params;
  try {
    await prisma.user.delete({
      where: {
        username
      }
    });
    return res.json({ success: true, message: "Successfully deleted user" })
  } catch (err) {
    console.error(err);
    console.error(err.stack);
    res.json({ success: false, error: "Error deleting user" })
  }
})
module.exports = router;
