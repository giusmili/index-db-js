# Schéma de la base IndexedDB coté navigateur

Dans notre script js, on crée une base de données nommée ```UserProfileDB```. Cette base contient un store d’objets (_object store_) appelé profiles. Chaque enregistrement de ce store utilise comme clé primaire le champ id, qui dans notre code vaut "main". Les données stockées sont ensuite affichées (_les champs username et theme_).
```
    📂 UserProfileDB – la base de données IndexedDB utilisée par le script.

        📂 profiles – le store d’objets (similaire à une table) créé avec keyPath: "id".

            🔑 id – clé primaire (identifiant unique du profil, ici « main »).

            👤 username – nom d’utilisateur stocké dans l’enregistrement.

            🎨 theme – préférence de thème stockée dans l’enregistrement.
```
Ces éléments correspondent au code JS : à l’ouverture de la base (indexedDB.open), on crée le store "profiles" avec keyPath: "id". Lors de la soumission du formulaire, on enregistre un objet ``` {id: "main", username, theme}``` dans le store.

```
├── 📁 .dist/
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 css/
│   └── 🎨 filter.css
├── 📁 js/
│   └── 📄 app.js
├── 🌐 index.html
└── 📖 readme.md
```