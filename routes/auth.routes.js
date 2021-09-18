const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post(
    '/register',
    [
        //validation
        check('name', 'Provide name').isString(),
        check('lastName', 'Provide last name').isString(),
        check('dateOfBirth', 'Provide correct birth date').isString(),
        check('password', 'Provide password').isString().isLength({min: 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400)
                .json({
                    errors: errors.array(), 
                    message: 'Incorrect data until registration'
                })
        }

        //get data from req object
        const {name, lastName, dateOfBirth, password} = req.body

        //check, that name, lastName and dateOfBirth is unique
        const candidate = await User.findOne({name, lastName, dateOfBirth})
        if(candidate){
            return res.status(400).json({message: 'User already registered'})
        }

        //hash user password
        const hashedPassword = await bcrypt.hash(password, 12)

        //create and save newUser
        const user = new User({name, lastName, dateOfBirth, password: hashedPassword})
        await user.save()
        
        //res to frontend
        res.status(201).json({message: 'User has been created'})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('name', 'Provide name').isString(),
        check('lastName', 'Provide last name').isString(),
        check('dateOfBirth', 'Provide correct birth date').isString(),
        check('password', 'Provide password').isString().isLength({min: 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400)
                .json({
                    errors: errors.array(), 
                    message: 'Incorrect data until login'
                })
        }  

        const {name, lastName, dateOfBirth, password} = req.body

        //check that the user provide correct mail
        const user = await User.findOne({name, lastName, dateOfBirth})

        if(!user){
            return res.status(400).json({message: 'There is no registered user with provided name, last name and date of birth. Do you want to registrate?'})
        }

        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Provided wrong password'})
        }

        //create jwt token
        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

module.exports = router