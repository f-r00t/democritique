function openArticle(documentID){

  alert("Opening "+documentID);

  var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID)

  menuButton();

  clickHandlers();



  // Removes old opened results for tablet UI
  $(".activatedresult").addClass("removeNow").removeClass("activatedresult");
  $(".activatedresult").width("50%");


  $uistate = "activeresult";


  $(".load-bar").show(); // Show loadbar while getting extra data



  $(".activatedresult").unbind("click");

  getPost(documentID);

  $(".activatedresult").each(function(){

      if(!$(this).hasClass("animatedclass")){

        $(this).css("-webkit-mask-image","none");

      }

  });

  if ($("body").width()>=768) { // IF TABLET

    $("#results").animate({

        width: "50%"

    }, 500);

  } else { // IF PHONE

    $("#results").fadeOut();

  }
   // Add extra class for clicked div

  // $(this).addClass("activatedresult");
  // $(this).removeAttr("style");

  // $("#bodyid").css("overflow-y","hidden");


  dok_id = $(".activatedresult").attr("dok_id"); // The currently read results ID
  $(".activatedresult").addClass(dok_id);

  $.post("http://harryboy.hemsida.eu/php/fetchDocRefs.php",{"dok_id": JSON.stringify(dok_id)}, function(data) { // Get related documents

      $(".activatedresult").find(".activatedresultbuttons").before(data);

      $(".activatedresult").find("docref").remove();

      $(".first").css("pointer-events", "auto");

  });


  // $(".activatedresult").find(".upvote").unbind("click");
  $(".activatedresult").find(".upvote").click(function() { // Activate functionality on upvote button
      $(".load-bar").show();
      $(this).unbind("click");
      $(this).next().addClass("votingOperationClass"); // Add extra class to the <p> holding amount of votes

      $.post("http://harryboy.hemsida.eu/php/upvote.php",{"user_id": userID, "dok_id": JSON.stringify(dok_id)}, function(data) { // Send upvote

          var currentVoteCount = $(".votingOperationClass").text(); // Get current amount of votes

          currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

          $(".votingOperationClass").text(currentVoteCount); // Set new amount of upvotes

          $("."+dok_id).find(".upvote").next().text(currentVoteCount); // Also for the original result in the list

          if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

              $(".activatedresult").find(".downvote").next().addClass("votingSubtractClass");

              var currentSubVoteCount = $(".votingSubtractClass").text(); // Get current amount of votes

              currentSubVoteCount = parseInt(currentSubVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

              $(".votingSubtractClass").text(currentSubVoteCount); // Set new amount of downvotes
              $(".votingSubtractClass").removeClass("votingSubtractClass"); // Remove class
              $("."+dok_id).find(".downvote").next().text(currentSubVoteCount);

          }

          $(".votingOperationClass").removeClass("votingOperationClass");

          $(".load-bar").hide();

      });


  });

  $(".activatedresult").find(".downvote").unbind("click");
  $(".activatedresult").find(".downvote").click(function() { // Activate functionality on upvote button
      $(".load-bar").show();
      $(this).unbind("click");
      $(this).next().addClass("votingOperationClass"); // Add extra class to the <p> holding amount of votes

      $.post("http://harryboy.hemsida.eu/php/downvote.php",{"user_id": userID, "dok_id": JSON.stringify(dok_id)}, function(data) { // Send upvote

          var currentVoteCount = $(".votingOperationClass").text(); // Get current amount of votes

          currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

          $(".votingOperationClass").text(currentVoteCount); // Set new amount of upvotes
          $("."+dok_id).find(".downvote").next().text(currentVoteCount);

          if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

              $(".activatedresult").find(".upvote").next().addClass("votingSubtractClass");

              var currentSubVoteCount = $(".votingSubtractClass").text(); // Get current amount of votes

              currentSubVoteCount = parseInt(currentSubVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

              $(".votingSubtractClass").text(currentSubVoteCount); // Set new amount of upvotes
              $(".votingSubtractClass").removeClass("votingSubtractClass"); // Remove class
              $("."+dok_id).find(".upvote").next().text(currentSubVoteCount);


          }

          $(".votingOperationClass").removeClass("votingOperationClass");

          $(".load-bar").hide();

      });


  });

  $(".activatedresult").find(".first").click(function(){

      $(".activatedresult").find(".active").removeClass("active");
      $(this).addClass("active");
      $(".activatedresult").find(".timelinehide").fadeOut();
      $(".activatedresult").find(".docrefs").fadeIn();
      $(".activatedresult").find(".videodome").remove();

  });

  $(".activatedresult").find(".second").click(function(){

      $(".activatedresult").find(".active").removeClass("active");
      $(this).addClass("active");
      $(".activatedresult").find(".timelinehide").fadeOut();
      $(".activatedresult").find(".videodome").remove();
      $(".activatedresult").find(".reporttext").fadeIn();

  });

  $(".activatedresult").find(".third").click(function(){

      $(".activatedresult").find(".active").removeClass("active");
      $(this).addClass("active");
      $(".activatedresult").find(".timelinehide").fadeOut();
      $(".activatedresult").find(".debatetext").fadeIn();

      if ($("body").width()>=768) { // IF TABLET

        width = $(window).width()/2;

      }else{

        width = $(window).width();

      }

      $(".activatedresult").find(".videodome").remove();
      if ( !$( ".videodome" ).length ) {

          $(".activatedresult").find(".debatetext").after("<iframe class='videodome commenthide timelinehide' src='https://www.riksdagen.se/views/pages/embedpage.aspx?did=" + dok_id + "' width='" + (width*0.9) + "' height='" + (width*0.5) + "' allowfullscreen='true'></iframe>");

      }

      e.stopPropagation();
  });

  window.addEventListener("orientationchange", function(e) {
    // Announce the new orientation number

    e.preventDefault();

    switch(window.orientation)
    {
      case 90:

              $( ".videodome" ).css({
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                margin: "0",
                zIndex: "998",
                border: "none"

              });
              $("#header").animate({

                  top: "-20%"

              }, 500);
              break;
      case 0:

              $( ".videodome" ).attr("style","");

              $("#header").animate({

                  top: "0"

              }, 500);
      default:
              $( ".videodome" ).attr("style","");

              $("#header").animate({

                  top: "0"

              }, 500);
      }

  }, false);

  $(".activatedresult").find(".fourth").click(function(){

      $(".activatedresult").find(".active").removeClass("active");
      $(this).addClass("active");
      $(".activatedresult").find(".timelinehide").fadeOut();
      $(".activatedresult").find(".videodome").remove();

      var decisionID = $(".activatedresult").attr("decisionid");

      if (decisionID) {

        $(".activatedresult").find(".decision").before("<iframe class="videodome commenthide timelinehide" src="https://www.riksdagen.se/views/pages/embedpage.aspx?did=" + decisionID + "" width="" + (width*0.9) + "" height="" + (width*0.5) + "" allowfullscreen="true"></iframe>");

      }

      $(".activatedresult").find(".decision").fadeIn();


  });


  // Expands the result div to accomodate further actions when pressed

  // $( this ).css("height","100%");


  $(".first").css("pointer-events", "none");
  //do something





  height = $(window).height();
  headerHeight = $("#header").css("height");
  headerHeight = parseInt(headerHeight);
  height = height - headerHeight;

  originalHeight = $(this).height();
  originalHeightBody = $(this).find(".resultbody").height();

  // Adds an escape route

  $("#closebutton").fadeIn();

  $(".activatedresult").find(".activatedresultbuttons").fadeIn();
  $(".activatedresult").find(".resultbuttons").remove();

  $(".activatedresult").find(".timeline").fadeIn();

  $(".activatedresult").find(".reporttext").show();
  $(".activatedresult").find(".reporttext").attr("id","specialreport");
  $(".activatedresult").find(".reporttext").addClass("activatedreporttext");
  $(".activatedreporttext").wrapInner("<p></p>");



  $(".activatedresult").find(".comdiv").fadeIn();

  $(".activatedresult").find(".comdiv").stop().animate({

      width: "100%"

  }, 800);

  // Let"s make this div the right size, shall we?

  $(".activatedresult").css("height",height);

  $(".activatedresult").find(".resultbody").css("height","90%");

  offset = $(this).offset().top;
  offset = offset - headerHeight;
  originalOffset = $("body").offset().top;

  scrollingDist = $(window).scrollTop();
  scrollDist = $( this ).offset().top;
  scrollDist = parseInt(scrollDist)-parseInt(scrollingDist);

  if (scrollDist < 0) {

    scrollDist = "53px";

  }

  $(".activatedresult").css("top",scrollDist);

  $(".activatedresult").css({
    "position": "fixed",
    "z-index": "9"
  });

  toBeScrolled = (scrollDist-48);
  translation = "translateY(-"+toBeScrolled+")";
  translationBack = "+=translateY("+toBeScrolled+")";

  $(".activatedresult").addClass("animated");

  $(".activatedresult").stop().animate({
      transform: translation
    }, 800, function() {
      // Animation complete.
      $(".removeNow").remove();
      $(".activatedresult").removeClass("animated");
  });

  // Add extra class for this results specific comments

  commentclass = "comments"+dok_id;
  $(".activatedresult").find(".comments").addClass(commentclass);
  $(".activatedresult").find(".comments").css("padding-bottom", "60px");


  // Click function for the comment-button


  $(".activatedresult").find("#commentlink").unbind("click");
  $(".activatedresult").find("#commentlink").click(function() {


      // Comment writing mode")

      $("#results").css("overflow-y","hidden");
      $("#results").css("height","100%");

      var $j = 0;

      $(".activatedresult").find(".commenthide").each(function() {

        $commenthideHeights[$j] = $(this).height();
        $j++;

    });

      $(".activatedresult").find(".commenthide").stop().animate({
        "height":"0",
        "opacity":"0"
      },500);

      // $(".activatedresult").find("reporttext").delay(100).fadeOut();
      $(".activatedresult").find(".commenthide").delay(500).fadeOut();
      $uistate = "writing";


      // Clone and insert comment form
      $(".activatedresult").find("#postcomment").remove();
      commentTarget = $(".activatedresult").find(".comdiv");
      $("#postcomment").clone().insertAfter(commentTarget);
      $(".activatedresult").find("#postcomment").fadeIn();

      // Submit function of comment form

      $(".activatedresult").find(".commentform").submit(function(e) {

          $(".load-bar").show(); // Loading...

          e.preventDefault();

          commentText = $(this).find("#commentfield").val(); // Get the comment text

          if (/\S/.test(commentText)) { // string is not empty and not just whitespace


              $(".activatedresult").find("#postcomment").fadeOut(); // Away with the form!
              $(".activatedresult").find("#postcomment").remove();

              $("html, body").stop().animate({ // UI-hotfix for scrolling back after comment has been sent
                  scrollTop: offset
              }, 800);

              var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID

              // Post comment

              $.post("http://harryboy.hemsida.eu/php/addcomment.php",{"userid": userID, "commenttext": JSON.stringify(encodeURIComponent(commentText)), "parent": "none", "dok_id": JSON.stringify(dok_id)}, function(data) {
                  $.post("http://harryboy.hemsida.eu/php/comments.php",{"dok_id": dok_id}, function(data) {

                          $("."+commentclass).empty(); // Remove old data
                          $("."+commentclass).append(data); // Append data received from server
                          colorizeComments();
                          commentButtons()
                      })

                  $(".load-bar").hide(); // Post completed!

                  onBackKeyDown($commenthideHeights);

              });

              // Comment writing mode deactivated

              $(".activatedresult").find(".resultbodytext").fadeIn();
              $(".activatedresult").find(".reporttext").fadeIn();
              $(".activatedresult").find(".timeline").fadeIn();
              $(".activatedresult").find(".activatedresultbuttons").fadeIn();


          }else{

              $("#commentfield").attr("placeholder","Du har inte skrivit något, pröva igen!");
              $(".load-bar").hide();

          };


      });

  });

  // Get comments

  $.post("http://harryboy.hemsida.eu/php/comments.php",{"dok_id": dok_id}, function(data) {


      $("."+commentclass).append(data); //append data received from server

      $("."+commentclass).fadeIn();

      colorizeComments();
      commentButtons()

      $(".load-bar").hide(); // Fetching of comments completed!

  })



  // Close result view



  closeButton()




  });
