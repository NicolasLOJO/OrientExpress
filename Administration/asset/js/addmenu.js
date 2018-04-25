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
                $('#selector').append('<option class=myoption value=blank>Acune carte</option>');
            } else {
                for(let i in data){
                    $('#selector').append('<option class=myoption data-id='+ data[i].id +' value="'+ data[i].nom +'">'+ data[i].nom +'</option>');
                }
            }
        }
    });

    $('#validmenu').on('click', function(){
        var id = $('#selector option:selected').data('id');
        $.ajax({
            type : 'POST',
            url: 'http://localhost:4000/cartes/menus/'+ id +'/add',
            datatype : 'json',
            data: {nom : $('#nommenu').val(), entree : $('#entree').val(), plat : $('#plat').val(), dessert : $('#dessert').val(), prix1 : $('#prixentree').val(), prix2 : $('#prixplat').val(), prix3 : $('#prixdessert').val()},
            success: function(data){
                $('#main').append('<p class=addcomplete>Menu ajouté</p>');
                $('.addcomplete').css('color', 'green');
            },
            error: function(rep, stat, err){

            }
        })
    });

    if(!is_connected) {
        location = 'connexion.html';
    }
}); 