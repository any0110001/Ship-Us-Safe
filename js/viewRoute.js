mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aG9ueWFiYiIsImEiOiJja2N5ZXFnM3EwOTZmMnlxZWFnOHhtNm1tIn0.xH2RbWZWbHvAAZvD873b-g';
var routelist = new routeList();
// get data of ship, port and routes from local storage
if(localStorage.getItem('routeList'))
{   // load the data in to the new shiplist
    var PDO = JSON.parse(localStorage.getItem('routeList'));
    for(let i = 0; i < PDO._routelist.length; i++){
        var lst = PDO._routelist;
        var shipPro = lst[i]._ship;
        var ship = new Ship(shipPro._name, shipPro._maximumSpeed, shipPro._range, shipPro._description, shipPro._cost,   shipPro._status, shipPro._comments);
        var desPortPro = lst[i]._desPort;
        var desPort = new Port(desPortPro._name, desPortPro._country, desPortPro._type, desPortPro._size, desPortPro._location, desPortPro._lng, desPortPro._lat);
        var srcPortPro = lst[i]._srcPort;
        var srcPort = new Port(srcPortPro._name, srcPortPro._country, srcPortPro._type, srcPortPro._size, srcPortPro._location, srcPortPro._lng, srcPortPro._lat);
        routelist.addRoute(new Route(lst[i]._name, ship, srcPort, desPort, lst[i]._distance, lst[i]._time, lst[i]._cost, lst[i]._startDay, lst[i]._wayPointList));
    }
}
routelist.sortList();
if (typeof(Storage) !== undefined){
    var i = localStorage.getItem('certainRoute')
}
else{
    window.alert('This app is not supported in this browser');
}
var route = routelist.getrouteList()[i]
var locationList = route.getwayPointList();
addMap(locationList[0]);
// add marker by name
for(let j = 0; j < locationList.length; j++){
    if(j==0){
        addMarker(locationList[j],route.getsourcePort().getname())
    }
    else if(j==locationList.length - 1){
        addMarker(locationList[j],route.getdestinationPort().getname())
    }
    else{
        addMarker(locationList[j])
    }
}
addLine();
createTable();

// create area to display info of route
function createTable(){
    var routeBody = document.getElementById('info');
    var infoTable = document.createElement('table');
    while (routeBody.firstChild) {
        routeBody.removeChild(routeBody.lastChild);
    }
    infoTable.setAttribute('class',"mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp");
    infoTable.innerHTML = '<thead><tr><th class="mdl-data-table__cell--non-numeric"> Ship </th><th> Distance </th><th>Cost</th><th>Time</th><th>Start Date</th></tr></thead>';
    infoTable.innerHTML += '<tbody>';
    // display area with data of time, cost, start day
    infoTable.innerHTML += `<tr><td class="mdl-data-table__cell--non-numeric">${route.getship().getname()}</td> <td id='distance'>${route.getdistance().toFixed(2)}km</td> <td id='cost'>${route.getcost().toFixed(1)} dollar</td> <td id='time'>${route.gettime().toFixed(0)} days</td> <td>${route.getstartDay()}</td>`
    // add calendar to postpone the departure
    if(localStorage.getItem('routeType') != 3){
        infoTable.innerHTML += `<td><input type="date" id="postpone" name="trip-start" min="${getValidDay()}" max="" onchange='validDate()'></td><td><button id='postponeB' onclick='postpone()'>Postpone</button></td>` ;
    }
    // display delete button of route
    infoTable.innerHTML += `<td><button onclick='Delete()'>Delete this route</button></td> </tr>`;
    infoTable.innerHTML += '</tbody>'
    routeBody.appendChild(infoTable);
    if(document.getElementById('postponeB')){
        document.getElementById('postponeB').disabled = true;
    }
}

// display Map
function addMap(Center){
    map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 3,
            center: Center
    })
}

//add marker into map
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
    marker1.addTo(map);
}

// add line between 2 destination for route
function addLine(){
    map.on('style.load', function() {
                dispRoute(locationList);
        });
}

// formatting the map
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
}

// add delete button
function Delete(){
    if(confirm('Are you sure to delete this route?')){
        routelist.removeroute(i);
        if (typeof(Storage) !== undefined){
            localStorage.setItem('routeList', JSON.stringify(routelist));
        }
        else{
            window.alert('This app is not supported in this browser');
        }
        // sent user back to route list
        location.replace('mainPage.html');
    }
}

// add postpone button
function postpone(){
    if(confirm(`Are you sure to postpone to ${document.getElementById('postpone').value}`)){
        var date = document.getElementById('postpone').value;
        route.postponeTo(date);
        if (typeof(Storage) !== undefined){
            localStorage.setItem('routeList', JSON.stringify(routelist));
        }
        else{
            window.alert('This app is not supported in this browser');
        }
         // sent user back to route list
        location.replace('mainPage.html');
    }
}

// only enable postpone button if user select postpone day in calendar
function validDate(){
    if(document.getElementById('postponeB')){
        document.getElementById('postponeB').disabled = false;
    }
}

function getValidDay(){
    return route._startDay;
}