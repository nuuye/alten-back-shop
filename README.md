# README

Ce projet utilise Node.js et Express pour le backend, ainsi que MongoDB comme base de données.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **Node.js** : Téléchargez et installez Node.js à partir du site officiel : [https://nodejs.org/](https://nodejs.org/). Node.js inclut npm, le gestionnaire de packages de Node.js, qui est utilisé pour installer les dépendances du projet.

- **MongoDB** : Téléchargez et installez MongoDB à partir du site officiel : [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community). Suivez les instructions d'installation spécifiques à votre système d'exploitation.

## Installation

1. Clonez le dépôt du projet sur votre machine locale :

    ```bash
    git clone https://github.com/nuuye/alten-back-shop.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd back
    ```

3. Installez les dépendances Node.js en exécutant la commande suivante :

    ```bash
    npm install
    ```

## Démarrage du Backend

1. Assurez-vous que le service MongoDB est en cours d'exécution sur votre machine. Vous pouvez démarrer MongoDB en exécutant la commande appropriée selon votre système d'exploitation (DATABASE_URL: mongodb://localhost/products).

2. Initialisez la base de données avec les 30 produits en exécutant le script `initialization.js` :

    ```bash
    node initialization.js
    ```

3. Lancez le serveur backend en mode développement avec la commande suivante :

    ```bash
    npm run devStart
    ```

Le backend sera alors accessible à l'adresse `http://localhost:3000`.

## Tests

1. Les requêtes sont présentes et testable dans le fichier route.rest (extension REST Client sur vscode), un fichier postman à importer est également présent.

2. Des tests fait avec jest sont executable en lançant la commande suivante:

    ```bash
    npm test
    ```

Assurez vous que le port 3000 soit libre.

# Instructions: Back-end

Développer un back-end permettant la gestion de produits définis plus bas. Vous pouvez utiliser la technologie de votre choix parmis la list suivante :

- nodejs/express
- Java/Spring Boot
- C#/.net Core
- Python/Flask

Le back-end doit gérer les API REST suivantes : 

| Resource           | POST                  | GET                            | PATCH                                    | PUT | DELETE           |
| ------------------ | --------------------- | ------------------------------ | ---------------------------------------- | --- | ---------------- |
| **/products**      | Create a new products | Retrieve all products          | X                                        | X   |     X            |
| **/products/1**    | X                     | Retrieve details for product 1 | Update details of product 1 if it exists | X   | Remove product 1 |

Un produit a les caractéristiques suivantes : 

``` typescript
class Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inventoryStatus: string;
  category: string;
  image?: string;
  rating?: number;
}
```

Le back-end créé doit pouvoir gérer les produits dans une base de données SQL/NoSQL ou dans un fichier json.

Une liste de produits est disponible dans ce fichier : `front/assets/products.json`

Un front-end en Angular est disponible et permet d'utiliser l'API via cette adresse : `http://localhost:3000`

vous pouvez lancer le front-end angular avec la commande 'ng serve'

# Bonus

Vous pouvez ajouter des tests Postman ou Swagger pour valider votre API