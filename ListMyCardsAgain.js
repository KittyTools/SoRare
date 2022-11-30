const process = require('process')

const loginHelper = require('./helpers/Login.js')
const listedCardsHelper = require('./helpers/GetListedCardsByUser.js')
const cancelOfferHelper = require('./helpers/CancelOffer.js')
const createOfferHelper = require('./helpers/CreateOffer.js')
const utilsHelper = require('./helpers/Utils.js')

async function main () {
  // Login
  const loginInfo = await loginHelper.Login()

  const jwtToken = loginInfo.jwt.token
  const userSlug = loginInfo.slug
  const apiKey = loginInfo.apiKey

  // Retrieve listed cards
  let cursor = null
  let dataPageListedCards = null
  let moreData = true
  const tempData = []

  console.log('Fetching data, please wait ...\n')

  while (moreData) {
    dataPageListedCards = await listedCardsHelper.GetAllListedCards(userSlug, cursor, apiKey)

    if (dataPageListedCards) {
      if (dataPageListedCards.totalCount > 0) {
        for (let i = 0; i < dataPageListedCards.nodes.length; i++) {
          // Relevant infos to relist the card
          const RelistWeiPrice = dataPageListedCards.nodes[i].price
          const RelistAssetId = dataPageListedCards.nodes[i].card.assetId
          const RelistTokenOfferId = dataPageListedCards.nodes[i].tokenOffer.id
          const RelistTokenOfferBlockchainId = dataPageListedCards.nodes[i].tokenOffer.blockchainId
          const RelistCardSlug = dataPageListedCards.nodes[i].card.slug

          // Saving relevant datas
          tempData.push({
            WeiPrice: RelistWeiPrice,
            AssetId: RelistAssetId,
            TokenOfferId: RelistTokenOfferId,
            TokenOfferBlockchainId: RelistTokenOfferBlockchainId,
            CardSlug: RelistCardSlug
          })
        }

        cursor = dataPageListedCards.pageInfo.endCursor
        moreData = dataPageListedCards.pageInfo.hasNextPage
      } else {
        console.log('You don\'t have any listed cards to relist')
        moreData = false
      }
    } else {
      console.log(`${new Date().toISOString()} [Api connection problem]`)
      moreData = false
    }

    // Rate control
    await utilsHelper.sleep(1000)
  }

  // Proceeding Cancelling offers + Listing again
  if (tempData.length > 0) {
    // Retrieve private key
    const privateKey = await loginHelper.GetPrivateKey()

    for (let i = 0; i < tempData.length; i++) {
      console.log(`${new Date().toISOString()} [${tempData[i].CardSlug}] Listing again... (${utilsHelper.convertWeiToEth(tempData[i].WeiPrice)} eth)`)

      // Cancelling the active offer
      cancelOfferHelper.cancelOffer(jwtToken, tempData[i].TokenOfferId, tempData[i].TokenOfferBlockchainId, apiKey)

      // Rate control
      await utilsHelper.sleep(2000)

      // Listing the active offer again
      createOfferHelper.CreateOffer(tempData[i].AssetId, 0, null, tempData[i].WeiPrice, userSlug, jwtToken, privateKey, apiKey)

      // Rate control
      await utilsHelper.sleep(2000)
    }

    console.log(`\n${tempData.length} cards relisted successfully !\n`)
  }
}

main().catch((error) => {
  console.error(error.message)
  // To enable debug traces
  // console.debug(error.stack)
  process.exit(-1)
})
