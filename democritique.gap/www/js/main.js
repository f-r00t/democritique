            function ajaxFetch() {

                $.post('http://10.0.0.2/sites/riksdagen/php/testtable.php',{'page': pageCount}, function(data) { //ajax command
               
                    $("#results").append(data); //append data received from server

                });
   
                pageCount++; //increment on page
            }




                alert("login in!");

                // User login

                var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID
                alert("user id:"+userID);

                if(! userID){ // If the cookie doesn't exist

                    var uuid = guid(); // Generates uniquish ID

                    window.localStorage.setItem("userID", uuid); // Create a new cookie with the genereted ID

                    addUser(uuid); // Ajax to upload data to database

                }else{

                    // getUserData(userID); // If user already exists, consider it logged in.
                
                };




                

                var pageCount = 0; //increment count for ajax download of entry posts

                //first download of posts when page is loaded

                $.post('http://10.0.0.2/sites/riksdagen/php/testtable.php',{'page': pageCount}, function(data) { //ajax command
               
                    $("#results").append(data); //append data received from server

                });
   
                pageCount++; //increment on page

                if( $("#results").height() <  $(window).height() ) {

                    $.post('http://10.0.0.2/sites/riksdagen/php/testtable.php',{'page': pageCount}, function(data) {
                           
                        $("#results").append(data); //append data received from server

               
                    pageCount++; //increment on page

                    })

                }

                $( document ).ajaxComplete(function() { // this binds the click function on results,
                                                        // and rewrites them each time an ajax
                    $(".result").unbind('click');

                    $(".upvote").unbind('click');       // request is made.

                    $(".upvote").click(function() {


                        dok_id = $(this).parent().parent().parent().parent().attr("dok_id");

                        $.post('http://10.0.0.2/sites/riksdagen/php/upvote.php',{'userid': userID, 'dok_id': dok_id}, function(data) {
                           

                        });



                    });

                    $(".downvote").unbind('click'); 

                    $(".downvote").click(function() {


                        dok_id = $(this).parent().parent().parent().parent().attr("dok_id");

                        $.post('http://10.0.0.2/sites/riksdagen/php/downvote.php',{'userid': userID, 'dok_id': dok_id}, function(data) {
                           

                        });



                    });

                    $("#closebutton").unbind('click');       // request is made.

                    $("#closebutton").click(function() {


                        dok_id = $(this).parent().parent().parent().parent().attr("dok_id");

                        $.post('http://10.0.0.2/sites/riksdagen/php/upvote.php',{'userid': userID, 'dok_id': dok_id}, function(data) {
                           

                        });


                    $(".result").click(function() {

                        // event.preventDefault();

                        // Expands the result div to accomodate further actions when pressed

                        height = $(window).height();
                        headerHeight = $("#header").css("height");
                        headerHeight = parseInt(headerHeight);
                        height = height - headerHeight;

                        $("#closebutton").fadeIn();
                        $("#closebutton").css('display','inline-block');
                        $("body").css('overflow-y','hidden');

                        $(this).find(".comdiv").animate({

                            width: '100%'

                        }, 800);

                        $(this).css("height",height);
                        $(this).find(".resultbody").css("height","90%");

                        
                        offset = $(this).offset().top;
                        offset = offset - headerHeight;
                        originalOffset = $('body').offset().top;

                        $('html, body').animate({
                            scrollTop: offset
                        }, 800);

                        dok_id = $(this).attr("dok_id");
                        $(this).find("#doclink").fadeIn();
                        $(this).find("#commentlink").fadeIn();
                        $(this).find("#doclink").css('display','inline-block');
                        $(this).find("#commentlink").css('display','inline-block');

                        $(this).find("#commentlink").unbind('click');
                        $(this).find("#commentlink").click(function() { 

                            $( this ).next().next().fadeOut();
                            commentTarget = $( this ).next();
                            $("#postcomment").clone().insertAfter(commentTarget);
                            $( this ).parent().find("#postcomment").fadeIn();

                            $(this).next().next().find("#postcommentbutton").click(function() { 

                                event.preventDefault();

                                commentText = $(this).parent().find("#commentfield").val();

                                $.post('http://10.0.0.2/sites/riksdagen/php/addcomment.php',{'userid': userID, 'commenttext': commentText, 'parent': 'none', 'dokid': dok_id}, function(data) {
                           
                                    alert("The comment has been sent, yao!");

                                })





                            });


                        });

                        // Comment retrieval $( this ).next().next().append("<p> this is cool, right?</p>");

                        dok_id = $(this).attr("dok_id");

                        commentclass = '#'+dok_id;

                        $.post('http://10.0.0.2/sites/riksdagen/php/comments.php',{'dok_id': dok_id}, function(data) {
                            event.stopPropagation();
                            alert('comments being read');
                            $(commentclass).append(data); //append data received from server

                        })

                    });

                    // $(".doclink").unbind('click');

                    // $(".doclink").click(function() {

                    //     // Clean-up of the viewportcontainer div

                    //     $('#viewportcontainer').contents().filter(function () {
                    //                 return this.id != "esc";
                    //         }).remove();

                    //     $("#viewportcontainer").animate({ scrollTop: 0 }, 10);


                    //     // Ajax-request for new article


                    //     dok_id = $(this).attr('id');
                    //     link = "http://data.riksdagen.se/dokument/"+dok_id;

                    //     // $("#viewport").attr("src",link);
                    //     $.get( link, function( data ) {

                    //         $("#viewportcontainer").append(data);

                    //     });
                    //     $("#viewportcontainer").fadeIn();
                        
                    // })

                $("#esc").click(function() {

                    $("#viewportcontainer").fadeOut();

                });

                  $(window).scroll(function() {   
                       if($(window).scrollTop() + $(window).height() == $(document).height()) {
                           
                            $.post('http://10.0.0.2/sites/riksdagen/php/testtable.php',{'page': pageCount}, function(data) {
                           
                                $("#results").append(data); //append data received from server
               
                            })

                            pageCount++; //increment on page


                       }
                    })


            });

