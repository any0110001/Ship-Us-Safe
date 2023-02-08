// everytime this file loaded, create a new shiplist
var shiplist = new shipList();
shiplist.loadFromLocal(); // load data from local storage
var finalShiplist = new shipList();
finalShiplist.loadFromLocal(); // load data from local storage

 // also check for whether there is a certain ship to be edited
if(typeof(Storage) !== undefined){
    if(localStorage.getItem('certainShip'))
    {   // get the data for the certain ship and set them ad the default value for the input boxes
        var ship = JSON.parse(localStorage.getItem('certainShip'));
        document.getElementById('name').defaultValue = ship._name;
        document.getElementById('speed').defaultValue = ship._maximumSpeed;
        document.getElementById('range').defaultValue = ship._range;
        document.getElementById('cost').defaultValue = ship._cost;
        document.getElementById('description').defaultValue = ship._description;
        document.getElementById('modify').disabled = false;
        // modify the ship
        var modifiedShipId = JSON.parse(localStorage.getItem('certainShipId'));
        // after modifying the ship, remove trash data from the local storage
        localStorage.removeItem('certainShip');
        localStorage.removeItem('certainShipId');
    }
}
else{
    window.alert('This app is not supported in this browser');
}

// allow browser to load URL in the background for port
var script = document.createElement('script');
script.src = 'https://eng1003.monash/api/v1/ships/?callback=showSampleShip';
document.head.appendChild(script);
// get ship samples
function showSampleShip(e){
    let lst = e.ships;
    for(let i = 0;i < lst.length;i++){
        finalShiplist.addShip(new Ship(lst[i].name,lst[i].maxSpeed,lst[i].range,lst[i].desc,lst[i].cost,lst[i].status, lst[i].comments))
    }
}



function createShip()// create a new ship
{
    // get information for ships from user
    var name = document.getElementById("name").value;
    var speed = Number(document.getElementById("speed").value);
    var range = Number(document.getElementById("range").value);
    var description = document.getElementById("description").value;
    var cost = Number(document.getElementById("cost").value);
    
    var aShip = new Ship(name, speed, range, description, cost, 'available', '');// create new ship
    shiplist.addShip(aShip);// add ship into shiplist
    localStorage.setItem('shipList', JSON.stringify(shiplist));// update the data in local storage
    
    window.location.replace('viewShips.html');// go to viewShip page

}

function modifyShip()// modify the certain ship
{
    // get information for the ship from user
    var name = document.getElementById("name").value;
    var speed = Number(document.getElementById("speed").value);
    var range = Number(document.getElementById("range").value);
    var description = document.getElementById("description").value;
    var cost = Number(document.getElementById("cost").value);
    
    shiplist.getshiplist()[modifiedShipId].modifyWithPro(name, speed, range, description, cost, "available", '');// modify the certain ship
    
    localStorage.setItem('shipList', JSON.stringify(shiplist));// update the data in the local storage
    
    window.location.replace('viewShips.html');// go to viewShip page
}

// validate the input
function checkValid(){
    var speedValid = document.getElementById('speed').validity.valid;
    var rangeValid = document.getElementById('range').validity.valid;
    var costValid = document.getElementById('cost').validity.valid;
    if(speedValid && rangeValid && costValid){
        document.getElementById('create').disabled = false;
    }
    else{
        document.getElementById('create').disabled = true;
    }
}