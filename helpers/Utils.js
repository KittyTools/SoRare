const util = require('util')
const fs = require('fs')
// eslint-disable-next-line n/no-deprecated-api
const fsExists = util.promisify(fs.exists)
const fsReadFile = util.promisify(fs.readFile)
// const fsWriteFile = util.promisify(fs.writeFile)

function filterOutliers (someArray, percentageOutline) {
  const values = someArray.concat().map(parseFloat)
  if (percentageOutline > 100 || percentageOutline < 0) { throw new Error('percentage must be in range(0, 100)') }

  values.sort(function (a, b) {
    return a - b
  })

  const from = Math.floor(values.length * percentageOutline / 100.0)
  const to = Math.ceil(values.length * (100 - percentageOutline) / 100.0)

  const maxValue = values[to]
  const minValue = values[from]

  return values.reduce(function (acc, x) {
    if (x > maxValue) {
      acc.higherBound.push(x)
    } else if (x < minValue) {
      acc.lowerBound.push(x)
    } else {
      acc.kept.push(x)
    }
    return acc
  }, { lowerBound: [], kept: [], higherBound: [] })
}

function sleep (ms) {
  return new Promise((resolve) => {
    // console.log('Sleeping')
    setTimeout(resolve, ms)
  })
}

function convertWeiToEth (wei) {
  return wei / 1000000000000000000
}

function convertEthToWei (eth) {
  return eth * 1000000000000000000
}

function convertAlgoliaUnitToEth (algoliaUnit) {
  return algoliaUnit / 100000
}

async function isInJsonFile (fileName, element) {
  if (await fsExists(fileName)) {
    let result = false
    const file = await fsReadFile(fileName)
    const jsonList = JSON.parse(file)
    jsonList.forEach(jsonItem => {
      if (jsonItem === element) {
        result = true
      }
    })
    return result
  } else {
    return false
  }
}

module.exports = { filterOutliers, sleep, convertWeiToEth, convertEthToWei, convertAlgoliaUnitToEth, isInJsonFile }
