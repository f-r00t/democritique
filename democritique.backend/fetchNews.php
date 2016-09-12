<?php

header('Content-Type: text/html; charset=utf-8');

include("db.php");

$page_number = $_POST["page"];

$item_per_page = 40;

$position = ($page_number * $item_per_page);

$result = mysqli_query($db,"SELECT * FROM `news` ORDER BY `news`.`date` DESC LIMIT $position, $item_per_page");

while($row = mysqli_fetch_array($result))
  {

  $id = $row['id'];
  $commentReq = mysqli_query($db, "SELECT COUNT(*) FROM comments WHERE dok_id = 'news$id'");
  $commentCount = mysqli_fetch_array($commentReq);
  $commentCount = $commentCount[0];


  echo "<div dbid=\"" . $row['id']  . "\" dok_id=\"news". $id . "\" class=\"result newsitem\">";
  echo "<div class=\"resultheader\">";
  echo "<p>" . htmlspecialchars(utf8_encode($row['title'])) . "<span class='domain'> (" . $row['domain'] . ")</span></p>";
  echo "</div>";
  echo "<div class=\"resultbody\">";
  echo "<div class=\"resultbodytext\">";
  echo "<p>" . $row['date'] . "</p>";
  echo "</div>";

  if ($row['img']) {

      echo "<img class=\"commenthide newsthumb\" src=\"" . $row['img'] . "\" />";


  }

  echo "<div class=\"reporttext commenthide timelinehide\">" . utf8_encode($row['description']) . "</div>";

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

  echo "<a href=\"#\" onclick=\"window.open('" . $row['link'] . "', '_blank', 'location=no');\">";
  echo "<div class=\"activatedbuttontable\" id=\"doclink\">";
  echo "<img class=\"resultbutton\" src=\"img/download.svg\" />";
  echo "<p class =\"buttontext\">L&auml;s mer</p>";
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

  echo "<div class=\"comments commenthide\" dok_id=\"news" . $row['id']  . "\"></div>";

  echo "</div>";
  echo "</div>";
  echo "<div class=\"divisor\"></div>";
  }

mysqli_close($db);
?>
