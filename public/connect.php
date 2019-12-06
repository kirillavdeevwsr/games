<?php
//параметры базы данных
//$host='172.17.57.14';///Ip хоста указывать как в настройках ОСПанели или в задании
$host='localhost';///Ip хоста указывать как в настройках ОСПанели или в задании
$user='root';
$password='';
$db='game';

$nic= $_POST['name'];
$point= $_POST['point'];

//подклбчаемся к субд
$link=mysqli_connect($host,$user,$password,$db);

//строка запроса всех данных
$query='SELECT * FROM `records` ORDER BY `records`.`points` DESC';
$queryName="SELECT * FROM `records` WHERE `name` = '".$nic."'";
$queryToAdd="INSERT INTO `records` (id, name, points) VALUES (NULL, '" . $nic . "', " . $point . ")";
$queryToUpdate="UPDATE `records` SET `points` = '".$point."' WHERE `name` = '".$nic."'";

//выполеннеи запроса

$resName=mysqli_query($link,$queryName);
$allName = mysqli_fetch_all($resName,MYSQLI_ASSOC);

if (count($allName)!=0){
    if ($allName[0]["points"]<$point){
        mysqli_query($link,$queryToUpdate);
    }
}

mysqli_query($link,$queryToAdd);
$res=mysqli_query($link,$query);


//MYSQLI_ASSOC - для отображение ключей в полученном массиве из базы
$all = mysqli_fetch_all($res,MYSQLI_ASSOC);

//хранилище для данных вывода в игру
$places = [//массив с разными данными результатов
    "all10"=>[],//все 10 результатов
    "user"=>[]//тек результат пользователя
];

//i - порядковый номер элемента сортировки
for($i = 0; $i < count($all); $i++){
    if($i < 10){//проверяем только 10 первых
        $places["all10"][] = ["place"=>$i+1,"nickname"=>$all[$i]["name"], "point"=>$all[$i]["points"]];
    }

    if($all[$i]["name"] == $_POST["name"]){//проверяенм и получаем тек пользователя
        $places["user"] =  ["place"=>$i+1,"nickname"=>$_POST["name"], "point"=>$all[$i]["points"]];
    }
}
//выводим результат на экране
echo json_encode($places);