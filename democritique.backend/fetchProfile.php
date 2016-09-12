<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

// function getProfileCompassVotes($userid) {
//
//   $comparableVotes = array();
//   $totalVotes = 0;
//   $parties = array();
//
//   // $result = mysqli_query($db,"SELECT * FROM `reports` WHERE beslut = 'planerat' AND datum < CURDATE() AND description <> ' ' ORDER BY `reports`.`datum` DESC LIMIT $position, $item_per_page");
//
//   $result = mysqli_query($db,"SELECT * FROM `votes` WHERE user = '$userid'");
//
//   while($row = mysqli_fetch_array($result))
//     {
//
//     $dokid = $row['dok_id'];
//     $dokidvotes = substr($dokid, 4);
//     $uservote = $row['vote'];
//
//
//     $polvoteReq = mysqli_query($db, "SELECT * FROM polvotes WHERE dok_id = '$dokidvotes' AND vote = 'Ja' OR dok_id = '$dokidvotes' AND vote = 'Nej'");
//     $polvotes = mysqli_fetch_array($polvoteReq);
//
//     $partyvotes = array();
//
//     while($brow = mysqli_fetch_array($polvoteReq))
//     {
//
//         $vote = $brow['vote'];
//         $party = $brow['party'];
//
//         if ($party == 'FP' || $party == 'fp') {
//
//           $party = 'L';
//         }
//
//         $partyvotes[$party] = $vote;
//
//     }
//
//     $newParties = array_keys($partyvotes);
//
//
//
//
//
//
//     foreach ($newParties as &$party) {
//
//       $party = strtoupper($party);
//
//       if(!in_array($party, $parties, true)){
//            array_push($parties, $party);
//        }
//
//       if ($uservote == (-1)){
//
//         $uservote = 'Nej';
//
//
//       } else {
//
//         $uservote = 'Ja';
//
//       }
//
//       if (empty($comparableVotes[$party])) {
//
//         $comparableVotes[$party] = 0;
//
//
//
//       }
//
//       $comparableVotes[$party] = $comparableVotes[$party]+1;
//
//     }
//
//     $totalVotes = $totalVotes+1;
//
//   }
//
//   arsort($comparableVotes);
//
//   $comparableVotes = array_slice($comparableVotes, 0, 3);
//
//   echo "<div class='profilecompassresults'>";
//
//   foreach ($comparableVotes as $key => $vote) { // Iterate through comparableVotes array, where $key is a party
//
//     if (strtoupper($key) == '-'){
//       continue;
//     }
//
//
//     $votePercentage = intval(($vote / $totalVotes)*100);
//
//     echo "<div class='voteresults'>";
//
//     echo "<div class='votemeter " . strtoupper($key) . "'>";
//     echo "<p class='votemeteramount' amount='". $votePercentage . "'>";
//     echo $votePercentage;
//     echo "%";
//     echo "</p>";
//     echo "</div>";
//
//   }
//
//   echo "<p>Baserat på dina ";
//   echo $totalVotes;
//   echo " röster.";
//   echo "</div>";
//
//
//   mysqli_close($db);
//
//
// }
//
// function getProfileVotes($userid) {
//
//   $result = mysqli_query($db,"SELECT * FROM `votes` WHERE user = '$userid'");
//
//   echo "<div id='recentvotes'>";
//
//   while($row = array_slice(mysqli_fetch_array($result), 0, 3))
//     {
//
//     $dokid = $row['dok_id'];
//     $uservote = $row['vote'];
//
//     $reportReq = mysqli_query($db, "SELECT titel FROM reports WHERE dok_id = '$dokid'");
//     $reportName = mysqli_fetch_array($reportReq);
//     $reportName = $reportName[0];
//
//     echo "<div class='recentvote'>";
//
//     echo "<p class='recentvotetitle'>";
//     echo $reportName;
//     echo "</p>";
//
//     echo "<p class='recentvoteresult ";
//
//     if ($uservote == (-1)){
//       echo "no'>Nej</p>";
//     }
//     else {
//
//       echo "yes'>Ja</p>";
//
//     }
//
//     echo "</div>";
//
//
//   mysqli_close($db);
//
//
// }

function getRecentVotes($userid) {

  global $db;

  $query = "SELECT * FROM `vote` WHERE user = '$userid'";

  $result = mysqli_query($db,$query);

  $i = 5;
  echo "what?";

  while($row = mysqli_fetch_array($result))
    {

    if (i > 0) {



    $dokid = $row['dok_id'];
    $uservote = $row['vote'];

    echo $dokid;
    echo $uservote;


    $reportReq = "SELECT * FROM `reports` WHERE dok_id = '$dok_id'";
    $report = mysqli_query($db, $reportReq);

    while($brow = mysqli_fetch_array($reportReq))
    {

      $dokid = $brow['dok_id'];

      echo "<div dok_id=\"". utf8_encode($brow['dok_id']) . "\" class=\"result\">";
      echo "<div class=\"resultheader\">";
      echo "<p>" . htmlspecialchars(utf8_encode($brow['titel'])) . "</p>";
      echo "</div>";
      echo "<div class=\"resultbody\">";
      echo "<div class=\"resultbodytext\">";
      echo "<p>" . $brow['datum'] . "</p>";
      echo "</div>";
    }

    }

    $i--;
  }
}

function getProfileComments($userid) {

  global $db;

  $query = "SELECT * FROM `comments` WHERE created_by = '$userid'";

  $result = mysqli_query($db,$query);

  $i = 4;

  while($row = mysqli_fetch_array($result))
    {
        if ($i > 0) {
      echo "<div class='profilecomment' dok_id='" . $row['dok_id'] . "'>";
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

      $i--;
      }
    }
  mysqli_close($con);


}



$user = $_POST["user_id"];


getProfileComments('82b0d5bc25feb14ad1482b6ebf37594a');
getRecentVotes('82b0d5bc25feb14ad1482b6ebf37594a');



?>
