<?php

$option = $_GET['option'];

if ($option == 1) {

    $data = file_get_contents('..\Resources\login.json');

    $object = json_decode($data);

    echo json_encode($object);

} elseif ($option == 2) {

    $newUser = array("name" => $_GET['name'], "password" => $_GET['password']);

    if (file_exists('..\Resources\login.json')) {
        file_put_contents('..\Resources\login.json', json_encode($newUser));
        echo "ok";
    }
}