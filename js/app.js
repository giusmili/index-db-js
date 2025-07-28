document.addEventListener('DOMContentLoaded', () => {
  const dbName = "UserProfileDB";
  const storeName = "profiles";
  let db;

  const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  const getCookie = name =>
    document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1] || null;

  const updateJsonLd = (username = "William") => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": username,
      "description": "Profil utilisateur enregistré via cookie et IndexedDB",
      "url": "https://giusmili.github.io/index-db-js/"
    };
    const script = document.getElementById("profileJsonLd");
    if (script) {
      script.textContent = JSON.stringify(jsonLd, null, 2);
    }
  };

  const loadProfile = () => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    store.get("main").onsuccess = e => {
      const data = e.target.result;
      if (data) {
        document.getElementById("profileData").innerHTML = `
          <div class="p-4 bg-green-100 rounded">
            <h2 class="font-bold text-lg">Profil enregistré :</h2>
            <p><strong>Nom :</strong> ${data.username}</p>
            <p><strong>Thème :</strong> ${data.theme}</p>
          </div>
        `;
        updateJsonLd(data.username);
      } else {
        updateJsonLd();
      }
    };
  };

  const openRequest = indexedDB.open(dbName, 1);

  openRequest.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore(storeName, { keyPath: "id" });
  };

  openRequest.onsuccess = e => {
    db = e.target.result;
    loadProfile();
  };

  openRequest.onerror = () => console.error("Erreur d'ouverture IndexedDB");

  document.getElementById("profileForm").addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const theme = document.getElementById("theme").value;
    if (!username) return;

    const profile = { id: "main", username, theme };
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(profile);

    setCookie("username", username);
    setCookie("theme", theme);

    loadProfile();
  });
});