const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

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

var SateliteStyle = L.tileLayer('/webmap/mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 8,noWrap: true,continuousWorld: false,id: 'SateliteStyle map',}),
	AtlasStyle	= L.tileLayer('/webmap/mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 5,noWrap: true,continuousWorld: false,id: 'styleAtlas map',}),
	GridStyle	= L.tileLayer('/webmap/mapStyles/styleGrid/{z}/{x}/{y}.png', {minZoom: 0,maxZoom: 5,noWrap: true,continuousWorld: false,id: 'styleGrid map',});

    var SpawnGroup = L.layerGroup(); 
    var PoliceGroup = L.layerGroup(); 
    var MedicGroup = L.layerGroup();
    var MechanicGroup = L.layerGroup();
    var CarDealerGroup = L.layerGroup();
    var ClothesGroup = L.layerGroup();
    var BankGroup = L.layerGroup();
    var JewelryGroup = L.layerGroup();
    var TaxiGroup = L.layerGroup();
    var GouvernementGroup = L.layerGroup();

    var Icons = {
        "Spawn" : SpawnGroup,
        "Police" : PoliceGroup,
        "Medic": MedicGroup,
        "Mechanic": MechanicGroup,
        "CarDealer": CarDealerGroup,
        "Clothes": ClothesGroup,
        "Bank": BankGroup,
        "Jewelry": JewelryGroup,
        "Taxi": TaxiGroup,
        "Gouvernement": GouvernementGroup,

    };

var mymap = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    Zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle],
    center: [1000, 0],
    zoom: 3,
});

function addAllLayers() {
    Object.values(Icons).forEach(layerGroup => {
        layerGroup.addTo(mymap);
    });
}

// Appeler la fonction pour ajouter tous les groupes de marqueurs à la carte
addAllLayers();


var layersControl = L.control.layers({ "Satelite": SateliteStyle,"Atlas": AtlasStyle,"Grid":GridStyle}, Icons).addTo(mymap);


function customIcon(icon){
	return L.icon({
		iconUrl: `blips/${icon}.png`,
		iconSize:     [25, 25],
        iconAnchor:   [20, 20],
        popupAnchor:  [-10, -27]
	});
}

var X  = -1025;
var Y = -2750;
L.marker([Y,X], {icon: customIcon(2)}).addTo(Icons["Spawn"]).bindPopup("I am here.");

var a = 650;
var b = 0;
L.marker([b,a], {icon: customIcon(7)}).addTo(Icons["Police"]).bindPopup("Vinewood Police Station.");



var c = 450;
var d = -1000;

L.marker([d,c], {icon: customIcon(7)}).addTo(Icons["Police"]).bindPopup("Missions Row Police Station.");

var e = -850;
var f = -1050;

L.marker([e,f], {icon: customIcon(7)}).addTo(Icons["Police"]).bindPopup("Vespucci Police Station.");

var g = -350;
var h = -1850;

L.marker([g,h], {icon: customIcon(6)}).addTo(Icons["Medic"]).bindPopup("Ocean Hospital");

var i = -1650; 
var j = 230;

L.marker([i,j], {icon: customIcon(9)}).addTo(Icons["Medic"]).bindPopup("Fire station");

var k = -1400;
var l = 350;

L.marker([k,l], {icon: customIcon(6)}).addTo(Icons["Medic"]).bindPopup("Hopital of Groove street");

var m = -1300;
var n = -200;

L.marker([m,n], {icon: customIcon(10)}).addTo(Icons["Mechanic"]).bindPopup("Bennys");

var o = -130;
var p = -330;

L.marker([o,p], {icon: customIcon(3)}).addTo(Icons["Mechanic"]).bindPopup("Los Santos Customs");

var q = -30;
var r = -1110;

L.marker([r,q], {icon: customIcon(5)}).addTo(Icons["CarDealer"]).bindPopup("Premium Deluxe Motor Sport");

var u = -1400;
var v = 100;

L.marker([u,v], {icon: customIcon(30)}).addTo(Icons["Clothes"]).bindPopup("Binco Famillies");

var w = -800;
var x = 415;

L.marker([w,x], {icon: customIcon(30)}).addTo(Icons["Clothes"]).bindPopup("Binco Mission Row");

var y = -1100;
var z = -800;

L.marker([y,z], {icon: customIcon(30)}).addTo(Icons["Clothes"]).bindPopup("Binco Vespuci");

var aa = 6500;
var ab = 0;

L.marker([aa,ab], {icon: customIcon(30)}).addTo(Icons["Clothes"]).bindPopup("Binco of Paleto");

var ac = 2700;
var ad = 600;

L.marker([ac,ad], {icon: customIcon(30)}).addTo(Icons["Clothes"]).bindPopup("Binco of Sandy Shores");

var ae = -1000;
var af = 150;

L.marker([ae,af], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Legion Square');

var ag = 450;
var ah = -3000;

L.marker([ag,ah], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Pacific Bluffs');

var ai = -450;
var aj = -1250;

L.marker([ai,aj], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Rockford Hills');

var ak = -250;
var al = 300;

L.marker([ak,al], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Alta branch');

var am = 30;
var an = -350;

L.marker([am,an], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Burton Branch');

var ao = 1200;
var ap = 2700;

L.marker([ap,ao], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Sandy Shores');

var aq = 1000;
var ar = -1000;

L.marker([ar,aq], {icon: customIcon(31)}).addTo(Icons["Bank"]).bindPopup('Fleeca of Paleto');

var as = -250;
var at = -620;

L.marker([as,at], {icon: customIcon(32)}).addTo(Icons["Jewelry"]).bindPopup('Vangelico Jewerly');

var aw = -630;
var ax = -530;

L.marker([aw,ax], {icon: customIcon(11}).addTo(Icons["Gouvernement"]).bindPopup('Government of Los Santos');












