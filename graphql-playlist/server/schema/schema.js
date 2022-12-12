const graphql = require("graphql");
const _ = require("lodash");

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;


const books = [
    {name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'SciFi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '1'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]

const authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Pratchet', age: 66, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',              //This name is reserved and it should be used as is
    fields:{
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //Code to get data from DB/other source goes here
                return _.find(books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                //Data fetching here

                return _.find(authors, {id: args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const name = args.name;
                const age =  args.age;
                authors.push({name, age, id: authors.length});
                return authors[authors.length - 1];
            }
        },
        addBooks:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                const name = args.name;
                const genre = args.genre;
                const authorId = args.authorId;
                books.push({name, genre, id: books.length, authorId});
                return books[books.length - 1];
            }
        }
    }
})
//This is how you query in graphql

// book(id: "2"){
//     name
//     genre
// }
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})