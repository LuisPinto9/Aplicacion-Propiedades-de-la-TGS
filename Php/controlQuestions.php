<?php

$option = $_GET['option'];

if ($option == 1) {

    $data = file_get_contents("..\Resources\questions.json");

    $object = json_decode($data);

    echo json_encode($object);

}