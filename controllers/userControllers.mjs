import users from '../data/users.mjs';
import error from '../utilities/error.mjs';

function createUser(req, res) {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
      next(error(409, 'Username Already Taken'));
    }

    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(user);
    res.json(users[users.length - 1]);
  } else next(error(400, 'Insufficient Data'));
}

function getAllUsers(req, res) {
  const links = [
    {
      href: 'users/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  res.json({ users, links });
}

function getOneUser(req, res, next) {
  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  const user = users.find((u) => u.id == req.params.id);

  if (user) res.json({ user, links });
  else next();
}

function editUser(req, res, next) {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.

  const user = users.find((u, i) => {
    //find user, by paramID

    if (u.id == req.params.id) {
      //If paramID matches user ID
      for (const key in req.body) {
        //loop through user info
        users[i][key] = req.body[key]; //replace previous data with new data
      }
      return true;
    }
  });

  //is user found and updated, return new user
  if (user) res.json(user);
  else next();
}

function deleteUser(req, res, next) {
  // The DELETE request route simply removes a resource.
  const user = users.find((u, i) => {
    //find user by paramID
    if (u.id == req.params.id) {
      //if user id and paramID match
      users.splice(i, 1); //delete user from DB
      return true;
    }
  });

  if (user) res.json(user);
  else next();
}

export default { createUser, getAllUsers, getOneUser, editUser, deleteUser };
