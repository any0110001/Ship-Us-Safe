// everytime this file loaded, create a new portlist
var portlist = new portList()
portlist.loadFromLocal();
var latP, lngP;
document.getElementById('createPort').disabled = true;
document.getElementById('modifyP').disabled = true;
var modifying = false;
if(typeof(Storage) !== undefined){
    // also check for whether there is a certain ship to be edited
    if(localStorage.getItem('certainPort'))
    {
        var port = JSON.parse(localStorage.getItem('certainPort'))
        document.getElementById('places').defaultValue = port._name
        document.getElementByValue('countries').defaultValue = port._country
        document.getElementById('types').defaultValue = port._type
        document.getElementById('sizes').defaultValue = port._size
        document.getElementById('locate').defaultValue = port._location
        modifying = true
        localStorage.removeItem('certainPort')
        var modifiedPortId = JSON.parse(localStorage.getItem('certainPortId'));
        // after modifying the port, remove trash data from the local storage
        localStorage.removeItem('certainPort');
        localStorage.removeItem('certainPortId');
    }
}
else{
    window.alert('This app is bot supported in this browser');
}

// create a button for apps to identify info after inputed by user
function verify(){
    if(document.getElementById('places').value == '' || document.getElementById('countries').value == 'Country'){
        window.alert('Please enter the Name and select the Country')
    }
    else{
        var name = document.getElementById('places').value;
        var country = document.getElementById('countries').value;
        var script = document.createElement('script');
        // info is inputed to the URL and load it on web
        script.src = `https://api.opencagedata.com/geocode/v1/json?q=${name},${country}&key=ed1c5851cfbb4a15a17d2269239479c2&callback=showPort&language=en&pretty=1`;
        document.body.appendChild(script);
        var spinner = document.createElement('div');
        spinner.setAttribute('class', "mdl-spinner mdl-js-spinner is-active");
        document.getElementsByTagName('main')[0].appendChild(spinner);
    }
}

// receiving value entered by user
function createPort()
{
    var name = document.getElementById('places').value
    var country = document.getElementById('countries').value
    var type = document.getElementById('types').value
    if(type == ''){
        type = 'Unknown';
    }
    var size = document.getElementById('sizes').value 
    if(size == ''){
        size = 'Unknown';
    }
    var location = document.getElementById('locate').value
    if(location == ''){
        location = 'Unknown';
    }
    var aPort = new Port(name, country, type, size, location, lngP, latP)
    portlist.addPort(aPort)
    // store it into local storage
    localStorage.setItem('portList', JSON.stringify(portlist))
    // open port list
    window.location.replace('viewPorts.html')
}

// return longitude and latitude from URL
function showPort(result){
    latP = result.results[0].geometry.lat
    lngP =result.results[0].geometry.lng
    // enable createPort button after getting location
    document.getElementById('createPort').disabled = false;
    if(modifying){
        document.getElementById('modifyP').disabled = false
    }
    document.getElementsByTagName('main')[0].removeChild(document.getElementsByTagName('main')[0].lastChild);
}

function modifyPort()// modify the certain port
{
    var name = document.getElementById('places').value
    var country = document.getElementById('countries').value
    var type = document.getElementById('types').value 
    var size = document.getElementById('sizes').value 
    var location = document.getElementById('locate').value 
    // get information for the port from user
    portlist._portlist[modifiedPortId].modifyWithPro(name, country, type, size, location, lngP, latP);// modify the certain port
    localStorage.setItem('portList', JSON.stringify(portlist));// update the data in the local storage
    window.location.replace('viewPorts.html');// go to viewPort page
}

//unable create button  and modify button
function reDisabled(){
    document.getElementById('modifyP').disabled = true;
    document.getElementById('createPort').disabled = true;
}