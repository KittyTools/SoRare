const { GraphQLClient, gql } = require('graphql-request')

const GetListedCardsByUser = gql`
  query GetAllListedCards($slug: String!, $cursor:String) {
    user(slug: $slug) {
      paginatedLiveSingleSaleOffers(sortByEndDate:ASC, after:$cursor)
      {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes{
          tokenOffer{
            id
            blockchainId
          }
          card{
            assetId
            slug
          }
          price
        }
      }
    }
  }
`

async function GetAllListedCards (slug, cursor, apiKey) {
  const graphQLClient = new GraphQLClient('https://api.sorare.com/graphql', {
    headers: {
      APIKEY: apiKey
    }
  })

  const data = await graphQLClient.request(GetListedCardsByUser, {
    slug, cursor
  })

  if (data) {
    return data.user.paginatedLiveSingleSaleOffers
  }

  return null
}

module.exports = { GetAllListedCards }
