const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

// Définition d'un CRS personnalisé pour adapter la carte de GTA V
CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {
        return Math.pow(2, zoom);
    },
    zoom: function(sc) {
        return Math.log(sc) / 0.6931471805599453;
    },
    distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
    transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});

var bounds = [[-4000, -4000], [4000, 4000]]; // Ajuste selon la taille de ta carte

// 1️⃣ D'abord, on initialise la carte !
var map = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    preferCanvas: true,
    center: [0, 0],
    zoom: 3,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
});

// 2️⃣ Ensuite, on charge les tuiles après avoir créé `map`
var SateliteStyle = L.tileLayer('mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 8,
    noWrap: true,
    attribution: 'Online map GTA V',
    errorTileUrl: 'html/mapStyles/styleSatelite/empty.jpg' // Image de secours si une tuile manque
}).addTo(map);

// Stockage des marqueurs des joueurs
var playerMarkers = {};

// Fonction pour mettre à jour la position des joueurs
function updatePlayerPositions(players) {
    // Supprime les anciens marqueurs
    for (var id in playerMarkers) {
        map.removeLayer(playerMarkers[id]);
    }

    // Ajoute les nouveaux marqueurs
    playerMarkers = {};
    players.forEach(player => {
        var marker = L.marker([player.y, player.x]).addTo(map)
            .bindPopup(`Joueur: ${player.name}`);
        playerMarkers[player.id] = marker;
    });
}

// Écouteur pour recevoir les mises à jour des joueurs depuis FiveM
window.addEventListener('message', function(event) {
    var data = event.data;
    if (data.action === 'updatePlayers') {
        updatePlayerPositions(data.players);
    } else if (data.action === 'toggleUI') {
        document.getElementById('mapContainer').style.display = data.status ? "block" : "none";
    }
});

// Gestion du bouton pour fermer la carte
document.getElementById('closeMap').addEventListener('click', function() {
    document.getElementById('mapContainer').style.display = "none";

    try {
        fetch(`https://${GetParentResourceName()}/closeUI`, {
            method: "POST",
            body: JSON.stringify({})
        }).catch(err => console.log("Erreur Fetch:", err));
    } catch (error) {
        console.log("Erreur lors de l'appel NUI:", error);
    }
});

// Ajout d'un événement pour recharger la carte
window.addEventListener('message', function(event) {
    if (event.data.action === "reloadMap") {
        location.reload();
    }
});
