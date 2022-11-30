const { GraphQLClient, gql } = require('graphql-request')
const { signLimitOrder } = require('@sorare/crypto')
const crypto = require('crypto')

const CurrentUser = gql`
  query CurentUserQuery {
    currentUser {
      starkKey
    }
  }
`

const NewOfferLimitOrders = gql`
  mutation NewOfferLimitOrders($input: prepareOfferInput!) {
    prepareOffer(input: $input) {
      limitOrders {
        amountBuy
        amountSell
        expirationTimestamp
        nonce
        tokenBuy
        tokenSell
        vaultIdBuy
        vaultIdSell
      }
      errors {
        message
      }
    }
  }
`

const CreateSingleSaleOffer = gql`
  mutation CreateSingleSaleOffer($input: createSingleSaleOfferInput!) {
    createSingleSaleOffer(input: $input) {
      offer {
        id
      }
      errors {
        message
      }
    }
  }
`

async function CreateOffer (sendAssetId, sendWei, receiveAssetIds, receiveWei, receiverSlug, token, privateKey, apiKey) {
  const graphQLClient = new GraphQLClient('https://api.sorare.com/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
      'JWT-AUD': 'MeowAUD',
      APIKEY: apiKey
    }
  })

  const currentUserData = await graphQLClient.request(CurrentUser)
  const starkKey = currentUserData.currentUser.starkKey

  const prepareOfferInput = {
    type: 'SINGLE_SALE_OFFER',
    sendAssetIds: [sendAssetId],
    receiveAssetIds: receiveAssetIds?.split(',') || [],
    sendWeiAmount: sendWei,
    receiveWeiAmount: receiveWei,
    receiverSlug,
    clientMutationId: crypto.randomBytes(8).join('')
  }

  const newOfferData = await graphQLClient.request(NewOfferLimitOrders, {
    input: prepareOfferInput
  })

  const prepareOffer = newOfferData.prepareOffer
  if (prepareOffer.errors.length > 0) {
    prepareOffer.errors.forEach((error) => {
      console.error(error.message)
    })
    process.exit(2)
  }

  const limitOrders = prepareOffer.limitOrders
  if (!limitOrders) {
    console.error('You need to be authenticated to get LimitOrders.')
    process.exit(1)
  }

  const starkSignatures = limitOrders.map((limitOrder) => ({
    data: JSON.stringify(signLimitOrder(privateKey, limitOrder)),
    nonce: limitOrder.nonce,
    expirationTimestamp: limitOrder.expirationTimestamp,
    starkKey
  }))

  const createSingleSaleOfferInput = {
    starkSignatures,
    dealId: crypto.randomBytes(8).join(''),
    assetId: sendAssetId,
    price: receiveWei,
    clientMutationId: crypto.randomBytes(8).join('')
  }
  const createSingleSaleOfferData = await graphQLClient.request(
    CreateSingleSaleOffer,
    { input: createSingleSaleOfferInput }
  )
  const createSingleSaleOffer =
    createSingleSaleOfferData.createSingleSaleOffer

  if (createSingleSaleOffer.errors.length > 0) {
    createSingleSaleOffer.errors.forEach((error) => {
      console.error(error.message)
    })
    process.exit(2)
  }
}

module.exports = { CreateOffer }
