var
    char,//выбор персонажа
    name,//никнейм пользователя
    // time = {
    //     enter: 600,
    //     show: 600,
    //     fade: 600,
    //     modal: 1500,
    // },
    time = {
        enter: 600,
        show: 400,
        fade: 400,
        modal: 1000,
    },
    $elem = [
        'logo-anime',
        'choice-anime',
        'choice-text-anime',
        'info-anime'
    ],
    video = {
        show: false
    },
    action = {
        right: false,
        left: false
    };


var leftPressed = false;
var rightPressed = false;
var jumpPressed = false;

var jumpCount = 0;
var jumpLength = 50;
var jumpHeight = 0;
var playerHeight = 70;
var playerWidth = 70;


//char
var widthDistanceChar = 550;//
var widthMoveChar = 150;//
var speedMoveChar = 4;
var playerHeightMove = 480;


var
    paddleX = (widthDistanceChar - playerWidth) / 2;


startGame();

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
    /**
     * скрываем ненужного перса
     */
    if (char == "pumba") {
        $('[id="timon"]').hide();
    } else {
        $('[id="pumba"]').hide();
    }
});


/**
 * анимация главного входа игры
 */

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
    anime_rules()
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
        $('.btn-enter').removeAttr('disabled');//активация кнопки если нет никнейма
        $('.btn-enter').css('cursor', 'pointer');//меняем курсор
        name = nick
    } else {
        $('.btn-enter').prop('disabled', true);//деактивируем кнопку если есть логин более 1 символа
        $('.btn-enter').css('cursor', 'default');//меняем курсор
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
            $('.start-media').css('display', 'block')
            $('.video-player').show(500);
            $('.video-player').trigger('play');
            video.show = true;
            $(document).on('keypress', (event) => {
                if (event.keyCode == 32) {
                    clearTimeout(time);
                    startGame();
                }
            })
        }
    })
});

function startGame() {
    $('.video-player').trigger('pause');
    $('.start-media').css('display', 'none');
    $(".game").css("display", "flex");

    pad();
    AnimationChar();
}


function pad() {
    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) {
            rightPressed = true;
            $(".plr").css("transform", "scaleX(-1)");
        }
        if (e.keyCode == 37) {
            leftPressed = true;
            $(".plr").css("transform", "scaleX(cghfqns" +
                "1)");
        }
        if (e.keyCode == 38) {
            jumpPressed = true;
        }
    }, false);
    document.addEventListener("keyup", (e) => {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        if (e.keyCode == 37) {
            leftPressed = false;
        }
    }, false);
}

function draw() {
    if (rightPressed && paddleX < widthDistanceChar - widthMoveChar - playerWidth) {

        paddleX += speedMoveChar;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= speedMoveChar;
    }
    if (jumpPressed) {
        jumpCount++;
        jumpHeight = 4 * jumpLength * Math.sin(Math.PI * jumpCount / jumpLength);
    }
    /////////


    let
        land = $('.platforma'),
        pl = $(".player"),
        down = false,
        $cord = [
            $('.img1'),
            $('.img2'),
        ];



    for(let i=0;i<$cord.length;i++){
        let left=$cord[i].position().offset;
        if(
            (pl.position().offset-10 <= left) ||
            (pl.position().offset+10 >= left + $cord[i].width())
        ){
            land=$cord[i];
            // console.log(land)
        }
    }

    if (
        (
            (pl.position().offset <= land.offset().left) ||
            (pl.position().offset >= land.offset().left + land.width())
        ) &&
        (pl.position().top < 480) &&
        (!jumpPressed)
    ) {
        down = true;
    }

    if (jumpCount > jumpLength / 2) {
        if ((
                (pl.position().top >= land.offset().top - 6) &&
                (pl.position().top <= land.offset().top + 6)
            ) &&
            (
                (pl.position().offset >= land.offset().offset) &&
                (pl.position().offset <= land.offset().offset + land.width())
            )
        ) {
            jumpCount = 0;
            jumpPressed = false;
            jumpHeight = 0;
            playerHeightMove = land.position().top - 40;
        }
    }

    if (down) {
        playerHeightMove += speedMoveChar * 2;
    }


    /////////
    if (jumpCount > jumpLength) {
        jumpCount = 0;
        jumpPressed = false;
        jumpHeight = 0;
    }


    $(".player").css({
        left: paddleX + "px",
        top: playerHeightMove - jumpHeight + "px"
    });

    generate_land();

}

setInterval(draw, 10);


function AnimationChar() {

    let img = new Image();
    img.src = "image/TimonTLK.png";
    $(".plr").attr("src", img.src);

    let left = -367;
    let step = 0;

    setInterval(() => {
        if (step >= 9) {
            step = 0;
        }

        $(".plr").css({
            left: left - (step * 20) + "px"
        });
        step++;
    }, 50);


}

function generate_land() {

    let slider = $('.game-slider');

    let land = [
        [100, -400],
        [300, -300],
    ];

    $('.img1').css({
        'left': land[0][0] + 'px',
        'bottom': land[0][1] + 'px',
    });

    $('.img2').css({
        'left': land[1][0] + 'px',
        'bottom': land[1][1] + 'px',
    });

}