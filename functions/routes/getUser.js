const getUser = async (req, res) => {
    let uid = req.body;
    console.log(uid)

    await admin.firestore()
    .collection("users")
    .doc(uid).get()
    .then(doc => {
      let profile = doc.data()
      res.send(profile)
    })
}

export default getUser