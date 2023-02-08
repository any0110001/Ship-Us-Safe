class Ship
{ 
    constructor(name, speed, range, description, cost, status, comments)
    {
    this._name = name
    this._maximumSpeed = speed
    this._range = range
    this._description = description
    this._cost = cost
    this._status = status
    this._comments = comments
   }
    getname()
    {
        return this._name
    }
    getmaximumSpeed()
    {
        return this._maximumSpeed
    }
    getrange()
    {
        return this._range
    }
    getdescription()
    {
        return this._description
    }
    getcost()
    {
        return this._cost
    }
    getstatus()
    {
        return this._status
    }
    getcomments()
    {
        return this._comments
    }
    modifyWithPro(name, speed, range, description, cost, status, comments)// modify the ship by inputing properties
    {
        this._name = name
        this._maximumSpeed = speed
        this._range = range
        this._description = description
        this._cost = cost
        this._status = status
        this._comments = comments
    }
    createShipArea(shipListBody)// create the display area and respective button for the ship
    {
        var num = shiplist._shiplist.indexOf(this);
        var output = ``;
        for(let i = 1; i < Object.keys(this).length; i++){
            output += `${Object.keys(this)[i].slice(1)}: ${this[Object.keys(this)[i]]}</br>`
        }
        // create area
        var node = document.createElement('div');
        node.setAttribute('id', `ship${num+1}`);
        node.setAttribute('class', "mdl-card mdl-shadow--2dp through mdl-shadow--16dp");
        node.setAttribute('style', 'margin: 1em;width:50%')
        shipListBody.appendChild(node);
        document.getElementById(`ship${num+1}`).innerHTML = `<div class="mdl-card__title"><h2 class="mdl-card__title-text">Ship ${num+1}(user-defined): ${this._name}</h2></div>`;
        document.getElementById(`ship${num+1}`).innerHTML += `<div class="mdl-card__supporting-text">${output} </div>`;
        // create delete button
        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', `deleteship${num+1}`);
        deleteButton.setAttribute('class', "mdl-button mdl-js-button mdl-button--raised mdl-button--colored");
        deleteButton.setAttribute('style', 'margin: 1em;width: 35%');
        deleteButton.setAttribute('value', num);
        deleteButton.setAttribute('onclick', 'Delete(this.value)');
        document.getElementById(`ship${num+1}`).appendChild(deleteButton);
        document.getElementById(`deleteship${num+1}`).innerHTML = `Delete Ship ${num+1}`;
        // create edit button
        var editButton = document.createElement('button');
        editButton.setAttribute('id', `editship${num+1}`);
        editButton.setAttribute('class', "mdl-button mdl-js-button mdl-button--raised mdl-button--colored");
        editButton.setAttribute('style', 'margin: 1em;width: 35%');
        editButton.setAttribute('value', num);
        editButton.setAttribute('onclick', 'Edit(this.value)');
        document.getElementById(`ship${num+1}`).appendChild(editButton);
        document.getElementById(`editship${num+1}`).innerHTML = `Edit Ship ${num+1}`;
    }
    createShipAreaWithoutModify(shipListBody)// create the display area and respective button for the ship
    {
        var num = finalShiplist._shiplist.indexOf(this);
        var output = ``;
        for(let i = 1; i < Object.keys(this).length; i++){
            output += `${Object.keys(this)[i].slice(1)}: ${this[Object.keys(this)[i]]}</br>`
        }
        // create area
        var node = document.createElement('div');
        node.setAttribute('id', `ship${num+1}`);
        node.setAttribute('class', "mdl-card mdl-shadow--2dp through mdl-shadow--16dp");
        node.setAttribute('style', 'margin: 1em;width: 50%')
        shipListBody.appendChild(node);
        document.getElementById(`ship${num+1}`).innerHTML = `<div class="mdl-card__title"><h2 class="mdl-card__title-text">Ship ${num+1}(sourced): ${this._name}</h2></div>`;
        document.getElementById(`ship${num+1}`).innerHTML += `<div class="mdl-card__supporting-text">${output} </div>`;
    }
}

class Port
{
    constructor(name, country, type, size, location, lng, lat)
    {
        this._name = name
        this._country = country
        this._type = type
        this._size = size
        this._location = location
        this._lng = lng
        this._lat = lat
    }

    getcountry()
    {
        return this._country
    }
    getname()
    {
        return this._name
    }
    gettype()
    {
        return this._type
    }
    getsize()
    {
        return this._size
    }
    getlocation()
    {
        return this._location
    }
    getlng()
    {
        return this._lng
    }
    getsize()
    {
        return this._lat
    }
    
        modifyWithPro(name, country, type, size, location, lng, lat)// modify the ship by inputing properties
    {
        this._name = name
        this._country = country
        this._type = type
        this._size = size
        this._location = location
        this._lng = lng
        this._lat = lat
    }
        createPortArea(portListBody)// create the display area and respective button for the port
    {
        var num = portlist._portlist.indexOf(this);
        var output = ``;
        for(let i = 1; i < Object.keys(this).length; i++){
            output += `${Object.keys(this)[i].slice(1)}: ${this[Object.keys(this)[i]]}</br>`
        }
        // create area
        var node = document.createElement('div');
        node.setAttribute('id', `port${num+1}`);
        node.setAttribute('class', "mdl-card mdl-shadow--2dp through mdl-shadow--16dp");
        node.setAttribute('style', 'margin: 1em;width:50%')
        portListBody.appendChild(node);
        document.getElementById(`port${num+1}`).innerHTML = `<div class="mdl-card__title"><h2 class="mdl-card__title-text">Port ${num+1}(user-defined): ${this._name}</h2></div>`;
        document.getElementById(`port${num+1}`).innerHTML += `<div class="mdl-card__supporting-text">${output} </div>`;
        // create delete button
        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', `deleteship${num+1}`);
        deleteButton.setAttribute('class', "mdl-button mdl-js-button mdl-button--raised mdl-button--colored");
        deleteButton.setAttribute('style', 'margin: 1em;width: 35%');
        deleteButton.setAttribute('value', num);
        deleteButton.setAttribute('onclick', 'Delete(this.value)');
        document.getElementById(`port${num+1}`).appendChild(deleteButton);
        document.getElementById(`deleteship${num+1}`).innerHTML = `Delete Port ${num+1}`;
        // create edit button
        var editButton = document.createElement('button');
        editButton.setAttribute('id', `editship${num+1}`);
        editButton.setAttribute('class', "mdl-button mdl-js-button mdl-button--raised mdl-button--colored");
        editButton.setAttribute('style', 'margin: 1em;width: 35%');
        editButton.setAttribute('value', num);
        editButton.setAttribute('onclick', 'Edit(this.value)');
        document.getElementById(`port${num+1}`).appendChild(editButton);
        document.getElementById(`editship${num+1}`).innerHTML = `Edit Port ${num+1}`;
    }
    
        createPortAreaWithoutModify(portListBody)// create the display area and respective button for the port
    {
        var num = finalPortlist._portlist.indexOf(this);
        var output = ``;
        for(let i = 1; i < Object.keys(this).length; i++){
            output += `${Object.keys(this)[i].slice(1)}: ${this[Object.keys(this)[i]]}</br>`
        }
        // create area
        var node = document.createElement('div');
        node.setAttribute('id', `port${num+1}`);
        node.setAttribute('class', "mdl-card mdl-shadow--2dp through mdl-shadow--16dp");
        node.setAttribute('style', 'margin: 1em;width:50%')
        portListBody.appendChild(node);
        document.getElementById(`port${num+1}`).innerHTML = `<div class="mdl-card__title"><h2 class="mdl-card__title-text">Port ${num+1}(sourced): ${this._name}</h2></div>`;
        document.getElementById(`port${num+1}`).innerHTML += `<div class="mdl-card__supporting-text">${output} </div>`;
    }
}

class Route
{
    constructor(name, ship, sourcePort, destinationPort, distance, time, cost, startDay, wayPointList)
    {
        this._name = name
        this._ship = ship
        this._srcPort = sourcePort
        this._desPort = destinationPort
        this._distance = distance
        this._time = time
        this._cost = cost 
        this._startDay = startDay 
        this._wayPointList = wayPointList     
    }
    getname()
    {
        return this._name
    }
    getship()
    {
        return this._ship
    }
    getsourcePort()
    {
        return this._srcPort
    }
    getdestinationPort()
    {
        return this._desPort
    }
    getdistance()
    {
        return this._distance
    }
    gettime()
    {
        return this._time
    }
    getcost()
    {
        return this._cost
    }
    getstartDay()
    {
        var temp = this._startDay.split('-');
        return temp[2]+'/'+temp[1]+'/'+temp[0];
    }
    getwayPointList()
    {
        return this._wayPointList
    }
    postponeTo(date){
        this._startDay = date;
    }
}

class shipList
{
    constructor()
    {
        this._shiplist = []
    }
    addShip(ship)
    {
        this._shiplist.push(ship)
    }
    getshiplist()
    {
        return this._shiplist
    }
    clearList()
    {
        this._shiplist = []    
    }
    removeShip(num)
    {
        var temp = [];
        for(let i = 0;i < this._shiplist.slice(0,num).length;i++){
            temp.push(this._shiplist.slice(0,num)[i]);
        }
        for(let i = 0;i < this._shiplist.slice(num+1).length;i++){
            temp.push(this._shiplist.slice(num+1)[i]);
        }
        this._shiplist = temp;
    }
    loadFromLocal(){
        if(typeof(Storage) !== undefined){
            // and check whether there is respective data in local storage
            if(localStorage.getItem('shipList'))
            {   // load the data in to the new shiplist
                var PDO = JSON.parse(localStorage.getItem('shipList'));
                for(let i = 0; i < PDO._shiplist.length; i++){
                    var lst = PDO._shiplist;
                    this.addShip(new Ship(lst[i]._name, lst[i]._maximumSpeed, lst[i]._range, lst[i]._description, lst[i]._cost,   lst[i]._status, lst[i]._comments))
                }
            }
        }
        else{
            window.alert('This app is not supported in this broswer');
        }
    }
}

class portList
{
    constructor()
    {
        this._portlist = []
    }
    addPort(port)
    {
        this._portlist.push(port)
    }
    clearList()
    {
        this._portlist = []
    }
    getportList()
    {
        return this._portlist
    }
        removePort(numP)
    {
        var tempP = [];
        for(let i = 0;i < this._portlist.slice(0,numP).length;i++){
            tempP.push(this._portlist.slice(0,numP)[i]);
        }
        for(let i = 0;i < this._portlist.slice(numP+1).length;i++){
            tempP.push(this._portlist.slice(numP+1)[i]);
        }
        this._portlist = tempP;
    }
    loadFromLocal(){
        if(typeof(Storage) !== undefined){
            // and check whether there is respective data in local storage
            if (localStorage.getItem("portList")) 
            {
                var storeP = JSON.parse(localStorage.getItem('portList'))
                for(let i=0;i<storeP._portlist.length;i++)
                {
                    var listP = storeP._portlist
                    this.addPort(new Port(listP[i]._name, listP[i]._country, listP[i]._type, listP[i]._size, listP[i]._location, listP[i]._lng, listP[i]._lat,))
                }
            }
        }
        else{
            window.alert('This app is not supported in this browser')
        }
    }
}

class routeList
{
    constructor()
    {
        this._routelist = []
    }
    addRoute(route)
    {
        this._routelist.push(route)
    }
    clearList()
    {
        this._routelist = []
    }
    getrouteList()
    {
        return this._routelist
    }
        removeroute(num)
    {
        var temp = [];
        for(let i = 0;i < this._routelist.slice(0,num).length;i++){
            temp.push(this._routelist.slice(0,num)[i]);
        }
        for(let i = 0;i < this._routelist.slice(num+1).length;i++){
            temp.push(this._routelist.slice(num+1)[i]);
        }
        this._routelist = temp;
    }
    sortList() // sort by the start date
    {
        for(let i = 1; i < this._routelist.length; i++){
            let j = i;
            while(j > 0 && this._routelist[j - 1].getstartDay() > this._routelist[j].getstartDay()){
                let temp = this._routelist[j - 1];
                this._routelist[j - 1] = this._routelist[j];
                this._routelist[j] = temp;
                j = j - 1;
            }
        }
    }
    loadFromLocal(){
        if(typeof(Storage) !== undefined){
            // get data of port,ship and route from local storage
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
        }
        else{
            window.alert('This app is not supported in this browser');
        }
    }
}