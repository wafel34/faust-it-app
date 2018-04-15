const express = require('express');
const router = express.Router();

function apiRouter(database) {
    const users = database.collection('users');
    const groups = database.collection('groups');

    //GET  USERS request - get all users
    router.get('/users', (req, res) => {
        users.find().toArray((err, result) => {
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });


    //GET 1 USER
    router.get('/users/:user', (req, res) => {
        const user = req.params.user;
        users.find({name: user}).toArray((err, result) => {
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });

    // ADD NEW user
    router.post('/users', (req, res) => {
        const newUser = req.body;
        //check if record with the user name exists
        users.findOne({name: newUser.name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord) {
                //if the user already exist: return with 403 status
                return res.status(403).send({error: "User already exists."});
            } else {
                //if user doesn't exist - go ahead and insert new one
                users.insertOne({
                    name: newUser.name,
                    password: newUser.password,
                    firstname: newUser.firstname,
                    surname: newUser.surname,
                    birthDate: newUser.birthDate,
                    userGroups: newUser.userGroups
                }, (err, result) => {
                    if (err) {
                        res.status(500).send({error: "Database error."});
                    }
                    const finalReuslt = result.ops[0];
                    return res.json(finalReuslt).status(201);
                });
            }
        });
    });

    //UPDATE USER
    router.put('/users/:user', (req, res) => {
        const user = req.body;
        users.findOneAndUpdate({name: user.name},
        {
            $set: {
                name: user.name,
                password: user.password,
                firstname: user.firstname,
                surname: user.surname,
                birthDate: user.birthDate,
                userGroups: user.userGroups
            }
        },
        {
            returnOriginal: false
        }, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord.lastErrorObject.updatedExisting) {
              // when query was found, username has been added to favorites and i'm sending back updated data.
              return res.status(200).json({
                  message: 'Updated the user to favorites',
                  result: dbRecord
              });
          }
        })
    });

    //DELETE USER
    router.delete('/users/:user', (req, res) => {
        const name = req.params.user;
        users.deleteOne({name: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            return res.json(dbRecord).status(200);
        });
    });

    //GET GROUPS
    router.get('/groups', (req, res) => {
        groups.find().toArray((err, result) => {
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });


    //GET 1 GROUP
    router.get('/groups/:group', (req, res) => {
        const group = req.params.group;
        groups.find({name: group}).toArray((err, result) => {
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });

    // CEREATE NEW GROUP
    router.post('/groups', (req, res) => {
        const newGroup = req.body;
        //check if record with the user name exists
        users.findOne({name: newGroup.name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord) {
                //if the user already exist: return with 403 status
                return res.status(403).send({error: "Group already exists."});
            } else {
                //if user doesn't exist - go ahead and insert new one
                groups.insertOne({
                    name: newGroup.name,
                    users: newGroup.users
                }, (err, result) => {
                    if (err) {
                        res.status(500).send({error: "Database error."});
                    }
                    const finalReuslt = result.ops[0];
                    return res.json(finalReuslt).status(201);
                });
            }
        });
    });

    //UPDATE USER
    router.put('/groups/:group', (req, res) => {
        const group = req.body;
        groups.findOneAndUpdate({name: group.name},
        {
            $set: {
                name: group.name,
                users: group.users
            }
        },
        {
            returnOriginal: false
        }, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord.lastErrorObject.updatedExisting) {
              // when query was found, username has been added to favorites and i'm sending back updated data.
              return res.status(200).json({
                  message: 'Updated the user to favorites',
                  result: dbRecord
              });
          }
        })
    });

    //DELETE USER
    router.delete('/groups/:group', (req, res) => {
        const name = req.params.group;
        groups.deleteOne({name: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            return res.json(dbRecord).status(200);
        });
    });

    return router;
}

module.exports = apiRouter;
