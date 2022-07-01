<?php

$option = $_GET['option'];

if ($option == 1) {

    $data = file_get_contents('.\Resource\login.json');

    $object = json_decode($data);

    echo json_encode($object);

} elseif ($option == 2) {

    $newUser = array("name" => $_GET['name'], "password" => $_GET['password']);

    if (file_exists('.\Resource\login.json')) {
        $data = file_get_contents('.\Resource\login.json');
        $newData = json_decode($data);
        array_push($newData, $newUser);
        file_put_contents('.\Resource\login.json', json_encode($newData));
    }
}