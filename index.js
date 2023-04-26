require("./utils.js");
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const Joi = require("joi");
const saltRounds = 12;

const port = process.env.PORT || 3020;

const app = express();
const images = ["image1.webp", "image2.gif", "image3.webp"];

const expireTime = 1000 * 60 * 60; // 1 hour

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const node_session_secret = process.env.NODE_SESSION_SECRET;

var {database} = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

var mongoStore = MongoStore.create({
	mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
	crypto: {
		secret: mongodb_session_secret
	}
});

app.use(session({
    secret: node_session_secret,
	store: mongoStore, 
	saveUninitialized: false, 
	resave: true
}));

app.get('/', (req, res) => {
    var html = `
        <h1>Welcome!<h1>
        <a href='/login'>Log In<a><br>
        <a href='/createUser'>Sign Up<a>
    `;
    res.send(html);
});

app.get('/login', (req, res) => {
    var html = `
    <form action='/loggingin' method='post'>
        <div class="container">
            <h2 class="main-text">
                Log In
            </h2>
            <input name="username" type="text" placeholder="username" required="required"><br>
            <input name="password" type="password" placeholder="password" required="required"><br>
            <button class="button" id="signIn">
            LOG IN
            </button>
        </div>
    <form>
    `;
    res.send(html);
});

app.get('/createUser', (req, res) => {
    var html = `
    <form action='/submitUser' method='post'>
            <h2 class="main-text">
                Sign Up
            </h2>
            <input name="username" type="text" placeholder="username" required="required"><br>
            <input name="email" id="email" type="email" placeholder="Email" required="required"><br>
            <input name="password" id="password" type="password" placeholder="password" required="required"><br>
            <button class="button" id="signIn">
                Sign Up
            </button>
    <form>
    `;
    res.send(html);
});

app.post('/submitUser', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const schema = Joi.object(
		{
			username: Joi.string().alphanum().max(20).required(),
			password: Joi.string().max(20).required()
		});
	
	const validationResult = schema.validate({username, password});

    if (validationResult.error != null) {
        console.log("Invalid Email or Password!");
        res.redirect('/createUser');
        return;
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);

    await userCollection.insertOne({
        username: username,
        password: hashedPassword
    })
    res.redirect('/member');
});

app.post('/loggingin', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

	const schema = Joi.string().max(20).required();
	const validationResult = schema.validate(username);
	if (validationResult.error != null) {
	   console.log(validationResult.error);
	   res.redirect("/login");
	   return;
	}

    const result = await userCollection.find({username: username}).project({username: 1, password: 1, _id: 1}).toArray();

	console.log(result);
	if (result.length != 1) {
		console.log("user not found");
		res.redirect("/login");
		return;
	}
	if (await bcrypt.compare(password, result[0].password)) {
		req.session.authenticated = true;
		req.session.username = username;
		req.session.cookie.maxAge = expireTime;
        
		res.redirect('/member');
		return;
	}
	else {
		res.redirect("/login");
		return;
	}
});

app.get('/member', (req, res) => {
    if (req.session.username == null) {
        res.redirect('/login');
        return;
    }
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imagePath = randomImage;
    const html = `
    <form action='/' method='post'>
    <h1>Welcome, ${req.session.username}!<h1>
    <img src=${imagePath}>
    <a href='/logout'>Log Out<a>
    <form>
    `;
    res.send(html);
});

app.get('/logout', (req,res) => {
	req.session.destroy();
    res.redirect('/');
});

app.get("*", (req,res) => {
	res.status(404);
	res.send("Page not found - 404");
})

app.listen(port, () => {
    console.log("succeed!");
});