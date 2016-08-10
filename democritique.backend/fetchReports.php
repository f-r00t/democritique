<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

$page_number = $_POST["page"];

$item_per_page = 40;

$position = ($page_number * $item_per_page);

$type = $_POST["type"];

// $result = mysqli_query($db,"SELECT * FROM `reports` WHERE beslut = 'planerat' AND datum < CURDATE() AND description <> ' ' ORDER BY `reports`.`datum` DESC LIMIT $position, $item_per_page");

$happened = utf8_decode('inträffat');

$result = mysqli_query($db,"SELECT * FROM `reports` WHERE beslut = '$happened' ORDER BY `reports`.`datum` DESC LIMIT $position, $item_per_page");

while($row = mysqli_fetch_array($result))
  {

  $dokid = $row['dok_id'];
  $commentReq = mysqli_query($db, "SELECT COUNT(*) FROM comments WHERE dok_id = '$dokid'");
  $commentCount = mysqli_fetch_array($commentReq);
  $commentCount = $commentCount[0];


  echo "<div dok_id=\"". utf8_encode($row['dok_id']) . "\" class=\"result\">";
  echo "<div class=\"resultheader\">";
  echo "<p>" . htmlspecialchars(utf8_encode($row['titel'])) . "</p>";
  echo "</div>";
  echo "<div class=\"resultbody\">";
  echo "<div class=\"resultbodytext\">";
  echo "<p>" . $row['datum'] . "</p>";
  echo "</div>";

  echo "<div class=\"timeline commenthide\">";
  echo "<div class=\"timelineitem first\"><span>1</span><p>Förslag</p></div>";
  echo "<div class=\"timelineitem second active\"><span>2</span><p>Beredning</p></div>";
  echo "<div class=\"timelineitem third\"><span>3</span><p>Debatt</p></div>";
  echo "<div class=\"timelineitem fourth\"><span>4</span><p>Beslut</p></div>";
  echo "</div>";

  echo "<div class=\"reporttext commenthide\">" . utf8_encode($row['description']) . "</div>";

  echo "<div class=\"debatetext commenthide\">";

  if (utf8_encode($row['beslut']) == 'planerat' )
  {
    echo "<p>Beslut är inplanerat för debatt den " . $row['beslutsdatum'] . "</p>";
  }
  else
  {
   echo "<p>Beslutet togs den " . $row['beslutsdatum'] . "</p> ";
  }


  echo "</div>";

  echo "<div class=\"decision commenthide\">";

  if (utf8_encode($row['beslut']) == 'planerat' )
  {
    echo "<p>Beslut är inplanerat för debatt den " . $row['beslutsdatum'] . "</p>";
  }
  else
  {
   echo "<p>" . utf8_encode($row['decisionDescription']) . "</p> ";
  }


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

  echo "<div class=\"activatedresultbuttons commenthide\">";

  echo "<a href=\"#\" onclick=\"window.open('http://docs.google.com/viewer?url=" . $row['pdf'] . ".pdf', '_blank', 'location=no');\">";
  echo "<div class=\"activatedbuttontable\" id=\"doclink\">";
  echo "<img class=\"resultbutton\" src=\"img/download.svg\" />";
  echo "<p class =\"buttontext\">H&auml;mta<br>dokument</p>";
  echo "</div>";
  echo "</a>";

  echo "<div id=\"commentlink\" class=\"activatedbuttontable\">";
  echo "<img class=\"resultbutton\" src=\"img/comments.svg\" />";
  echo "<p class =\"buttontext\">$commentCount</p>";
  echo "</div>";

  echo "<div class=\"activatedbuttontable\">";
  echo "<img class=\"resultbutton downvote\" src=\"img/downvote.svg\" />";
  echo "<p class =\"buttontext\">" . $row['downvotes'] . "</p>";
  echo "</div>";

  echo "<div class=\"activatedbuttontable\">";
  echo "<img class=\"activatedresultbutton upvote\" src=\"img/upvote.svg\" />";
  echo "<p class =\"buttontext\">" . $row['upvotes'] . "</p>";
  echo "</div>";

  echo "</div>";



  echo "<div class=\"comdiv\"></div>";

  echo "<div class=\"comments commenthide\" id=\"" . $row['dok_id'] . "\"></div>";

  echo "</div>";
  echo "</div>";
  echo "<div class=\"divisor\"></div>";
  }

mysqli_close($db);
?>
