const admin = require('firebase-admin')
const creds = require('../credentials.json')

function connectDb() {
    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(creds)
        })
    }
    return admin.firestore()
}

exports.userSignup = (req, res) => {
    if(!req.body || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Invalid Request: missing email or password',
            status: 400,
            success: false
        })
        return
    }

const db = connectDb()

db.collection('users')
.doc(req.body.email.toLowerCase())
.set(req.body)
.then((res) => {
    res.send({
        message: 'connection successful',
        status: 200,
        success: true
    })
})
.catch(err => {
    res.status(500).send({
        message: 'Error:' + err.message,
        status: 500,
        success: false
    })
})

}


exports.userLogin = (req, res) => {
    res.status(200).send("logged in")
}