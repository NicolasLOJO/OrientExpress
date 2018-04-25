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
        success: function(data) {
            if(data.length === 0){
                $('#seeOneCard').append('<option class=myoption value=blank>Acune carte</option>');
            } else {
                for(let i in data){
                    $('#seeOneCard').append('<option class=myoption data-id='+ data[i].id +' value="'+ data[i].nom +'">'+ data[i].nom +'</option>');
                }
            }
        }
    });

    $('#viewid').on('click', function(){
        $('.mypview').remove();
        var id = $('#seeOneCard option:selected').data('id');
        $.ajax({
            url:'http://localhost:4000/cartes/'+ id +'/get',
            success: function(data){
                console.log(data);
                $('#listecarte').append('<p class=mypview id=nomcarte></p>');
                $('#nomcarte').text(data.nom);
                for(let k in data.menus){
                    $('#listecarte').append("<p class=mypview id=numeromenu >Id du menu : "+data.menus[k].id+"</p><p id=nommenu class=mypview>Nom du menu : "+data.menus[k].nom+"</p><p id=nomentree class=mypview>Entrée : " + data.menus[k].entree.nom+"</p><p id=prixentree class=mypview>Prix de l'entrée : "+ data.menus[k].entree.prix + "€</p><p id=nomplat class=mypview>Nom du plat : "+ data.menus[k].plat.nom+"</p><p id=prixplat class=mypview>Prix du plat : "+ data.menus[k].plat.prix + "€</p><p id=nomdessert class=mypview>Nom du dessert : "+ data.menus[k].dessert.nom+"</p><p id=prixdessert class=mypview>Prix du dessert : "+ data.menus[k].dessert.prix + "€</p>");
                }
            },
            error: function(res, stat, err){

            }
        })
    });
    if(!is_connected) {
        location = 'connexion.html';
    }
});        