const express = require('express');
const User = require('../models/User');
const Order = require('../models/Orders');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fetch = require('../middleware/fetchdetails', {mode: 'no-cors'});
const jwtSecret = 'HaHa';
//
// var foodItems= require('../index').foodData;
// require("../index")
//Creating a user and storing data to MongoDB Atlas, No Login Requiered
router.post(
	'/createuser',
	[
		body('email').isEmail(),
		body('password').isLength({ min: 5 }),
		body('name').isLength({ min: 3 }),
	],
	async (req, res) => {
		let success = false;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}
		// console.log(req.body)
		// let user = await User.findOne({email:req.body.email})
		const salt = await bcrypt.genSalt(10);
		let securePass = await bcrypt.hash(req.body.password, salt);
		try {
			await User.create({
				name: req.body.name,
				// password: req.body.password,  first write this and then use bcryptjs
				password: securePass,
				email: req.body.email,
				location: req.body.location,
			})
				.then((user) => {
					const data = {
						user: {
							id: user.id,
						},
					};
					const authToken = jwt.sign(data, jwtSecret);
					success = true;
					res.json({ success, authToken });
				})
				.catch((err) => {
					console.log(err);
					res.json({ error: 'Please enter a unique value.' });
				});
		} catch (error) {
			console.error(error.message);
		}
	}
);

// Authentication a User, No login Requiered
router.post(
	'/login',
	[
		body('email', 'Enter a Valid Email').isEmail(),
		body('password', 'Password cannot be blank').exists(),
	],
	async (req, res) => {
		let success = false;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email }); //{email:email} === {email}
			if (!user) {
				return res
					.status(400)
					.json({ success, error: 'Try Logging in with correct credentials' });
			}

			const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
			if (!pwdCompare) {
				return res
					.status(400)
					.json({ success, error: 'Try Logging in with correct credentials' });
			}
			const data = {
				user: {
					id: user.id,
				},
			};
			success = true;
			const authToken = jwt.sign(data, jwtSecret);
			res.json({ success, authToken });
		} catch (error) {
			console.error(error.message);
			res.send('Server Error');
		}
	}
);

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select('-password'); // -password will not pick password from db.
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.send('Server Error');
	}
});
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
	try {
		let lat = req.body.latlong.lat;
		let long = req.body.latlong.long;
		console.log(lat, long);
		let location = await axios
			.get(
				'https://api.opencagedata.com/geocode/v1/json?q=' +
					lat +
					'+' +
					long +
					'&key=74c89b3be64946ac96d777d08b878d43'
			)
			.then(async (res) => {
				// console.log(`statusCode: ${res.status}`)
				console.log(res.data.results);
				// let response = stringify(res)
				// response = await JSON.parse(response)
				let response = res.data.results[0].components;
				console.log(response);
				let { village, country, state_district, state, postcode } = response;
				return String(state + ', ' + country);
			})
			.catch((error) => {
				console.error(error);
			});
		res.send({ location });
	} catch (error) {
		console.error(error.message);
		res.send('Server Error');
	}
});
router.post('/foodData', async (req, res) => {
	// console.log([global.foodData, global.foodCategory]);
    try {
        res.send([global.foodData, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send('Server Error');
    }
});

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data || []; // Default to empty array if undefined

        // Ensure data is an array before splicing
        if (!Array.isArray(data)) {
            return res.status(400).json({ error: 'Invalid order data format' });
        }

        data.splice(0, 0, { Order_date: req.body.order_date }); // Add order date to the beginning
        console.log('Order data:', data);
        console.log('Email:', req.body.email);

        // Check if email exists in the database
        let eId = await Order.findOne({ email: req.body.email });

        if (eId === null) {
            // If email doesn't exist, create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            res.json({ success: true });
        } else {
            // If email exists, update the order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.post('/myOrderData', async (req, res) => {
    try {
        let eId = await Order.findOne({ email: req.body.email });
        if (eId) {
            res.json({ orderData: eId });
        } else {
            res.status(404).json({ error: 'No orders found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;
