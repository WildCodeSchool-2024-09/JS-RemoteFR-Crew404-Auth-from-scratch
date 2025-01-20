# Création d'un workshop pour l'authentification

## Sommaire

-   Step1: [Creaction d'un backend](#step1-creation-dun-backend-server)

## Step 1: Creation d'un backend (server)

-   [x] Créer un dossier `server` à la racine du projet et se rendre dedans.
-   [x] Ajout d'un fichier index.ts pour le serveur.
-   [x] Création d'un `package.json`.
-   [x] Installation des dépendances
-   [x] Création d'un serveur express

```shell
npm install express
npm install @types/express
npm install typescript ts-node
```

-   [x] Initialiser un fichier de configuration TS.

```shell
npx tsc --init
```

-   [x] Ajouter un script pour démarrer le serveur.

```json
"start": "ts-node index.ts"
```

-   [x] Ne pas oublier de faire un `git init` (et un .gitignore) pour initialiser le projet.

-   [x] Creation de mon serveur express. [Express - Node.js web application framework](https://expressjs.com/)

-   [x] Nous allons devoir compiler notre code, j'ajoute donc quelques package pour que celui ci fonctionne correctement.

```shell
npm install @types/node
npm install ts-node-dev --save-dev
```

---

### Login

-   [x] Nous avons besoin d'un middleware d'express pour lire les information de `req.body`. J'utilise le middleware `express.json()`.

Nous avons jusqu'a présent fait ce cycle là:

![v0](./docs/auth_login_v0.png)

Et notre but, c'est de faire ça :

![v1](./docs/auth_login.png)

Nous allons donc installer un module npmjs pour configurer notre bdd et ainsi pouvoir faire des requêtes sur celle ci.
