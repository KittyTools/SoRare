![image](https://user-images.githubusercontent.com/116301478/197419985-26485cfc-cb53-4a91-bf2a-f8b6dfce33db.png)

# SoRare
Let's make our life easier :heart_eyes_cat:

> :bread: For baguette people, French version is available at the bottom.

## Security :bangbang:
First rule : Don't trust anyone, don't even trust a cat!  
Don't trust me, please read the code.  
If you don't know how to read it, ask someone to do it for you.

- JWT token :

Some scripts will login to your Sorare account.  
At the first execution, you will be prompted to provide your email, password and your optional 2fa.  
After a successful login, a JWT token will be generated.  
The purpose of this token is to be able to execute the script again and again without having to provide your credentials every time.  
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

There is two different way for providing your private key :

**Most conveniant solution :**  
If you don't want to provide your private key at every script run, you can create a text file `hideMe.config` containing it.  
Place this file in the same directory as the script.  
A good idea would be to run your script on an external usb key: even if someone hack your computer, he won't have access to your sensitive informations.

**Safest solution :**  
If the `hideMe.config` file doesn't exist, you will be prompted for your private key at every script run.

This is the most sensitive information. Please keep in mind that anyone who get access to your private key, will be able to steal all your assets and totally dry out your account. Never share your private key. :bangbang:

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
Regle numero un : Ne faite confiance a personne, ne croyez meme pas un chat!  
Ne me croyez pas, lisez le code.  
Si vous ne savez pas lire le code, demandez a quelqu'un de le faire pour vous.

- JWT token :

Certains scripts vous se connecter a votre compte Sorare.  
La premiere fois que vous l'executerez, il vous sera demande de fournir votre email, mot de passe et le cas echeant: votre 2fa.  
Apres une connection reussie, un jeton JWT sera cree.  
Le but de ce jeton est de pouvoir executer le script plusieurs fois sans avoir a fournir ces informations a chaque iteration.  
Il expirera apres une periode d'un mois, vous devrez alors fournir vos informations a nouveau.  
Ce jeton est enregistre dans le fichier `login.config`.  
Si vous voulez utiliser un autre compte Sorare, vous pouvez supprimer ce fichier (Vos informations seront demande a nouveau).  
Vous pouvez aussi editer le fichier et changer la date d'expiration pour une date dans le passe.

Ne partagez jamais votre JWT token, considerez le comme un acces a votre compte Sorare. :bangbang:

- Cle privee Starkware :

Certains scripts vont executer des actions sur la blockchain.  
Votre cle privee est donc a fournir.  
Vous trouverez votre cle privee directement dans les options de votre porte-feuille Sorare :

![image](https://user-images.githubusercontent.com/116301478/197422002-5dadfad2-9625-4597-aee3-8235f63e452a.png)

Il y a deux differents moyens de fournir votre cle privee :

**Solution la plus pratique :**  
Si vous ne voulez pas avoir a fournir votre cle privee a chaque execution du script, vous pouvez creer un fichier textuel `hideMe.config` contenant la cle.  
Placez ce fichier dans le meme repertoire que le script.  
Une bonne pratique serait d'executer le script dans une cle usb externe : ainsi, meme si quelqu'un pirate votre ordinateur, il n'aura pas acces a vos informations sensibles.

**Solution la plus sure :**  
Si le fichier `hideMe.config` n'existe pas, vous devrez fournir votre cle privee a chaque execution du script.

Votre cle privee est la donnee la plus sensible de votre compte Sorare. Gardez a l'esprit que si quelqu'un y a acces, il pourra voler tout vos actifs et completement vider votre compte. Ne partagez jamais vote cle privee. :bangbang:

## Cle d'API
Vous aurez besoin d'une cle API pou executer les scripts.  
Vous pouvez la demander ici : https://help.sorare.com/hc/en-us/requests/new  
Raison du contact : API

La cle API fonctionne de la meme maniere que votre jeton JWT. Elle vous sera demandee a la premiere execution du script.  
Chaque fois que votre jeton JWT expire (ou est supprime par vos soins), elle vous sera demandee a nouveau.



