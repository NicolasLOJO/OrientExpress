$(document).ready(function() {
var is_connected = Cookies.get('connected');
var user = Cookies.get('user');
    $('#bonjour').html('Bienvenue ' + user);
    $("#leftside-navigation .sub-menu > a").click(function(e) {
        $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
        e.stopPropagation()
    });
    $.ajax({
        url:'http://localhost:4000/cartes/get',
        success: function(data){
            if(data.message){
                $('#card').html('Cartes :<br>' + data.message);
                $('#menu').html('Menus :<br> Pas de menu');
            } else if(data.length === 1){
                $('#card').html('Cartes :<br> Il y a <br><strong><em>' + data.length + '</em></strong><br> carte');
            } else if(data.length >= 1){
                $('#card').html('Cartes :<br> Il y a <br><strong><em>' + data.length + '</em></strong><br> cartes');
            }
            let nbrMenu = 0;
            for(let i in data){
                for(let k in data[i].menus){
                    nbrMenu++;
                }
            }
            if(nbrMenu <= 0) {
                $('#menu').html('Menus :<br> Pas de menu');
            } else if(nbrMenu === 1) {
                $('#menu').html('Menus :<br> Il y a <br><strong><em>' + nbrMenu + '</em></strong><br> menu');
            } else if(nbrMenu > 1) {
                $('#menu').html('Menus :<br> Il y a <br><strong><em>' + nbrMenu + '</em></strong><br> menus');
            }
        }
    })
    if(!is_connected){
        location = "asset/page/connexion.html";
    }
});