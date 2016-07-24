<?php

include("db.php");

$dok_id = $_POST["dok_id"];  

$query = "SELECT * FROM `comments` WHERE dok_id = '$dok_id'";

$result = mysqli_query($db,$query);

while($row = mysqli_fetch_array($result))
  {
  echo "<div comment_id=\"" . $row['comment_id'] . "\" class=\"comment\">";
  echo "<p>" . $row['comment_text'] . "</p>";


  echo "<div class=\"commentbuttons\">";

  echo "<div class=\"commentbuttontable\">";
  echo "<img class=\"resultbutton comdown\" src=\"img/downvote.svg\" />";
  echo "<p class=\"buttontext\">" . $row['downvotes'] . "</p>";
  echo "</div>";

  echo "<div class=\"commentbuttontable\">";
  echo "<img class=\"resultbutton comup\" src=\"img/upvote.svg\" />";
  echo "<p class=\"buttontext\">" . $row['upvotes'] . "</p>";
  echo "</div>";

  echo "</div>";

  echo "</div>";
  echo "<div class=\"commentdivisor\"></div>";
  }

  // SELECT TIMESTAMPDIFF(MINUTE,'2015-12-29 17:23:24', CURRENT_TIMESTAMP())

mysqli_close($con);

// $result = mysqli_query($db,"SELECT * FROM `comments` ORDER BY `date_created` DESC");


// // $sql = "SELECT * FROM 'comments' WHERE dokid = $dokid";

// // $results = myslqi_query($db,$query);

// while ($row = mysqli_fetch_array($result) {
//     // $items[] = $row;
//     echo $row['comment_text'];
// }

// mysqli_close($con);

?>