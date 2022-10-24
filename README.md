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
A good idea would be to run your script on an external usb key: even if someone hack your computer, he won't have access to your sensitive informations.

**Safest solution :**  
If the `hideMe.config` file doesn't exist, you will be prompted for your private key at every script run.

This is the most sensitive information. Please keep in mind that anyone getting access to your private key, will be able to steal all your assets and totally dry out your account. Never share your private key. :bangbang:

## API key
You will need an API key to run the scripts.  
You can request it here : https://help.sorare.com/hc/en-us/requests/new  
Reason for contact : API

The api key works like your JWT token and is saved in the same file. You will be prompted to provide it at the first script execution.  
Everytime your JWT token expired (or is deleted), you will have to provide it again.

___

# SoRare
Rendons notre vie plus facile :heart_eyes_cat:

## Securite :bangbang:
Règle numéro un : Ne faites confiance à personne, pas même à un chat tout mignon!  
Ne me croyez pas, lisez le code!  
Si vous ne savez pas lire le code, demandez à quelqu'un de le faire pour vous.

- JWT token :

Certains scripts se connectent à votre compte Sorare.  
La première fois que vous les exécuterez, il vous sera demandé de fournir votre email, mot de passe et le cas échéant: votre 2fa.  
Après une connexion réussie, un jeton JWT sera créé.  
Le but de ce jeton est de pouvoir exécuter le script plusieurs fois sans avoir à fournir ces informations a chaque itération.  
Il expirera après une période d'un mois, vous devrez alors fournir vos informations à nouveau.  
Ce jeton est enregistré dans le fichier `login.config`.  
Si vous voulez utiliser un autre compte Sorare, vous pouvez supprimer ce fichier (Vos informations seront demandées à nouveau).  
Vous pouvez aussi éditer le fichier et changer la date d'expiration pour une date dans le passé.

Ne partagez jamais votre JWT token, considérez le comme un accès à votre compte Sorare. :bangbang:

- Clé privée Starkware :

Certains scripts vont exécuter des actions sur la blockchain.  
Votre clé privée est donc à fournir.  
Vous la trouverez directement dans les options de votre porte-feuille Sorare :

![image](https://user-images.githubusercontent.com/116301478/197422002-5dadfad2-9625-4597-aee3-8235f63e452a.png)

Il y a deux différents moyens de fournir votre clé privée :

**Solution la plus pratique :**  
Si vous ne voulez pas avoir à fournir votre clé privée à chaque exécution du script, vous pouvez créer un fichier textuel `hideMe.config` contenant la clé.  
Placez ce fichier dans le même répertoire que le script.  
Une bonne pratique serait d'exécuter le script dans une clé usb externe : ainsi, même si quelqu'un pirate votre ordinateur, il n'aura pas accès à vos informations sensibles.

**Solution la plus sûre :**  
Si le fichier `hideMe.config` n'existe pas, vous devrez alors fournir votre clé privée a chaque exécution du script.

Votre clé privée est la donnée la plus sensible de votre compte Sorare. Gardez à l'esprit que si quelqu'un y a accès, il pourra voler tous vos actifs et complètement vider votre compte. Ne la partagez jamais. :bangbang:

## Clé d'API
Vous aurez également besoin d'une clé API pour exécuter les scripts.  
Vous pouvez en faire la demander ici : https://help.sorare.com/hc/en-us/requests/new  
(Raison du contact : API)

La clé API fonctionne de la même manière que votre jeton JWT. Elle vous sera demandée à la première exécution du script.  
Chaque fois que votre jeton JWT expire (ou est supprimé par vos soins), elle vous sera demandée à nouveau.

[linkFrench]: <https://github.com/KittyTools/SoRare#sorare-1>
