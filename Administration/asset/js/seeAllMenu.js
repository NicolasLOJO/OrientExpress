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
            for(let i in data){
                $('#listecarte').append("<h5 class=toDel><strong>Dans la carte : "+ data[i].nom+"</strong></h5>");
                for(let k in data[i].menus){
                    $('#listecarte').append("<p class=mypview id=numeromenu >Id du menu : "+data[i].menus[k].id+"</p><p id=nommenu class=mypview>Nom du menu : <em>"+data[i].menus[k].nom+"</em></p><p id=nomentree class=mypview>Entrée : " + data[i].menus[k].entree.nom+"</p><p id=prixentree class=mypview>Prix de l'entrée : "+ data[i].menus[k].entree.prix + "€</p><p id=nomplat class=mypview>Nom du plat : "+ data[i].menus[k].plat.nom+"</p><p id=prixplat class=mypview>Prix du plat : "+ data[i].menus[k].plat.prix + "€</p><p id=nomdessert class=mypview>Nom du dessert : "+ data[i].menus[k].dessert.nom+"</p><p id=prixdessert class=mypview>Prix du dessert : "+ data[i].menus[k].dessert.prix + "€</p>");
                    $('#seeAllMenu').append('<option class=myoption data-id='+ data[i].menus[k].id +' value="'+ data[i].menus[k].nom +'">'+ data[i].menus[k].nom +'</option>');
                }
            }
        },
        error: function(res, stat, err){

        }
    })

    $.ajax({
        url:'http://localhost:4000/cartes/get',
        success: function(data){
            for(let i in data){
                $('#delAllMenu').append('<option class=myoption data-id='+ data[i].id +' value="'+ data[i].nom +'">'+ data[i].nom +'</option>');
            }
        }
    })

    $('#viewdel').on('click', function(){
        var id = $('#delAllMenu option:selected').data('id');
        $('.mypview').remove();
        $('.toDel').remove();
        $('.myoption').remove();
        $.ajax({
            type: 'DELETE',
            url:'http://localhost:4000/cartes/menus/'+ id +'/remove',
            success: function(data){
                $.ajax({
                    url:'http://localhost:4000/cartes/get',
                    success: function(data){
                        for(let i in data){
                            $('#listecarte').append("<h5 class=toDel><strong>Dans la carte : "+ data[i].nom+"</strong></h5>");
                            for(let k in data[i].menus){
                                $('#listecarte').append("<p class=mypview id=numeromenu >Id du menu : "+data[i].menus[k].id+"</p><p id=nommenu class=mypview>Nom du menu : <em>"+data[i].menus[k].nom+"</em></p><p id=nomentree class=mypview>Entrée : " + data[i].menus[k].entree.nom+"</p><p id=prixentree class=mypview>Prix de l'entrée : "+ data[i].menus[k].entree.prix + "€</p><p id=nomplat class=mypview>Nom du plat : "+ data[i].menus[k].plat.nom+"</p><p id=prixplat class=mypview>Prix du plat : "+ data[i].menus[k].plat.prix + "€</p><p id=nomdessert class=mypview>Nom du dessert : "+ data[i].menus[k].dessert.nom+"</p><p id=prixdessert class=mypview>Prix du dessert : "+ data[i].menus[k].dessert.prix + "€</p>");
                                $('#seeAllMenu').append('<option class=myoption data-id='+ data[i].menus[k].id +' value="'+ data[i].menus[k].nom +'">'+ data[i].menus[k].nom +'</option>');
                            }
                        }
                    },
                    error: function(res, stat, err){
            
                    }
                })
            }
        });
    });

    $('#viewid').on('click', function(){
        var id = $('#seeAllMenu option:selected').data('id');
        $('.mypview').remove();
        $('.toDel').remove();
        $('.myoption').remove();
        $.ajax({
            type: 'DELETE',
            url:'http://localhost:4000/cartes/menus/remove/'+ id,
            success: function(data){
                $.ajax({
                    url:'http://localhost:4000/cartes/get',
                    success: function(data){
                        for(let i in data){
                            $('#listecarte').append("<h5 class=toDel><strong>Dans la carte : "+ data[i].nom+"</strong></h5>");
                            for(let k in data[i].menus){
                                $('#listecarte').append("<p class=mypview id=numeromenu >Id du menu : "+data[i].menus[k].id+"</p><p id=nommenu class=mypview>Nom du menu : <em>"+data[i].menus[k].nom+"</em></p><p id=nomentree class=mypview>Entrée : " + data[i].menus[k].entree.nom+"</p><p id=prixentree class=mypview>Prix de l'entrée : "+ data[i].menus[k].entree.prix + "€</p><p id=nomplat class=mypview>Nom du plat : "+ data[i].menus[k].plat.nom+"</p><p id=prixplat class=mypview>Prix du plat : "+ data[i].menus[k].plat.prix + "€</p><p id=nomdessert class=mypview>Nom du dessert : "+ data[i].menus[k].dessert.nom+"</p><p id=prixdessert class=mypview>Prix du dessert : "+ data[i].menus[k].dessert.prix + "€</p>");
                                $('#seeAllMenu').append('<option class=myoption data-id='+ data[i].menus[k].id +' value="'+ data[i].menus[k].nom +'">'+ data[i].menus[k].nom +'</option>');
                            }
                        }
                    },
                    error: function(res, stat, err){
            
                    }
                })
            }
        });
    });

    if(!is_connected) {
        location = 'connexion.html';
    }
});    