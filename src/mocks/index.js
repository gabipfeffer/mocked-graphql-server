const { ApolloServer, gql, MockList } = require('apollo-server');
const faker = require('faker');
const { allCats } = require('./cats');

const typeDefs = gql`
type Cat {
    id: ID!
    name: String!
    age: Int!
    nice: Boolean
}

type Horse {
    id: ID!
    name: String!
    age: Int!
    foo: String
    description: String
    pedigree: [Pedigree!]!
}

type Pedigree {
    type: String
    owner: String
}

type Query {
    allCats: [Cat!]!
    allHorses: [Horse!]!
}
`;

const resolvers = {
    Query: {
        allCats,
        allHorses: () => [{
            description: 'foo',
            foo: 'foo'
        }]
    }
}

const mocks = {
    Query: () => ({
        allHorses: () => new MockList(5)
    }),
    Horse: () => ({
        description: 'bar',
        pedigree: () => new MockList(6),
    }),
    Pedigree: () => ({
        owner: 'Torralvo',
        type: 'Belgian'
    }),
    ID: () => faker.datatype.uuid(),
    Int: () => faker.datatype.number({ min: 1, max: 100 }),
    String: () => faker.name.firstName(),
    Boolean: () => faker.datatype.boolean(),
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,
    mockEntireSchema: false,
});

server.listen().then(({ url }) => console.log(`Server is listening on port ${url}`))