const express = require('express');
const router = express.Router();
const axios = require('axios');
const { route } = require('./users');
const API_URL = process.env.API_URL;

require('dotenv').config();
const getUserList = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response?.data?.users;
  } catch (err) {
    throw new Error("Error getting response");
  }
}

const getUserDetail = async (username) => {
  if (!username) {
    throw new Error("username required for detail")
  }
  try {
    const response = await axios.get(`${API_URL}/user/${username}`)
    return response?.data?.user;
  } catch (err) {
    throw new Error("Error getting user detail");
  }
}

const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user`, user);
    return response.data;
  } catch (err) {
    throw new Error("Error creating new user");
  }
}

const deleteUserFromDb = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${username}`);
    return response?.data;
  } catch (err) {
    throw new Error("Error deleting user");
  }
}

const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/user`, user);
    return response.data;
  } catch (err) {
    throw new Error("Error updating user")
  }
}

router.get('/edit/:username', async function (req, res, next) {
  const { username } = req.params;
  const user = await getUserDetail(username);
  return res.render('user_edit', { user })

})

router.post('/edit', async function (req, res, next) {
  const { username, firstName, lastName } = req.body;
  const user = await updateUser({ username, firstName, lastName })
  res.redirect('/')
})

router.get('/create', function (req, res, next) {
  res.render('user_create');
});

router.post('/create', async function (req, res, next) {
  console.log(req.body);
  const { username, firstName, lastName } = req.body;
  await createUser({ username, firstName, lastName });
  return res.redirect("/");

})

/* GET home page. */
router.get('/', async function (req, res, next) {
  const users = await getUserList();
  console.log(JSON.stringify(users, null, 2));
  res.render('user_list', { user_list: 'Express', users, title: "User List" });
});

router.get('/:username', async function (req, res, next) {
  console.log(JSON.stringify(req.params))
  const { username } = req.params;
  const user = await getUserDetail(username);
  console.log(user);
  res.render('user_detail', { user, title: "User Detail" });
});

router.delete('/:username', async function (req, res, next) {
  console.log("deleteing user")
  try {
    const { username } = req.params;
    await deleteUserFromDb(username);
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    console.error(err.stack);
    return res.render('error', {message: "Something went wrong"})
  }
})


router.post('/', async function (req, res, next) {
  const { username, firstName, lastName } = req.body;
  res.redirect('/');
})

module.exports = router;
