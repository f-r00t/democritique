<?php

include_once('db.php');

$query = "SELECT * FROM `commentvotes` WHERE user = '$_POST[user_id]' && comment_id = '$_POST[comment_id]' && vote ='1'";
$result = mysqli_query($db,$query);

if ($row = mysqli_fetch_array($result)) {
    echo '0';
}
else {
	mysqli_query($db,"

		UPDATE comments
		SET upvotes = upvotes + 1
		WHERE comment_id='$_POST[comment_id]'

	");

	mysqli_query($db,"INSERT INTO `commentvotes`

		(user, comment_id, vote)

		VALUES ('$_POST[user_id]', '$_POST[comment_id]', '1' )

	");

	$query = "SELECT * FROM `commentvotes` WHERE user = '$_POST[user_id]' && comment_id = '$_POST[comment_id]' && vote ='-1'";
	$result = mysqli_query($db,$query);

	if ($row = mysqli_fetch_array($result)) {

		mysqli_query($db,"

		DELETE FROM commentvotes
		WHERE comment_id='$_POST[comment_id]' && user = '$_POST[user_id]' && vote = '-1'

		");
		mysqli_query($db,"

		UPDATE comments
		SET downvotes = downvotes - 1
		WHERE comment_id='$_POST[comment_id]'

	");

	echo '1';
    	
    }

    echo '1';

}

?>