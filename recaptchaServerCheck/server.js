const express = require("express")
const app = express()
const fetch = require("node-fetch")


app.post("/checkResponse/:captcharesponse", async (req, res) => {
    //Verify the captcha first
    const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LevUmUUAAAAAJDqRn5kSkp7ye4App0xjhmSiI7S&response=${req.params.captcharesponse}`, {
        method: "POST"
    })
    .then(_res => _res.json())

    //Will only post the comment to the "database" if the captcha verification was a success
    if(captchaVerified.success === true) comments.push(req.params.comment)

    res.end()
})

app.listen(8080, function(){console.log("Ready")})