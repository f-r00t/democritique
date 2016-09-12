<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

$partiesreq = mysqli_query($db, "SELECT DISTINCT party FROM globalvotes WHERE `date` >= current_date - 6");

$parties = array();

$partyvote = array();

while ($row = mysqli_fetch_array($partiesreq))
  {
    $parties[] = $row['party'];
  }

foreach ($parties as &$party) {

  $result = mysqli_query($db,"SELECT `votes` FROM `globalvotes` WHERE `party` = '$party' AND `date` >= current_date - 6 ORDER BY `globalvotes`.`date` ASC");
  $votes = array();

    while($row = mysqli_fetch_array($result))
    {
      array_push($votes, (string)$row['votes']);
    }

  $partyvotes[$party] = $votes;

}

print (json_encode($partyvotes));

?>
