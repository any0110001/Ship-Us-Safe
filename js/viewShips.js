function Edit(num)// modify a certain ship
{
    localStorage.setItem('certainShip', JSON.stringify(shiplist.getshiplist()[Number(num)]));//store the ship to be edited to get this data across pages
    localStorage.setItem('certainShipId', JSON.stringify(Number(num)));// also store its index in the list for easier modification
    window.location.replace('createShip.html');// go to the createShip page
}

function Delete(num)// delete ships
{
    shiplist.removeShip(Number(num));// remove from the shiplist
    finalShiplist.removeShip(Number(num));// remove from the shiplist
    localStorage.setItem('shipList', JSON.stringify(shiplist));
    refresh();// update the display
}

function refresh()// for updating the display
{
    var lst = shiplist.getshiplist();
    var lst2 = finalShiplist.getshiplist();
    var shipListBody = document.getElementsByTagName('main')[0];
    // clear the page before updating
    while (shipListBody.firstChild) {
    shipListBody.removeChild(shipListBody.lastChild);
    }
    for(let i = 0; i < lst.length; i++){
        lst[i].createShipArea(shipListBody);
    }
    for(let i = lst.length;i < lst2.length; i++){
        lst2[i].createShipAreaWithoutModify(shipListBody);
    }
}

