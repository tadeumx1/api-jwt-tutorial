const jwt = require('jsonwebtoken')
const usersData = require('../users.json')
const authConfig = require('../../config/auth');

// Session Controller

class SessionController {

    async store (req, res) {

        const userSend = usersData.users.find(user => {

            if(user.email == req.body.email && user.password == req.body.password) {
                return user
            }
        })

        if(!userSend) {
            return res.status(400).json({ error: 'User not found' })
        }

        const token = jwt.sign({ userSend }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });

        const id = userSend.id
        const email = userSend.email

        const user = {
            id,
            email
        }

        return res.json({ user, token })
        
    }
}

module.exports = new SessionController()