<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/css.css">
</head>
<body>


<div class="enter">
    <div class="logo-anime" data-anime="show">
        <img src="image/logo.png">
    </div>
    <label for="" class="choice-text-anime" data-anime="fade">Выберите персонажа</label>
    <div class="menu">
        <div class="choice-anime" data-anime="show">
            <div class="choice">
                <div class="character" id="pumba" data-anime="fade">
                    <img src="image/pumba.png" alt="" width="150">
                </div>
                <div class="character" id="timon" data-anime="fade">
                    <img src="image/timon.png" alt="" width="150">
                </div>
            </div>
        </div>


        <div class="start-game">
            <div class="start-form">
                <input type="text" class="pl-name-animate" data-anime="fade" value="" placeholder="Введите Никнейм">
                <button disabled class="btn-enter">
                    Играть
                </button>
            </div>
        </div>


    </div>
    <div class="enter-footer">
        <div class="info-anime" data-anime="show">
            <div>
                <div class="copy">Kiryusha @ 2019</div>
                <div class="rules"><a href="#">Правила игры</a></div>
            </div>
        </div>
    </div>
</div>

<div class="rules-modal">
    <div class="modal">
        <div class="title">
            Правила игры
        </div>
        <div class="rules-text">
            <div class="text">
                fawfawr
            </div>
        </div>
        <div class="close">
            X
        </div>
    </div>
</div>

<div class="start-media">

    <div class="start-video">
        <video class="video-player" src="video/Timon%20_%20Pumbaa%20-%20Title%20Song%20%5BEnglish%20Version%5D.mp4"></video>
        <div class="video-stop">Нажите SPACE для продолжения</div>
    </div>

</div>

<div class="game">
    <div class="game-field">
        <div class="game-slider">
            <div class="land">
                <img class="platforma img1" src="image/land-vector.png" alt="" data-id="1" data-cord="[300,-400]">
                <img class="platforma img2" src="image/land-vector.png" alt="" data-id="2">
            </div>
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
            <img src="image/game.jpg" alt="">
        </div>
        <div class="player">
            <img src="image/timon.png" class="plr">
        </div>
    </div>
</div>




</body>
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/js.js"></script>
</html>
