<?php

$option = $_GET['option'];

if ($option == 1) {

    $data = file_get_contents("../Resources/users.json");

    $object = json_decode($data);

    echo json_encode($object);

} elseif ($option == 2) {

    $newUser = array("name" => $_GET['name'], "password" => $_GET['password'], "score" => $_GET["score"], "level" => $_GET["level"]);

    if (file_exists("../Resources/users.json")) {
        $data = file_get_contents("../Resources/users.json");
        $newData = json_decode($data);
        array_push($newData, $newUser);
        file_put_contents("../Resources/users.json", json_encode($newData));
    }
} elseif ($option == 3) {

    $userDelete = $_GET["name"];
    $finalData = [];
    $status = false;
    while ($status != true) {
        if (file_exists("../Resources/users.json")) {
            $data = file_get_contents("../Resources/users.json");
            $newData = json_decode($data);

            foreach ($newData as $user => $userSearch) {

                if ($userSearch->name == $userDelete) {

                    unset($newData[$user]);

                    $status = true;
                }
            }
        }
    }

    foreach ($newData as $user) {
        array_push($finalData, $user);
    }
    $newUser = array("name" => $_GET['name'], "password" => $_GET['password'], "score" => $_GET["score"], "level" => $_GET["level"]);

    array_push($finalData, $newUser);
    file_put_contents("../Resources/users.json", json_encode($finalData));

}
