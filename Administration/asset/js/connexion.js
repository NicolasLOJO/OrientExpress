$(document).ready(function() {
var is_connected = Cookies.get('connected');
    $('#main').append('<div class=popup></div>');
    $('.popup').css('display', 'none');

    if(is_connected !== true) {
        $('#main').on('click', 'span#connect', function() {
            let user = $('#username').val();
            let password = $('#password').val();
            console.log(user + ' ' + password);
            if(password !== '' && user !== '') {
                $.ajax({
                    type: 'POST',
                    dataType:'json',
                    url:'http://localhost:5000/users/verify',
                    contentType: 'application/json',
                    data: JSON.stringify({'username': user, 'password': password}),
                    success: function(data) {
                        console.log(data);
                        if(verifConnect(data.user) === true) {
                            console.log('connected');
                            is_connected = true;
                            Cookies.set('connected', true);
                            Cookies.set('user', user);
                            location = '../../index.html';
                        }
                    },
                    error: function(data) {
                        console.log('wrongID or Password');
                        $('.popup').text('Mauvais mot de passe ou identifiant');
                        $('.popup').fadeIn('slow').css('top', '66').delay(400).fadeOut('slow');
                    }
                });
            } else if(password === '' && user === '') { 
                $('.popup').text('Entrez un identifiant et un mot de passe');
                $('.popup').fadeIn('slow').css('top', '66').delay(400).fadeOut('slow');
            } else if(password === '') {
                $('.popup').text('Entrez un mot de passe');
                $('.popup').fadeIn('slow').css('top','121').delay(400).fadeOut('slow');
            } else if(user === '') {
                $('.popup').text('Entrez un identifiant');
                $('.popup').fadeIn('slow').css('top', '66').delay(400).fadeOut('slow');
            }
        })
    } else if(is_connected === true) {
        location = '../../index.html';
    }

    function verifConnect(username) {
        let rep;
        $.ajax({
            url:'http://localhost:5000/users/'+ username + '/connected',
            async: false,
            success: function(data) {
                rep = data;
            }
        });
        return rep;
    }
});