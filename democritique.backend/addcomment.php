<?php

include_once('db.php');

$dok_id = json_decode($_POST['dok_id']);
$commenttext = urldecode( json_decode($_POST['commenttext']) );

mysqli_query($db,"INSERT INTO `comments`

	(created_by, parent_id, dok_id, comment_text )

	VALUES ('$_POST[userid]', '$_POST[parent]', '$dok_id', '$commenttext' )

");

?>