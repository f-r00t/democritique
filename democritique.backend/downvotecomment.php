<?php

include_once('db.php');

$dok_id = json_decode($_POST['dok_id']);


$query = "SELECT * FROM `votes` WHERE user = '$_POST[user_id]' && dok_id = '$dok_id' && vote ='-1'";
$result = mysqli_query($db,$query);

if ($row = mysqli_fetch_array($result)) {
    echo '0';
}
else {
	mysqli_query($db,"

		UPDATE propositions
		SET downvotes = downvotes + 1
		WHERE dok_id='$dok_id'

	");

	mysqli_query($db,"INSERT INTO `votes`

		(user, dok_id, vote )

		VALUES ('$_POST[user_id]', '$dok_id', '-1' )

	");

	$query = "SELECT * FROM `votes` WHERE user = '$_POST[user_id]' && dok_id = '$dok_id' && vote ='1'";
	$result = mysqli_query($db,$query);

	if ($row = mysqli_fetch_array($result)) {

		mysqli_query($db,"

		DELETE FROM votes
		WHERE dok_id='$dok_id' && user = '$_POST[user_id]' && vote = '1'

		");
		mysqli_query($db,"

		UPDATE propositions
		SET upvotes = upvotes - 1
		WHERE dok_id='$dok_id'

	");

	echo '1';
    	
    }

    echo '1';

}

?>