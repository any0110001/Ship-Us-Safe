var portlist = new portList();
var finalPortlist = new portList();
// and check whether there is respective data in local storage
portlist.loadFromLocal();
finalPortlist.loadFromLocal();

// allow browser to load URL in the background for port
var script = document.createElement('script');
script.src = "https://eng1003.monash/api/v1/ports/?callback=showSamplePort";
document.body.appendChild(script);
// get port samples
function showSamplePort(e){
    let lst = e.ports;
    for(let i = 0;i < lst.length;i++){
        finalPortlist.addPort(new Port(lst[i].name,lst[i].country,lst[i].type,lst[i].size,lst[i].locprecision,lst[i].lng, lst[i].lat))
    }
}

function Edit(num)// modify a certain ship
{
    localStorage.setItem('certainPort', JSON.stringify(portlist.getportList()[Number(num)]));//store the port to be edited to get this data across pages
    localStorage.setItem('certainPortId', JSON.stringify(Number(num)));// also store its index in the list for easier modification
    window.location.replace('createPort.html');// go to the createPort page
}

function Delete(num)// delete ports
{
    portlist.removePort(Number(num));// remove from the portlist
    finalPortlist.removePort(Number(num));
    localStorage.setItem('portList', JSON.stringify(portlist));
    refreshP();// update the display
}

function refreshP()// for updating the display
{
    var lstP = portlist.getportList();
    var lst2 = finalPortlist.getportList();
    var portListBody = document.getElementsByTagName('main')[0];
    // clear the page before updating
    while (portListBody.firstChild) {
    portListBody.removeChild(portListBody.lastChild);
    }
    for(let i = 0; i < lstP.length; i++){
        lstP[i].createPortArea(portListBody);
    }
    for(let i = lstP.length; i < lst2.length;i++){
        lst2[i].createPortAreaWithoutModify(portListBody);
    }
}