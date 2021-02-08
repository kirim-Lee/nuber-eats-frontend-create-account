module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagname: 'gql',
    service: {
      name: 'podcast-backend',
      url: 'http://localhost:4000/graphql',
      // url: 'https://nuber-eats-assignment.herokuapp.com/graphql',
    },
  },
};
