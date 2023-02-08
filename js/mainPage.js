var routelist = new routeList();
routelist.loadFromLocal(); // load data from local storage

// get current time
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

function getInfo(){
    routelist.sortList(); // sort the list by start date
    if(localStorage.getItem('routeType'))
    {
        type = Number(localStorage.getItem('routeType'))
        if(type == 1){
            type1();
        }
        else if(type == 2){
            type2();
        }
        else if(type == 3){
            type3();
        }
    }
    else{
        type1();
    }
}

// separate day, month and year
function getDayNum(day){
    var temp = day.split('/');
    return Number(temp[0]) + Number(temp[1])*30 + Number(temp[2])*365;
}

// calculating the number of days between day set and current day
function timeGap(day){
    return getDayNum(day) - getDayNum(today);
}

// calculate and display the present routes
function type1(){
    var lst = routelist.getrouteList();
    var table = document.getElementById('table');
    var output = '<tr><td class= "full-width mdl-data-table__cell--non-numeric"> Ongoing Trips</td></tr>';
    var routeDisplayed = 0;
    for(let i = 0; i < lst.length; i++){
        let gap = timeGap(lst[i].getstartDay());
        if( gap < 3 && gap > 0){
            output += "<tr><td onmousedown=\"listRowTapped("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" +lst[i].getname() + ' (' + lst[i].getsourcePort().getname() + " &rarr; " + lst[i].getdestinationPort().getname() +')';
            output += "<div class='subtitle'>"+ 'Cost: $' + lst[i].getcost().toFixed(1) + '----Distance: ' + lst[i].getdistance().toFixed(2) + 'km' + '----Duration: ' + lst[i].gettime().toFixed(0) + 'days' +'----Start Date: ' + lst[i].getstartDay() + "</div></td></tr>";
            routeDisplayed += 1;
        }
    }
    if(routeDisplayed == 0){
        output += "<tr><td class=\"full-width mdl-data-table__cell--non-numeric\">There is no Ongoing Trip</td></tr>";
    }
    table.innerHTML = output;
}

// calculate and display future routes
function type2(){
    var lst = routelist.getrouteList();
    var table = document.getElementById('table');
    var output = "<tr><td class= \"full-width mdl-data-table__cell--non-numeric\"> Upcoming Trips</td></tr>";
    var routeDisplayed = 0;
    for(let i = 0; i < lst.length; i++){
        let gap = timeGap(lst[i].getstartDay());
        if( gap >= 3){
            output += "<tr><td onmousedown=\"listRowTapped("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" +lst[i].getname() + ' (' + lst[i].getsourcePort().getname() + " &rarr; " + lst[i].getdestinationPort().getname() +')';
            output += "<div class='subtitle'>"+ 'Cost: $' + lst[i].getcost().toFixed(1) + '----Distance: ' + lst[i].getdistance().toFixed(2) + 'km' + '----Duration: ' + lst[i].gettime().toFixed(0) + 'days' + '----Start Date: ' + lst[i].getstartDay() + "</div></td></tr>";
            routeDisplayed += 1;
        }
    }
    if(routeDisplayed == 0){
        output += "<tr><td class=\"full-width mdl-data-table__cell--non-numeric\">There is no Upcoming Trip</td></tr>";
    }
    table.innerHTML = output;
}

// calculate and display past routes
function type3(){
    var lst = routelist.getrouteList();
    var table = document.getElementById('table');
    var output = "<tr><td class= \"full-width mdl-data-table__cell--non-numeric\"> Past Trips</td></tr>";
    var routeDisplayed = 0;
    for(let i = 0; i < lst.length; i++){
        let gap = timeGap(lst[i].getstartDay());
        if(gap < 0){
            output += "<tr><td onmousedown=\"listRowTapped("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" +lst[i].getname() + ' (' + lst[i].getsourcePort().getname() + " &rarr; " + lst[i].getdestinationPort().getname() +')';
            output += "<div class='subtitle'>"+ 'Cost: $' + lst[i].getcost().toFixed(1) + '----Distance: ' + lst[i].getdistance().toFixed(2) + 'km' + '----Duration: ' + lst[i].gettime().toFixed(0) + 'days' + '----Start Date: ' + lst[i].getstartDay() + "</div></td></tr>";
            routeDisplayed += 1;
        }
    }
    if(routeDisplayed == 0){
        output += "<tr><td class=\"full-width mdl-data-table__cell--non-numeric\">There is no Past Trip</td></tr>";
    }
    table.innerHTML = output;
}

// allow user to view their route
function listRowTapped(i){
    localStorage.setItem('certainRoute', i);
    location.replace('viewRoute.html');
}

// save current route into local storage
function onGoing()
{
    localStorage.setItem('routeType', 1);
}

// save future route into local storage
function upComing()
{
    localStorage.setItem('routeType', 2);
}

//save past route into local storage
function past()
{
    localStorage.setItem('routeType', 3);
}