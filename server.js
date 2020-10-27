const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP;

const app = express();
const schema = require('./schema.js')

app.listen(4000, () => {
    console.log('Server is running on port 4000...')
})

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}))
