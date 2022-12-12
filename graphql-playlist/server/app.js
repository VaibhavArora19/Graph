const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}), (req, res, next) => {
    console.log(req.body);
});

app.listen(8081, console.log("Server is listening at port 8081"));