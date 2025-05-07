<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Heinsberg Event App</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&family=Sora:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" crossorigin=""/>
</head>
<body>

  <!-- Views -->
  <main id="home" class="view active">
    <header>
      <h1>Hallo Chris 👋</h1>
      <p>Es gibt 25 neue Events in deiner Nähe</p>
      <div class="search-bar">
        <input type="text" placeholder="Suche nach einem Event..." id="searchInput" />
      </div>
      <div class="filter-bar">
        <select id="categoryFilter">
          <option value="">Alle Kategorien</option>
          <option value="Kultur">Kultur</option>
          <option value="Workshop">Workshop</option>
          <option value="Party">Party</option>
          <option value="Familie">Familie</option>
        </select>
        <select id="dateFilter">
          <option value="">Alle Tage</option>
          <option value="today">Heute</option>
          <option value="tomorrow">Morgen</option>
          <option value="weekend">Wochenende</option>
        </select>
      </div>
    </header>
    <section class="section">
      <h2>Top bewertete Events in deiner Nähe</h2>
      <div class="scroll-container" id="suggestedEvents"></div>
    </section>
    <section class="section">
      <h2>Aktuelle Events</h2>
      <div class="timeline-container" id="timeline"></div>
    </section>
  </main>

  <section id="map" class="view">
    <h2>Karte</h2>
    <div id="mainMap"></div>
  </section>

  <section id="shops" class="view">
    <h2>Favoriten</h2>
    <div id="favoritesContainer"></div>
  </section>

  <section id="profile" class="view">
    <h2>Profil</h2>
    <ul class="settings-list">
      <li><span>👤 Benutzername</span><span class="setting-value">Max Mustermann</span></li>
      <li><span>🌐 Sprache</span>
        <select><option>Deutsch</option><option>Englisch</option></select>
      </li>
      <li><span>🎨 Designmodus</span>
        <select id="themeSelector" onchange="setTheme(this.value)">
          <option value="system">System</option>
          <option value="light">Hell</option>
          <option value="dark">Dunkel</option>
        </select>
      </li>
      <li><span>🔔 Benachrichtigungen</span>
        <label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>
      </li>
      <li><span>📱 App-Version</span><span class="setting-value">1.0</span></li>
      <li><span>📄 Datenschutz</span><a href="#">Einsehen</a></li>
    </ul>
    <div class="section centered">
      <button class="cta-button" onclick="switchTab('organizerView')">🛠 Veranstalteransicht testen</button>
    </div>
  </section>

  <!-- Dummy Veranstalteransicht -->
  <section id="organizerView" class="view">
  <h2>🎤 Veranstalterbereich</h2>
  <p>Hier kannst du neue Events erstellen. Einfach und schnell.</p>

  <div class="form-grid">
    <div class="form-group">
      <label>Titel:</label>
      <input type="text" placeholder="z. B. Straßenfest Oberbruch" />
    </div>
    <div class="form-group">
      <label>Bild hochladen:</label>
      <input type="file" />
    </div>
    <div class="form-group">
      <label>Datum:</label>
      <input type="date" />
    </div>
    <div class="form-group">
      <label>Uhrzeit:</label>
      <input type="time" />
    </div>
    <div class="form-group full-width">
      <label>Ort:</label>
      <input type="text" placeholder="z. B. Oberbruch" />
    </div>
  </div>

  <div class="section centered">
    <button class="cta-button" onclick="alert('📣 Event wurde gespeichert (Demo)')">Event veröffentlichen</button>
    <button class="cta-button" style="background-color: #d1d5db; color: #111827;" onclick="switchTab('profile')">Zurück zum Profil</button>
  </div>
</section>


  <!-- Overlay -->
  <div id="overlay" class="overlay">
    <div class="overlay-content">
      <img id="overlayImg" src="fallback.png" alt="Eventbild">
      <div class="overlay-header">
        <h2 id="eventTitle">Titel</h2>
        <img id="favoriteIcon" class="favorite-btn" src="herz.svg" alt="Herz" onclick="toggleFavorite()" />
      </div>
      <p id="eventMeta">Datum, Uhrzeit · Ort</p>
      <p id="eventDesc">Beschreibung</p>
      <div class="event-interactions">
        <div class="rating-stars" id="ratingStars"></div>
        <button id="visitedButton" onclick="toggleVisited()">Markieren als besucht</button>
      </div>
      <button onclick="shareEvent()">Teilen</button>
      <div id="eventMap"></div>
      <button onclick="closeOverlay()">Schließen</button>
    </div>
  </div>

  <!-- Navigation -->
  <nav class="bottom-nav">
    <button onclick="switchTab('home')"><img id="icon-home" src="home_ausgewählt.png" alt="Home">Home</button>
    <button onclick="switchTab('map')"><img id="icon-map" src="karte.png" alt="Karte">Karte</button>
    <button onclick="switchTab('shops')"><img id="icon-shops" src="favoriten.png" alt="Favoriten">Favoriten</button>
    <button onclick="switchTab('profile')"><img id="icon-profile" src="profil.png" alt="Profil">Profil</button>
  </nav>

  <!-- Scripts -->
  <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" crossorigin=""></script>
  <script src="script.js"></script>

</body>
</html>
