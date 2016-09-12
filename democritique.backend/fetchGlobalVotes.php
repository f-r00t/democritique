<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

$result = mysqli_query($db,"SELECT * FROM `reports`");

while($row = mysqli_fetch_array($result))
  {

    $dokid = $row['dok_id'];

    $upvoteReq = mysqli_query($db, "SELECT COUNT(*) FROM votes WHERE dok_id = '$dokid' AND vote = '1'");

    $upvotes = mysqli_fetch_array($upvoteReq);

    $upvotes = $upvotes[0];

    $downvoteReq = mysqli_query($db, "SELECT COUNT(*) FROM votes WHERE dok_id = '$dokid' AND vote = '-1'");

    $downvotes = mysqli_fetch_array($downvoteReq);

    $downvotes = $downvotes[0];

    if ($upvotes > $downvotes) {

      $globalvote = 1;

    } else {

      $globalvote = -1;

    }

    if ($downvotes != $upvotes) {

      mysqli_query($db,"DELETE FROM `votes` WHERE dok_id = '$dokid' AND user = 'democritiqueglobal'");

      mysqli_query($db,"INSERT IGNORE INTO `votes`

    		(user, dok_id, vote )

    		VALUES ('democritiqueglobal', '$dokid', '$globalvote' )

    	");

  }


}

$user = 'democritiqueglobal';

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

      if ($party == 'FP' || $party == 'fp') {

        $party = 'L';
      }

      $partyvotes[$party] = $vote;

  }

  $newParties = array_keys($partyvotes);






  foreach ($newParties as &$party) {

    $party = strtoupper($party);

    if(!in_array($party, $parties, true)){
         array_push($parties, $party);
     }

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

arsort($comparableVotes);

echo "<div class='compassresults'>";

foreach ($comparableVotes as $key => $vote) { // Iterate through comparableVotes array, where $key is a party

  if (strtoupper($key) == '-'){
    continue;
  }

  $votePercentage = intval(($vote / $totalVotes)*100);

  echo "<span style='display:none'>";

  echo "<party>";
  echo strtoupper($key); // PARTY NAME
  echo "</party>";

  echo "<partyvote>";
  echo $votePercentage; // % OF MATCHING VOTES
  echo "</partyvote>";

  echo "</span>";

  echo "<div class='voteresults'>";

  echo "<div class='votemeter " . strtoupper($key) . "'>";
  echo "<p class='votemeteramount' amount='". $votePercentage . "'>";
  echo $votePercentage;
  echo "%";
  echo "</p>";
  echo "</div>";

}

echo "<totalvotes>";
echo $totalVotes;
echo "</totalvotes>";

echo "<p>Baserat på dina ";
echo $totalVotes;
echo " röster.";
echo "</div>";




mysqli_close($db);
?>
