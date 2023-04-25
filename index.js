const express = require('express');

const app = express();

const port = process.env.port || 3020;

app.get('/', (req, res) => {
    var html = `
    <form action='/signingup' method='post'>
        <div class='container sub-containter'>
            <button class="button" id="signIn">
                LOG IN
            </button>
            <button class="button" id="signUp">
                SIGN UP
            </button>
        </div>
    <form>
    <style>
    .container {
        font-family: 'specimen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: block;
        margin: 0 auto;
        margin-top: 200px;
        width: 300px;
        display: block;
    }

    .button {
        position: relative;
        background: repeating-radial-gradient(ellipse farthest-corner at top left, #85DAFF 0%, #AC9CFF 100%);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }
    
    .button {
        width: 300px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        margin: 5px;
        height: 55px;
        right: 50px;
        text-align:center;
        border: none;
        background-size: 300% 100%;
        border-radius: 50px;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    
    .button:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
        transition: transform 0.5s ease;
        transform: scale(1.05);
    }
    <style>
    `;
    res.send(html);
});

app.get('/login', (req, res) => {
    var html = `
    <form action='/loggingin' method='post'>
        <div class="container">
            <h2 class="main-text">
                Log in
            </h2>
            <div class="sub-container">
                <div>
                    <input id="email" type="email" placeholder="Email" required="required">
                </div>
                <div>
                    <input id="password" type="password" placeholder="password" required="required">
                </div>
                <div>
                    <button class="button" id="signIn">
                        LOG IN
                    </button>
                </div>
                <a href="signup.html">
                    <div>
                        <button class="button">
                            CREATE NEW ACCOUNT
                        </button>
                    </div>
                </a>
            </div>
        </div>
    <form>
    <style>
    .container {
        font-family: 'specimen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: block;
        margin: 0 auto;
        margin-top: 200px;
        width: 300px;
    }
    
    #icon {
        height: 100px;
        width: auto;
        margin-left: 100px;
    }
    
    .sub-container {
        display: block;
        margin-left: 50px;
    }
    
    input {
        position: relative;
        border-collapse: unset;
        border: none;
        height: 30px;
        width: 300px;
        right: 50px;
    }
    
    input:focus {
        outline: none;
    }
    
    #password {
        margin-bottom: 10px;
    }
    
    #email {
        border-bottom: 1px grey solid;
    }
    
    .main-text {
        position: relative;
        font-size: 29px;
        left: 100px;
        background: #85DAFF;
        background: repeating-radial-gradient(ellipse farthest-corner at center center, #85DAFF 0%, #AC9CFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .button {
        position: relative;
        background: repeating-radial-gradient(ellipse farthest-corner at top left, #85DAFF 0%, #AC9CFF 100%);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }
    
    .button {
        width: 300px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        margin: 5px;
        height: 55px;
        right: 50px;
        text-align:center;
        border: none;
        background-size: 300% 100%;
        border-radius: 50px;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    
    .button:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
        transition: transform 0.5s ease;
        transform: scale(1.05);
    }
    <style>
    `;
    res.send(html);
});

app.listen(port, () => {
    console.log("hello");
});