<?php


header('Content-type: text/plain; charset=ISO-8859-10');

include("db.php");

$page_number = $_POST["page"];

$item_per_page = 40;

$position = ($page_number * $item_per_page);

$result = mysqli_query($db,"SELECT * FROM `propositions` ORDER BY `propositions`.`datum` DESC LIMIT $position, $item_per_page");

while($row = mysqli_fetch_array($result))
  {

  $dokid = $row['dok_id'];
  $commentReq = mysqli_query($db, "SELECT COUNT(*) FROM comments WHERE dok_id = '$dokid'");
  $commentCount = mysqli_fetch_array($commentReq);
  $commentCount = $commentCount[0];


  echo "<div dok_id=\"". $row['dok_id'] . "\" class=\"result " .  $row['organ'] . "\">";
  echo "<div class=\"resultheader\">";
  echo "<p>" . htmlspecialchars($row['titel']) . "</p>";
  echo "</div>";
  echo "<div class=\"resultbody\">";
  echo "<div class=\"resultbodytext\">";
  echo "<p>" . $row['organ'] . "</p>";
  echo "<p>" . $row['datum'] . "</p>";
  echo "</div>";

  echo "<div class=\"resultbuttons\">";

  echo "<div class=\"buttontable\">";
  echo "<img class=\"resultbutton\" src=\"img/comments.svg\" />";
  echo "<p class =\"buttontext\">$commentCount</p>";
  echo "</div>";

  echo "<div class=\"buttontable\">";
  echo "<img class=\"resultbutton downvote\" src=\"img/downvote.svg\" />";
  echo "<p class =\"buttontext\">" . $row['downvotes'] . "</p>";
  echo "</div>";

  echo "<div class=\"buttontable\">";
  echo "<img class=\"resultbutton upvote\" src=\"img/upvote.svg\" />";
  echo "<p class =\"buttontext\">" . $row['upvotes'] . "</p>";
  echo "</div>";

  echo "</div>";


  echo "<a href=\"#\" onclick=\"window.open('http://docs.google.com/viewer?url=" . $row['pdf'] . ".pdf', '_blank', 'location=no');\">";
  echo "<div id=\"doclink\">";
  echo "<img src=\"img/download.svg\" />";
  echo "<p class =\"buttontext\">H&auml;mta</p>";
  echo "</div>";
  echo "</a>";

  echo "<div id=\"commentlink\">";
  echo "<p class =\"buttontext\">Kommentera</p>";
  echo "<img src=\"img/commentsring.svg\" />";
  echo "</div>";

  echo "<div class=\"comdiv\"></div>";

  echo "<div class=\"comments\" id=\"" . $row['dok_id'] . "\"></div>";

  echo "</div>";
  echo "</div>";
  echo "<div class=\"divisor\"></div>";
  }

mysqli_close($db);
?> 