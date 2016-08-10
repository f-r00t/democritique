<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

$dok_id = $_POST["dok_id"];

$result = mysqli_query($db,"SELECT * FROM `docrefs` WHERE `parent` = $dok_id AND reftype = 'behandlar'");

echo "<div class=\"docrefs commenthide\">";

if (mysqli_fetch_array($result)) {

  while($row = mysqli_fetch_array($result))
  {

   $rowdokid = $row['dok_id'];
    if (utf8_encode($row['doktype']) == "mot")
    {
      $motionReq = mysqli_query($db, "SELECT * FROM motions WHERE dok_id = '$rowdokid'");
      $motionData = mysqli_fetch_array($motionReq);
      $party = $motionData['party'];
      echo "<div dok_id=\"" . $row['dok_id'] . "\" class=\"docref motion " . $party . "\"  pdf=\"http://docs.google.com/viewer?url=" . $motionData['pdf'] . ".pdf\" >";
    }
    elseif (utf8_encode($row['doktype']) == "prop")
    {
      $propReq = mysqli_query($db, "SELECT * FROM propositions WHERE dok_id = '$rowdokid'");
      $propData = mysqli_fetch_array($propReq);
      $organ = $propData['organ'];
      echo "<div dok_id=\"" . $row['dok_id'] . "\" pdf=\"http://docs.google.com/viewer?url=" . $propData['pdf'] . ".pdf\" class=\"docref prop " . $organ . "\">";
    }
    else {

      continue;

    }


    echo "<p>" . htmlspecialchars(utf8_encode($row['title'])) . "</p>";
    echo "</div>";


  }

  echo "</div>";
  echo "<div class=\"expander\"><img src=\"img/plusring.svg\" /><p>Visa fler</p></div>";

} else {
  echo "<p>Det finns inga tidigare lagförslag för den här frågan.</p>";
}

mysqli_close($db);


?>
