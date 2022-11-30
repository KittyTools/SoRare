const { GraphQLClient, gql } = require('graphql-request')

const cancelOfferMutation = gql`
  mutation cancelOffer($input: cancelOfferInput!) {
    cancelOffer(input: $input) {
      clientMutationId
      errors {
        message
      }
    }
  }
`

async function cancelOffer (jwt, clientMutationId, blockchainId, apiKey) {
  const graphQLClient = new GraphQLClient('https://api.sorare.com/graphql', {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'JWT-AUD': 'MeowAUD',
      APIKEY: apiKey
    }
  })

  const cancelOfferInput = {
    clientMutationId,
    blockchainId
  }

  await graphQLClient.request(cancelOfferMutation, {
    input: cancelOfferInput
  })
}

module.exports = { cancelOffer }
