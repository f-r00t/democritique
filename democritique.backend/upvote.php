<?php

include_once('db.php');

$dok_id = json_decode($_POST['dok_id']);

if (substr($dok_id, 0, 4) == 'news') {

  $query = "SELECT * FROM `newsvotes` WHERE user = '$_POST[user_id]' && dok_id = '$dok_id' && vote ='1'";

} else {

  $query = "SELECT * FROM `votes` WHERE user = '$_POST[user_id]' && dok_id = '$dok_id' && vote ='1'";
}

$result = mysqli_query($db,$query);

if (mysqli_num_rows($result)) {
    echo '0';
}
else {

  if (substr($dok_id, 0, 4) == 'news') {

    $id = substr($dok_id, 4);

      mysqli_query($db,"

    		UPDATE news
    		SET upvotes = upvotes + 1
    		WHERE id='$id'

  	  ");

  } else {

      mysqli_query($db,"

    		UPDATE reports
    		SET upvotes = upvotes + 1
    		WHERE dok_id='$dok_id'

  	");
  }

  if (substr($dok_id, 0, 4) == 'news') {

    mysqli_query($db,"INSERT INTO `newsvotes`

  		(user, dok_id, vote )

  		VALUES ('$_POST[user_id]', '$dok_id', '1' )

  	");

  	$query = "SELECT * FROM `newsvotes` WHERE user = '$_POST[user_id]' && dok_id = '$dok_id' && vote ='-1'";


  } else {

	mysqli_query($db,"INSERT INTO `votes`

		(user, dok_id, vote )

		VALUES ('$_POST[user_id]', '$dok_id', '1' )

	");

	$query = "SELECT * FROM `votes` WHERE user = '$_POST[user_id]' && dok_id = '$dok_id' && vote ='-1'";

  }

	$result = mysqli_query($db,$query);

	echo '1';

	if ($row = mysqli_fetch_array($result)) {

    if (substr($dok_id, 0, 4) == 'news') {

      mysqli_query($db,"

  		DELETE FROM news
  		WHERE dok_id='$dok_id' && user = '$_POST[user_id]' && vote = '-1'

  		");

    } else {

		mysqli_query($db,"

		DELETE FROM votes
		WHERE dok_id='$dok_id' && user = '$_POST[user_id]' && vote = '-1'

		");

    }

    if (substr($dok_id, 0, 4) == 'news') {

      $id = substr($dok_id, 4);

      mysqli_query($db,"

  		UPDATE news
  		SET downvotes = downvotes - 1
  		WHERE id='$id'

  	  ");
      echo '1';

    } else {

		mysqli_query($db,"

		UPDATE reports
		SET downvotes = downvotes - 1
		WHERE dok_id='$dok_id'

	");

	echo '1';

    }

  }

}

?>
