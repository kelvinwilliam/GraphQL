const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const server = 'http://localhost:3000'

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        director: { type: GraphQLString },
        year: { type: GraphQLInt },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movies: {
            type: new GraphQLList(MovieType),
            resolve(_parentValue_, _args_) {
                return axios.get(`${server}/movies/`)
                    .then(res => res.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                director: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args) {
                return axios.post(`${server}/movies`, {
                    title: args.title,
                    director : args.director,
                    movie: args.movie,
                    year: args.year,
                }).then(res => res.data)
            },
        },
        findMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.get(`${server}/movies/${args.id}`)
                    .then(res => res.data)
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                title: { type: GraphQLString },
                director: { type: GraphQLString },
                year: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.put(`${server}/movies/${args.id}`, args)
                    .then(res => res.data)
            },
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args) {
                return axios.delete(`${server}/movies/${args.id}`, args )
                    .then(res => res.data)
            },
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})