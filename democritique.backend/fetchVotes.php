<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

// $user = $_POST["user_id"];
$user = 'd9459099af7b7c9830ed33c73412c81c';

$comparableVotes = array();
$totalVotes = 0;
$parties = array();

// $result = mysqli_query($db,"SELECT * FROM `reports` WHERE beslut = 'planerat' AND datum < CURDATE() AND description <> ' ' ORDER BY `reports`.`datum` DESC LIMIT $position, $item_per_page");

$result = mysqli_query($db,"SELECT * FROM `votes` WHERE user = '$user'");

while($row = mysqli_fetch_array($result))
  {

  $dokid = $row['dok_id'];
  $dokidvotes = substr($dokid, 4);
  $uservote = $row['vote'];


  $polvoteReq = mysqli_query($db, "SELECT * FROM polvotes WHERE dok_id = '$dokidvotes' AND vote = 'Ja' OR dok_id = '$dokidvotes' AND vote = 'Nej'");
  $polvotes = mysqli_fetch_array($polvoteReq);

  $partyvotes = array();

  while($brow = mysqli_fetch_array($polvoteReq))
  {

      $vote = $brow['vote'];
      $party = $brow['party'];

      $partyvotes[$party] = $vote;

  }

  $parties = array_keys($partyvotes);

  foreach ($parties as &$party) {

    if ($uservote == (-1)){

      $uservote = 'Nej';


    } else {

      $uservote = 'Ja';

    }

    if (empty($comparableVotes[$party])) {

      $comparableVotes[$party] = 0;



    }

    $comparableVotes[$party] = $comparableVotes[$party]+1;

  }

  $totalVotes = $totalVotes+1;

}

foreach ($parties as &$party) {

  echo $comparableVotes[$party];
  echo '/';
  echo $totalVotes;
  echo $party;
  echo "#########################";
  echo "<br>";

}


// echo $comparableVotes['s'];

// echo $comparableVotes['v'];
// echo $comparableVotes['m'];
// echo $comparableVotes['mp'];
// echo $comparableVotes['fp'];


mysqli_close($db);
?>
