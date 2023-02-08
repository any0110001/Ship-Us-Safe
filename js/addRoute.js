mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aG9ueWFiYiIsImEiOiJja2N5ZXFnM3EwOTZmMnlxZWFnOHhtNm1tIn0.xH2RbWZWbHvAAZvD873b-g';
var lat,lng;    
var map;
var locationList = [];
var markerList = [];
var routelist = new routeList();
routelist.loadFromLocal(); // load data from local storage
var firstTime = true;
// everytime this file loaded, create a new shiplist and a new portlist
var shiplist = new shipList();
shiplist.loadFromLocal(); // load data from local storage
var portlist = new portList();
portlist.loadFromLocal(); // load data from local storage


// allow browser to load URL in the background for port
var script = document.createElement('script');
script.src = "https://eng1003.monash/api/v1/ports/?callback=showSamplePort";
document.body.appendChild(script); 
// get port samples
function showSamplePort(e){
    let lst = e.ports;
    for(let i = 0;i < lst.length;i++){
        portlist.addPort(new Port(lst[i].name,lst[i].country,lst[i].type,lst[i].size,lst[i].locprecision,lst[i].lng, lst[i].lat))
    }
}

//allow browser to load URL in the background for ship
var script = document.createElement('script');
script.src = 'https://eng1003.monash/api/v1/ships/?callback=showSampleShip';
document.body.appendChild(script);
//get ship samples
function showSampleShip(e){
    let lst = e.ships;
    for(let i = 0;i < lst.length;i++){
        shiplist.addShip(new Ship(lst[i].name,lst[i].maxSpeed,lst[i].range,lst[i].desc,lst[i].cost,lst[i].status, lst[i].comments))
    }
}


var depset = [];
var desset = [];

// retutrn longitude and latitude 
function showPort(result){
     lat = result.results[0].geometry.lat
     lng =result.results[0].geometry.lng
}

// unable to input info of start and end port before selecting country
document.getElementById('portfrom').disabled = true;
document.getElementById('portto').disabled = true;
document.getElementById('createRoute').disabled = true;

// get calendar
function getDate(){
    var d = new Date();
    var date = d.getDate();
        if (date<10){
        date="0"+date
    }
    var month = d.getMonth() + 1;
    if (month<10){
        month="0"+month
    }
    var year = d.getFullYear();
    var dateStr = year + "-" + month + "-" + date;
    document.getElementById("Date").innerHTML = dateStr
}

 // add position
function createRoute(){
    createTable();
    var port1 = depset[document.getElementById('portfrom').value];
    var port2 = desset[document.getElementById('portto').value];
    //var Center = [(port1._lng+port2._lng)/2,(port1._lat+port2._lat)/2];
    addMap([port1._lng,port1._lat]);
    locationList = [];
    addMarker([port1._lng,port1._lat],port1._name);
    addMarker([port2._lng,port2._lat],port2._name);
    addLine();
    document.getElementById('portfrom').disabled = true;
    document.getElementById('portto').disabled = true;
    document.getElementById('dep').disabled = true;
    document.getElementById('des').disabled = true;
}

// create area to display info after calculation
function createTable(){
    firstTime = true;
    var routeBody = document.getElementById('route');
    var infoTable = document.createElement('table');
    while (routeBody.firstChild) {
        routeBody.removeChild(routeBody.lastChild);
    }
    infoTable.setAttribute('class',"mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp");
    infoTable.innerHTML = '<thead><tr><th class="mdl-data-table__cell--non-numeric"> Ship </th><th> Distance </th><th>Cost</th><th>Time</th></tr></thead>';
    infoTable.innerHTML += '<tbody>';
    infoTable.innerHTML += `<tr><td class="mdl-data-table__cell--non-numeric"><select id="selectShip" onchange='getCostTime()'></select></td> <td id='distance'></td> <td id='cost'></td> <td id='time'></td> <td><button id='saveRoute' onclick='saveRoute()'>Continue</button></td> </tr>`;
    infoTable.innerHTML += '</tbody>'
    routeBody.appendChild(infoTable);
    document.getElementById('saveRoute').disabled = true;
}
        
// calculate range between destinations
function refreshTable(){
    var distance = getTotdistance();
    document.getElementById('distance').innerHTML = distance.toFixed(2)+'km';
    let lst = shiplist.getshiplist();
    shipID = document.getElementById('selectShip').value;
    if(firstTime || shipID == -1 || lst[shipID].getrange() < distance){
        var currentOpt = document.getElementById('selectShip').value;
        var shipOption = '<option value=-1>Select a Ship</option>';
        for(let i = 0;i<lst.length;i++){
            if(lst[i].getrange() >= distance && lst[i].getstatus() == 'available'){
                shipOption += `<option value="${i}">`
                shipOption += `${lst[i]._name}`
                shipOption += '</option>'
            }
        }
        document.getElementById('selectShip').innerHTML = shipOption;
        if(!firstTime && currentOpt != -1){
            window.alert('The ship selected does not have enough range for your current Route.')
        }
    }
    document.getElementById('cost').innerHTML = '';
    document.getElementById('time').innerHTML = '';
    document.getElementById('saveRoute').disabled = true;
    if(document.getElementById('selectShip').value != -1){
        getCostTime();
    }
    firstTime = false;
}

// calculate cost and time for route
function getCostTime(){
    
    if(document.getElementById('selectShip').value != -1){
        document.getElementById('saveRoute').disabled = false;
        var distance = getTotdistance();
        var aShip = shiplist.getshiplist()[document.getElementById('selectShip').value];
        var cost = distance*aShip.getcost();
        document.getElementById('cost').innerHTML = '$'+cost.toFixed(0);
        var time = distance/(aShip.getmaximumSpeed()*1.852);
        document.getElementById('time').innerHTML = time.toFixed(0) + 'hrs';
    }
    else{
        document.getElementById('saveRoute').disabled = true;
        document.getElementById('cost').innerHTML = '';
        document.getElementById('time').innerHTML = '';
    }
}
        
// display map with position
function addMap(Center){
    map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 3,
            center: Center
    })
    map.on('click', function(e) {
	   addMarker([e.lngLat.lng, e.lngLat.lat]);
       addLine();
    });
}
        
// add marker for position set and new position added by user
function addMarker(lnglat,name){
    if(name){
        var marker1 = new mapboxgl.Marker()
            .setLngLat(lnglat);
        marker1.setPopup(new mapboxgl.Popup().setHTML(`<p>${name}</p>`)) // add popup
    }
    else{
        var marker1 = new mapboxgl.Marker({color:'#FFA500'})
            .setLngLat(lnglat);
        marker1.setPopup(new mapboxgl.Popup().setHTML(`<p id='popup'>${lnglat[0].toFixed(2)},${lnglat[1].toFixed(2)}</p>`)) // add popup
    }
    marker1.getElement().addEventListener('click', handleKitten);
    marker1.addTo(map);
    markerList.push(marker1);
    marker1.getElement().value = markerList.indexOf(marker1);
    locationList.push(lnglat);
    if(locationList.length>2){
        temp = locationList[locationList.length - 1];
        locationList[locationList.length - 1] = locationList[locationList.length - 2];
        locationList[locationList.length - 2] = temp;
    }
}

// add line to every positions
function addLine(){
    if(locationList.length == 2){
        map.on('style.load', function() {
                dispRoute(locationList);
            });
    }
    else{
        map.removeLayer('route');
        map.removeSource('route');
        if(getDistance(locationList[locationList.length-3],locationList[locationList.length-2])>=100){
            dispRoute(locationList);
        }
        else{
            markerList.pop().remove(map);
            locationList[locationList.length-2] = locationList.pop();
            dispRoute(locationList);
            window.alert('The waypoint added must be more than 100km away from the previous one.')
        }
    }
}

// adjust map format
function dispRoute(n){
        map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': n
                    }
                }
            });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#088',
                'line-width': 8
            }
        });
    refreshTable();
}
        
// only allow user to input info of prt position after departure and destination are entered
function portValid(){
    var dep = document.getElementById('dep').value;
    var des = document.getElementById('des').value;
    if(dep != 'departure' && des != 'destination'){
        document.getElementById('portfrom').disabled = false;
        document.getElementById('portto').disabled = false;
    }
}

// create area to input value of start port
function depSet(){
    var dep = document.getElementById('dep').value;
    var lst = portlist.getportList();
    depset = [];
    for(let i=0;i < lst.length;i++){
        if(lst[i]._country == dep){
            depset.push(lst[i]);
        }
    }
    let output = '';
    document.getElementById('portfrom').innerHTML = '<option value="start">Start Port</option>';
    for(let i = 0;i < depset.length;i++){
        output += `<option value=${i}>${depset[i]._name}</option>`
    }
    document.getElementById('portfrom').innerHTML += output;
    document.getElementById('createRoute').disabled = true;
}

 // create area to input value of end port
function desSet(){
    var des = document.getElementById('des').value;
    var lst = portlist.getportList();
    desset = [];
    for(let i=0;i < lst.length;i++){
        if(lst[i]._country == des){
            desset.push(lst[i]);
        }
    }
    let output = '';
    document.getElementById('portto').innerHTML = '<option value="end">End Port</option>';
    for(let i = 0;i < desset.length;i++){
        output += `<option value=${i}>${desset[i]._name}</option>`
    }
    document.getElementById('portto').innerHTML += output;
    document.getElementById('createRoute').disabled = true;
}

// enable to button
function buttonValid(){
    var portFrom = document.getElementById('portfrom').value;
    var portTo = document.getElementById('portto').value;
    var date = document.getElementById('start').value;
    if(portFrom != 'start' && portTo != 'end' && date != ''){
        // unable to click on create port button before user input all require info
        document.getElementById('createRoute').disabled = false; 
    }
    else{
        // enable to click a button after all info is inputed
        document.getElementById('createRoute').disabled = true;
    }
}

// create save button and prompt of route name
function saveRoute(){
    // require confirmation from user
    if(confirm('Do you want to save this route?')){
        var name = window.prompt('Give a name for this route');
        var ship = shiplist.getshiplist()[document.getElementById('selectShip').value];
        var src = depset[document.getElementById('portfrom').value];
        var des = desset[document.getElementById('portto').value];
        var distance = getTotdistance();
        var cost = distance*ship.getcost();
        var time = distance/(ship.getmaximumSpeed()*1.852);
        var startDay = document.getElementById('start').value;
        // add info into route list
        routelist.addRoute(new Route(name, ship, src, des, distance, time, cost, startDay, locationList));
        // save info of route into local storage
        localStorage.setItem('routeList', JSON.stringify(routelist))
        // sent user to route list page
        location.replace('mainPage.html')
    }
    else{
        // allow user to delete route and refresh the page
        if(confirm('Do you want to delete the created route?')){
            location.reload();
        }
    }
}

// return distance
function getTotdistance(){
    var dis = 0;
    for(let i = 0;i < locationList.length -1;i++){
        dis += getDistance(locationList[i],locationList[i+1])
    }
    return dis
}

//calculate distance between potisions
function getDistance(loc1,loc2){
    var lon1 = loc1[0];
    var lon2 = loc2[0];
    var lat1 = loc1[1];
    var lat2 = loc2[1];
    var R = 6371; // kilometres
    var φ1 = lat1 * Math.PI/180; // φ, λ in radians
    var φ2 = lat2 * Math.PI/180;
    var Δφ = (lat2-lat1) * Math.PI/180;
    var Δλ = (lon2-lon1) * Math.PI/180;
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // in metres
}

// allow user to click on marker
function handleKitten(e){
    markerList[this.value].togglePopup();
    e.stopPropagation();
}