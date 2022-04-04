app.post('/updateUser', (req, res) => {
    let obj = JSON.parse(req.body);
  
    getAuth()
    .setCustomUserClaims(obj.uid, {[obj.role]: true, role: obj.role})
    .then(() => {
      res.status(200).json({status:"User claim updated successfully", user: obj.uid})
    })
    .catch(err => {
      res.status(err.status).send(err)
    })
  })
  
  app.post('/newUser', (req, res) => {
    // cors(req,res,() => {
      let obj = req.body;
      console.log(JSON.parse(obj));
      getAuth()
      .createUser(JSON.parse(obj))
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        res.json(userRecord);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
      });
    // })
  })
  
  //get user record by firebase uid
  app.post('/getUser', (req, res) => {
          let uid = req.body;
          console.log(uid)
          getAuth()
          .getUser(uid)
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(userRecord);
            res.status(200).json(userRecord)
          })
          .catch((error) => {
            res.send(error);
          }); 
  });