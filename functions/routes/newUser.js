const newUser = (req, res) => {
  let obj = JSON.parse(req.body);
  console.log(obj);

  getAuth()
  .createUser(obj.auth)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid)
    obj.profile.id = userRecord.uid
    admin.firestore()
    .collection("users")
    .doc(userRecord.uid)
    .set(obj.profile)
    .then((doc) => {
      res.send(`${doc.id} Written Successfully`)
    })
  })
  .catch((error) => {
    console.log('Error creating new user:', error)
    res.send(error)
  });
}

export default newUser