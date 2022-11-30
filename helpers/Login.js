const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const prompt = require('prompt')
const fs = require('fs')
const util = require('util')

// eslint-disable-next-line n/no-deprecated-api
const fsExists = util.promisify(fs.exists)
const fsReadFile = util.promisify(fs.readFile)
const fsWriteFile = util.promisify(fs.writeFile)

let eMail
let dbsPassword
let doubleAuthentification
let apiKey

async function RetrieveJwt (SignIn) {
  if (SignIn.currentUser) {
    const MyOwnLogin = { jwt: SignIn.currentUser.jwtToken, slug: SignIn.currentUser.slug, apiKey }
    const MyOwnLoginString = JSON.stringify(MyOwnLogin)
    await fsWriteFile('login.config', MyOwnLoginString)
    return MyOwnLogin
  } else {
    throw Error('Login failed.')
  }
}

async function RequestCredentials () {
  prompt.start()

  // Get login credentials
  const result = await prompt.get([
    { name: 'eMail', required: true, description: 'Enter your email' },
    { name: 'password', required: true, hidden: true, replace: '*', description: 'Enter your password' },
    { name: 'DoubleAuthentification', required: false, description: 'Enter your optional 2fa' },
    { name: 'apiKey', required: true, description: 'Enter your api key' }
  ])

  eMail = result.eMail
  dbsPassword = result.password
  doubleAuthentification = result.DoubleAuthentification
  apiKey = result.apiKey

  // GET (Recuperation du salt)
  const userResponse = await fetch('https://api.sorare.com/api/v1/users/' + eMail)
  const user = await userResponse.json()

  if (!dbsPassword || !user.salt) {
    throw Error('User not found.')
  }

  const hashedPassword = await bcrypt.hash(dbsPassword, user.salt)

  // POST (Recuperation du otpSessionChallenge)
  const signInResponse = await fetch('https://api.sorare.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      operationName: 'SignInMutation',
      variables: {
        input: {
          email: eMail,
          password: hashedPassword
        }
      },
      query: 'mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug jwtToken(aud: "MeowAUD") { token expiredAt } } otpSessionChallenge errors { message } } }'
    })
  })
  const signIn = await signInResponse.json()

  if (signIn && signIn.data && signIn.data.signIn) {
    if (signIn.data.signIn.otpSessionChallenge) { // 2fa ?
      const otpSessionChallenge = signIn.data.signIn.otpSessionChallenge
      const authenticateResponse = await fetch('https://api.sorare.com/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          operationName: 'SignInMutation',
          variables: {
            input: {
              otpSessionChallenge,
              otpAttempt: doubleAuthentification
            }
          },
          query: 'mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug jwtToken(aud: "MeowAUD") { token expiredAt } } errors { message } } }'
        })
      })
      const authenticate = await authenticateResponse.json()
      if (authenticate && authenticate.data && authenticate.data.signIn) {
        return RetrieveJwt(authenticate.data.signIn)
      } else {
        throw Error('Login failed.')
      }
    } else {
      return RetrieveJwt(signIn.data.signIn)
    }
  } else {
    throw Error('Login failed.')
  }
}

async function Login () {
  if (await fsExists('login.config')) {
    const file = await fsReadFile('login.config')
    const myLogin = JSON.parse(file)

    const expiration = new Date(myLogin.jwt.expiredAt)
    const dateNow = new Date()
    dateNow.setDate(dateNow.getDate())

    if (dateNow < expiration) {
      return myLogin
    } else {
      return await RequestCredentials()
    }
  } else {
    return await RequestCredentials()
  }
}

async function GetPrivateKey () {
  if (await fsExists('hideMe.config')) {
    const file = await fsReadFile('hideMe.config')
    return file.toString()
  } else {
    const result = await prompt.get({ name: 'privateKey', required: true, hidden: true, replace: '*', description: 'Starkware private key' })
    return result.privateKey
  }
}

module.exports = { Login, GetPrivateKey }
