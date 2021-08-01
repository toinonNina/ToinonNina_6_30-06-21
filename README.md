# Groupomania #

-  Groupomania, groupe spécialisé dans la grande distribution.

## Informations générales

- - La direction groupomania a promis des mesures d’amélioration de la communication entre collègues,
entre autres un nouveau projet numérique. Il s’agit de la création d’un réseau social interne,
moderne et ludique, qui permettra aux employés de se connaître dans un cadre plus informel.

## objectifs

- la présentation des fonctionnalités doit être simple ;
- la création d’un compte doit être simple et possible depuis un téléphone mobile ;
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide ;
- la suppression du compte doit être possible ;
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent ;
- l’accès à un forum où les salariés publient des textes doit être présent ;
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés ;
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre
le ou la chargé-e de communication Groupomania doit pouvoir afficher les dernières participations des employés salariés ;

## Prérequis :

- Installer NodeJs et MySql.
- creer un compte utilisateur mysql
- - `CREATE USER 'user'@'localhost' IDENTIFIED BY 'mot_de_passe';`
`GRANT ALL PRIVILEGES ON groupomania.* TO 'user'@'localhost';`
- Cloner le projet sur votre machine.
- Dans le fichier .env.exemple, completer les variables d'environnement par votre mot de passe, votre identifiant  et votre localhost mysql. Il faudra aussi fournit un token.   Renommer le fichier en ".env " .

## Les technologies :

- Base de données : MySql.
- Backend : NodeJs / Express.
- Frontend : Vuejs.

## Importation de la base de données :

La BDD se trouve dans le dossier racine dans le fichier database.sql il peut être importer via MySQLworkbench, la console SQL ou votre interface SQL habituelle !

## Lancement de l'application :

- Allez dans le dossier backend de l'application :

  - installez les dépendances avec la commande suivante :
    #### `npm install`
  - lancez le serveur avec la commande suivante :
    #### `nodemon server`
    
- Allez dans le dossier frontend de l'application :

  - installez les dépendances avec la commande suivante :
    #### `npm install`
  - lancez l'application avec la commande suivante :
    #### `npm run serve` (http://localhost:8080/)


## Fonctionnement de l'application :

- Créez un compte sur la page d'inscription en renseignant votre nom et prenom dans le champs indiqué ainsi qu'une adresse mail et un mot de passe. 
  Chacun de ses paramètres doit répondre à des conditions de validité qui apparaissent sous les champs lorsque ses conditions ne sont pas remplies.

- Connectez vous ensuite sur la page de connexion en renseignant l'adresse mail et le mot de passe précédemment enregistrés.

- Une fois sur la page d'accueil, vous avez accès à la totalité des articles déjà publiés par les autres utilisateurs. 

- Vous pourrez accéder à un article individuel pour le commenter.

- Vous pourrez également publier des articles, les modifier et les supprimer si vous le souhaitez.

- Vous pourrez aussi accéder à votre profil et le modifier, adresse email et mot de passe. Vous pouvez également supprimer votre comptes.

- Vous pourrez vous déconnecter de l'application.

- Le modérateur du site possède des droits supplémentaires : supprimer n'importe quel article et/ou commentaire de n'importe quel utilisateur.
  Vous pouvez vous connecter en tant que modérateur en utilisant les identifiants spécifiés dans le fichier .env.
