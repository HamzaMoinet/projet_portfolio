
# Portfolio FastFood – Documentation rapide

## Description
Ce projet est une application de gestion de fast-food avec une interface utilisateur (React/TypeScript) et un backend Node.js/Express/MongoDB. Il permet la gestion des menus, plats, commandes et utilisateurs (admin et client).



## Arborescence du projet
```text
projet_portfolio/
├── README.md
├── projet_portfolio-test/
│   ├── backend/
│   │   ├── app.js
│   │   ├── package.json
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   ├── swagger.js
│   ├── frontend/
│   │   ├── fastfood/
│   │   │   ├── package.json
│   │   │   ├── public/
│   │   │   ├── src/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │   ├── App.tsx
│   │   │   │   ├── main.tsx
│   │   │   │   ├── ...
│   │   │   ├── vite.config.ts
│   │   │   ├── ...
```


## Installation et commandes importantes

### 1. Cloner le projet
```bash
git clone <url-du-repo>
```

### 2. Backend
```bash
cd projet_portfolio-test/backend
npm install
npm run dev # Lance le serveur Express

# Pour installer des packages importants utilisés :
npm install express mongoose cors dotenv jsonwebtoken bcryptjs swagger-ui-express

# Pour installer nodemon (dev)
npm install --save-dev nodemon

# Pour lancer le serveur en mode développement
npm run dev # (si script "dev" présent dans package.json)
```

### 3. Frontend
```bash
cd ../frontend/fastfood
npm install
npm run dev # Lance le serveur Vite

# Pour installer des packages importants utilisés :
npm install react react-dom axios

# Pour TypeScript et outils de développement
npm install --save-dev typescript @types/react @types/react-dom vite

# Pour ESLint
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## Fonctionnalités principales
- Authentification utilisateur/admin
- CRUD sur les plats, menus, ingrédients (admin)
- Visualisation et personnalisation des plats (utilisateur)
- Gestion des commandes (utilisateur et admin)
- Affichage dynamique des images et informations
- Footer toujours en bas de page

## Accès
- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:3001
- **Swagger** : http://localhost:3001/api-docs

## Auteur
Hamza Moinet
