![image](https://user-images.githubusercontent.com/116301478/197419985-26485cfc-cb53-4a91-bf2a-f8b6dfce33db.png)

# SoRare
Let's make our life easier :heart_eyes_cat:

> :bread: [For baguette people, French version is available at the bottom.][linkFrench]

## Security :bangbang:
First rule : Don't trust anyone, don't even trust a cat!  
Don't trust me, please read the code.  
If you don't know how to read it, ask someone to do it for you.

- JWT token :

Some scripts will login to your Sorare account.  
At the first execution, you will be prompted to provide your email, password and your optional 2fa.  
After a successful login, a JWT token will be generated.  
The purpose of this token: being able to execute the script again and again without having to provide your credentials every time.  
It will expire after one month and your credentials will be asked again.  
This token is saved into the `login.config` file.  
If you want to use another Sorare account, you can delete this file (You will be prompted to give your credentials again).  
You can also edit the file and make the token expires manually by changing the expiration date.

Never share your JWT token, considerate it as an access to your Sorare account. :bangbang:

- Starkware private key :

Some scripts will execute actions on the blockchain.  
Your private key is needed to do it.  
You will be able to find your private key in your wallet options directly on Sorare :

![image](https://user-images.githubusercontent.com/116301478/197422002-5dadfad2-9625-4597-aee3-8235f63e452a.png)

There is two different way to provide your private key :

**Most conveniant solution :**  
If you don't want to provide your private key at every script run, you can create a text file `hideMe.config` containing it.  
Place this file in the same directory as the script.  
A good idea would be to run your script on an external usb key: even if someone hacks your computer, he won't have access to your sensitive informations.

**Safest solution :**  
If the `hideMe.config` file doesn't exist, you will be prompted for your private key at every script run.

This is the most sensitive information. Please keep in mind that anyone getting access to your private key, will be able to steal all your assets and totally dry out your account. Never share your private key. :bangbang:

## API key
You will need an API key to run the scripts.  
You can request it here : https://help.sorare.com/hc/en-us/requests/new  
Reason for contact : API

The api key works like your JWT token and is saved in the same file. You will be prompted to provide it at the first script execution.  
Everytime your JWT token expired (or is deleted), you will have to provide it again.

## Node JS and NPM packages
The main language used in the scripts is Node JS.
You will need to install the framework (Node JS) and the different packages dependencies associated with the scripts (Using NPM).
Here are some links to help you choose your environment and install them:
- [Node.js and NPM on Windows][linkInstallNode]
- [Using linux on windows with windows native WSL][linkWslTuto]
- [Node.js and NPM on Linux][linkNodeLinux]
- [Node.js and NPM on Windows, MacOS and Linux][linkNodeAllOs]

## Scripts dependencies
Here are the list of NPM packages to install before being able to run the scripts:
- Script **ListMyCardsAgain.js**  
bcrypt package (A library to help hash passwords.) `npm i bcrypt`  
node-fetch package (Fetch API module) `npm i node-fetch`  
prompt package (A beautiful command-line prompt) `npm i prompt`  
graphql-request package (Minimal GraphQL client) `npm i graphql-request`  
@sorare crypto package (JavaScript Crypto helpers for Sorare) `npm i @sorare/crypto`

## Contact / Help
If you need additional information or some help: you can contact me on twitter @LilScrappy9Ts

___

# SoRare
Rendons notre vie plus facile :heart_eyes_cat:

## S??curit?? :bangbang:
R??gle num??ro un : Ne faites confiance ?? personne, pas m??me ?? un chat tout mignon!  
Ne me croyez pas, lisez le code!  
Si vous ne savez pas lire le code, demandez ?? quelqu'un de le faire pour vous.

- JWT token :

Certains scripts se connectent ?? votre compte Sorare.  
La premi??re fois que vous les ex??cuterez, il vous sera demand?? de fournir votre email, mot de passe et le cas ??ch??ant: votre 2fa.  
Apr??s une connexion r??ussie, un jeton JWT sera cr????.  
Le but de ce jeton est de pouvoir ex??cuter le script plusieurs fois sans avoir ?? fournir ces informations a chaque it??ration.  
Il expirera apr??s une p??riode d'un mois, vous devrez alors fournir vos informations ?? nouveau.  
Ce jeton est enregistr?? dans le fichier `login.config`.  
Si vous voulez utiliser un autre compte Sorare, vous pouvez supprimer ce fichier (Vos informations seront demand??es ?? nouveau).  
Vous pouvez aussi ??diter le fichier et changer la date d'expiration pour une date dans le pass??.

Ne partagez jamais votre JWT token, consid??rez le comme un acc??s ?? votre compte Sorare. :bangbang:

- Cl?? priv??e Starkware :

Certains scripts vont ex??cuter des actions sur la blockchain.  
Votre cl?? priv??e est donc ?? fournir.  
Vous la trouverez directement dans les options de votre porte-feuille Sorare :

![image](https://user-images.githubusercontent.com/116301478/197422002-5dadfad2-9625-4597-aee3-8235f63e452a.png)

Il y a deux diff??rents moyens de fournir votre cl?? priv??e :

**Solution la plus pratique :**  
Si vous ne voulez pas avoir ?? fournir votre cl?? priv??e ?? chaque ex??cution du script, vous pouvez cr??er un fichier textuel `hideMe.config` contenant la cl??.  
Placez ce fichier dans le m??me r??pertoire que le script.  
Une bonne pratique serait d'ex??cuter le script dans une cl?? usb externe : ainsi, m??me si quelqu'un pirate votre ordinateur, il n'aura pas acc??s ?? vos informations sensibles.

**Solution la plus s??re :**  
Si le fichier `hideMe.config` n'existe pas, vous devrez alors fournir votre cl?? priv??e a chaque ex??cution du script.

Votre cl?? priv??e est la donn??e la plus sensible de votre compte Sorare. Gardez ?? l'esprit que si quelqu'un y a acc??s, il pourra voler tous vos actifs et compl??tement vider votre compte. Ne la partagez jamais. :bangbang:

## Cl?? d'API
Vous aurez ??galement besoin d'une cl?? API pour ex??cuter les scripts.  
Vous pouvez en faire la demander ici : https://help.sorare.com/hc/en-us/requests/new  
(Raison du contact : API)

La cl?? API fonctionne de la m??me mani??re que votre jeton JWT. Elle vous sera demand??e ?? la premi??re ex??cution du script.  
Chaque fois que votre jeton JWT expire (ou est supprim?? par vos soins), elle vous sera demand??e ?? nouveau.

## JS Node et packages NPM
Le principal langage utilise dans les scripts est JS Node.
Vous devez installer la biblioth??que node JS et les differents packs de dependences associes aux scripts via NPM.
Voici des liens qui vous aiderons a choisir votre environement et installer NPM et JS Node:
- [Node.js et NPM sur Windows][linkInstallNode]
- [Utiliser Linux sur windows avec la fonction native WSL][linkWslTuto]
- [Node.js et NPM sur Linux][linkNodeLinux]
- [Node.js et NPM sur Windows, MacOS et Linux][linkNodeAllOs]

## D??pendances de scripts
Voici la list des packs NPM a installer avant d'ex??cuter les scripts:
- Script **ListMyCardsAgain.js**  
bcrypt package (A library to help hash passwords.) `npm i bcrypt`  
node-fetch package (Fetch API module) `npm i node-fetch`  
prompt package (A beautiful command-line prompt) `npm i prompt`  
graphql-request package (Minimal GraphQL client) `npm i graphql-request`  
@sorare crypto package (JavaScript Crypto helpers for Sorare) `npm i @sorare/crypto`

## Contact / Aide
Si vous avez besoin d'information ou d'aide: vous pouvez me contacter sur twitter @LilScrappy9Ts

[linkFrench]: <https://github.com/KittyTools/SoRare#sorare-1>
[linkInstallNode]: <https://treehouse.github.io/installation-guides/windows/node-windows.html>
[linkWslTuto]: <https://www.sitepoint.com/wsl2/>
[linkNodeLinux]: <https://www.geeksforgeeks.org/installation-of-node-js-on-linux/>
[linkNodeAllOs]: <https://kinsta.com/blog/how-to-install-node-js/>
