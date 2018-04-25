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
                if(data.message){
                    $('#listecarte').html('<div class=viewcarte>'+ data.message +'</div>');
                } else {
                    for(let i in data){
                        $('#listecarte').append('<p class="viewcarte">'+ data[i].nom +'</p>');
                        $('#monselect').append('<option class=myoption data-id='+ data[i].id +' value="'+ data[i].nom +'">'+ data[i].nom +'</option>');
                    }
                }
            }
        });

        $('#majvue').on('click', function() {
            majVue();
        });

        $('#addvalid').on('click', function(){
            $('.viewcarte').remove();
            var newcard = $('#addcard').val();
            $.ajax({
                type: 'POST',
                url:'http://localhost:4000/cartes/add',
                datatype: 'json',
                data: {name : newcard},
                success: function(data){
                    majVue();
                },
                error: function(result, status, erreur){

                },
            })
        });

        $('#removeid').on('click', function(){
            var id = $('#monselect option:selected').data('id');
            console.log(id);
            $.ajax({
                type: 'DELETE',
                url:'http://localhost:4000/cartes/'+ id +'/remove',
                success: function(data){
                    majVue();
                },
                error: function(res, stat, err){

                },
            })
        });

        function majVue() {
            $('.viewcarte').remove();
            $('.myoption').remove();
            $.ajax({
                url:'http://localhost:4000/cartes/get',
                success: function(data){
                    if(data.message){
                        $('#listecarte').html('<div class=viewcarte>'+ data.message +'</div>');
                    } else {
                        for(let i in data){
                            $('#listecarte').append('<p class="viewcarte">'+ data[i].nom +'</p>');
                            $('#monselect').append('<option class=myoption data-id='+ data[i].id +' value="'+ data[i].nom +'">'+ data[i].nom +'</option>');
                        }
                    }
                }
            });
        }

    if(!is_connected) {
        location = 'connexion.html';
    }
});