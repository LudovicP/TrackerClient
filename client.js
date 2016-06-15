var sha1 = require('sha1');
var Client = require('node-rest-client').Client;

const server = "http://localhost:25686/api/location";

var client = new Client();

var args = {
    data: {
    "objectId" : "1",
    "date" : "2016-03-18 16:00:00",
    "longitude" : -0.75,
    "latitude" : 70
},
    headers: {  "Content-Type": "application/json",
                "Authorization" : sha1("D8QFqpjzjDBxXRyTBGHKnvVZjFvRLX8BL48KjkhzrCQugKwKUjXffwQXhHBnWMVJhfquwPzWvrabKwyJMvHCgEHQRT2ULbWF3NwAMgFEcScPJ52hn8WWXrzxZpWacZGcHKrRFzDphZZ9EaTbr8bEmHvaJX9ybftCSZrgd6JggLGwE4UjS6Xjd8eunWmXV4rywYauwAK5NJsDmQBLzfCnBVnheFGALLzvWEgHz53XxFHHzKLEAaBux4pFuPv2Pufu2016-03-18 16:00:00")}
};

client.registerMethod("postMethod", server, "POST");


client.methods.postMethod(args, function (data, response) {
    console.log(response);
});

