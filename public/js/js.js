startGame(); //- test

const $anime_enter = () => {
    let $i = 0;

    let si = setInterval(() => {
        if ($i >= $elem.length) {
            clearInterval(si);

        }

        let $e = $("." + $elem[$i]);
        switch ($e.data("anime")) {
            case "show":
                $e.show(time.show);
                break;
            case "fade":
                $e.fadeIn(time.fade);
                break;
        }
        $i++;
    }, time.enter);
};
$('.character').click(function () {
    char = $(this).attr('id');
    $('.start-game').css('display', 'block');

    /*скрываем ненужного перса*/
    char = (char == "pumba") ? "timon" : "pumba";
    $('[id="' + char + '"]').hide();
});
// $('.enter').animate({
//     top: '+=50%',
//     left: '+=50%',
//     width: '+=500px',
//     height: '+=600px',
// }, {
//     duration: time.enter,
//     easing: 'swing',
//     complete: function () {
//         $anime_enter();
//         $('.pl-name-animate').val('');
//         $('.btn-enter').prop('disabled', true)
//     }
// });

$('.rules').click(() => {
    anime_rules();
});

function anime_rules() {
    $('.rules-modal').css('display', 'flex');
    $('.modal').animate({
        top: '+=115%'
    }, {
        duration: time.modal
    });
}

$('.close').click(() => {
    $('.modal').animate({
        top: '-=115%'
    }, {
        duration: time.modal,//1000
        complete: function () {
            $('.rules-modal').css('display', 'none');

        }
    });
});

$('.pl-name-animate').on('input', function () {
    //получаем текст никнейма пользователя
    var nick = $(this).val();
    //подсчитываем количество символов введеных пользователем
    if (nick.length > 1) {
        $('.btn-enter')
            .removeAttr('disabled')//активация кнопки если нет никнейма
            .css('cursor', 'pointer');//меняем курсор
        namePl = nick;
    } else {
        $('.btn-enter')
            .prop('disabled', true)//деактивируем кнопку если есть логин более 1 символа
            .css('cursor', 'default');//меняем курсор
    }
});

//событие кнопки входа в игру
$('.btn-enter').click(function () {
    //скрыть все элементы меню входа для плавной анимации
    $(".enter > div, .enter > label").hide("fast");
    let time = setTimeout(() => {
        console.log("time stop")
        if (video.show) {
            startGame();
            video.show = false;
        }
    }, 10000);
    //убираем с экрана фрейм с входов в игру
    $('.enter').animate({
        'top': '-=100%',
        'left': '+=90%',
        'width': '-=500px',
        'height': '-=600px',
    }, {
        duration: 1000,
        complete: function () {
            //убираем вход
            $('.enter').css('display', 'none');
            //показываем блок с роликом
            $('.start-media')
                .css('display', 'block');
            $('.video-player')
                .show(500)
                .trigger('play');
            video.show = true;
            $(document).one('keypress', (event) => {
                if (event.keyCode == 32) {
                    clearTimeout(time);
                    startGame();
                }
            })
        }
    })
});

//начало игры