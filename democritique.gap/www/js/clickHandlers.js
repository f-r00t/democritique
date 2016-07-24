function colorizeComments() {


    $("."+commentclass).find('.comment').each(function () {

        var random = Math.floor((Math.random() * 10) + 1);
        var randomColor = '';


        switch (random){
            case 1:
                randomColor = '#F44336'; // Red
                break;
            case 2:
                randomColor = '#E91E63'; // Pink
                break;
            case 3:
                randomColor = '#9C27B0'; // Purple
                break;
            case 4:
                randomColor = '#3F51B5'; // Indigo
                break;
            case 5:
                randomColor = '#009688'; // Teal
                break;
            case 6:
                randomColor = '#4CAF50'; // Green
                break;
            case 7:
                randomColor = '#CDDC39'; // Lime
                break;
            case 8:
                randomColor = '#FF9800'; // Orange
                break;
            default:
                randomColor = '#607D8B' // Grey
        }


        $(this).css('border-left-color',randomColor);
    });
}

function colorizeResults() {


    $('.result').each(function () {

        var random = Math.floor((Math.random() * 10) + 1);
        var randomColor = '';


        switch (random){
            case 1:
                randomColor = '#F44336'; // Red
                break;
            case 2:
                randomColor = '#E91E63'; // Pink
                break;
            case 3:
                randomColor = '#9C27B0'; // Purple
                break;
            case 4:
                randomColor = '#3F51B5'; // Indigo
                break;
            case 5:
                randomColor = '#009688'; // Teal
                break;
            case 6:
                randomColor = '#4CAF50'; // Green
                break;
            case 7:
                randomColor = '#CDDC39'; // Lime
                break;
            case 8:
                randomColor = '#FF9800'; // Orange
                break;
            default:
                randomColor = '#607D8B' // Grey
        }


        $(this).css('border-left-color',randomColor);
    });
}

function closeButton() {

    // Remove previously added extra UI elements
    $('#closebutton').click(function(){

            $( this ).unbind('click');
            $('.activatedresult').find(".comdiv").fadeOut();
            $('#'+dok_id).fadeOut();

            $('.activatedresult').find(".comdiv").animate({

                width: '0%'

            }, 800);

            $('.activatedresult').find(".activatedresultbuttons").fadeOut();

        // Div size variables for resizing

            height = $(window).height();
            headerHeight = $("#header").css("height");
            headerHeight = parseInt(headerHeight);
            height = height - headerHeight;

        $('.activatedresult').animate({
            top: scrollDist,
            height: originalHeight
          }, 800, function() {
            // Animation complete.

            // Re-size div

            $('.activatedresult').find('.resultbody').css('height',originalHeightBody);
            $('.activatedresult').find('.resultbody').css('margin-bottom','-40px');


            $("#closebutton").fadeOut(); // No more escape routes!

            // Re-activate scrolling for results div (the list)
            // document.getElementById('results').removeEventListener('touchmove', stopScroll, false);
            // document.getElementById('bodyid').removeEventListener('touchmove', stopScroll, false);

            // Scroll back


            // $('html, body').animate({
            //     scrollTop: offset
            // }, 800);

            $('.activatedresult').removeAttr('style');
            $('.activatedresult').find('.resultbody').removeAttr('style');


            $('.activatedresult').css('height',originalHeight);
            $('.activatedresult').find('.resultbody').css('height', originalHeightBody);

            $('.activatedresult').find('.reporttext').hide();

            $('.'+dok_id).removeClass(dok_id);


            $('.activatedresult').remove();
            $('#bodyid').css('overflow-y','scroll');

            clickHandlers()

        });
    });


}

function commentButtons() {

    var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID)

    $(".comdown").unbind('click');
        $(".comdown").click(function() { // Activate functionality on upvote button
            $('.load-bar').show(); 
            $(this).unbind('click');
            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes
            comment_id = $(this).parent().parent().parent().attr('comment_id');
            $(this).parent().parent().parent().addClass('activatedcomment');

            $.post('http://lingon.funkar.nu/sites/riksdagen/php/comdownvote.php',{'user_id': userID, 'comment_id': comment_id}, function(data) { // Send upvote
                currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes

                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                    $('.activatedcomment').find('.comup').next().addClass('votingSubtractClass');

                    currentVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                    currentVoteCount = parseInt(currentVoteCount)-1; // Remove old vote

                    $('.votingSubtractClass').text(currentVoteCount); // Set new amount of upvotes
                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class


                }

                $('.votingOperationClass').removeClass('votingOperationClass'); 

                $('.activatedcomment').removeClass('activatedcomment');
                
                $('.load-bar').hide();

            });


        });

    $(".comup").unbind('click');
        $(".comup").click(function() { // Activate functionality on upvote button
            $('.load-bar').show(); 
            $(this).unbind('click');
            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes
            comment_id = $(this).parent().parent().parent().attr('comment_id');

            $(this).parent().parent().parent().addClass('activatedcomment');

            $.post('http://lingon.funkar.nu/sites/riksdagen/php/comupvote.php',{'user_id': userID, 'comment_id': comment_id}, function(data) { // Send upvote
                currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes

                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                    $('.activatedcomment').find('.comdown').next().addClass('votingSubtractClass');

                    currentVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                    currentVoteCount = parseInt(currentVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

                    $('.votingSubtractClass').text(currentVoteCount); // Set new amount of downvotes
                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class


                }

                $('.votingOperationClass').removeClass('votingOperationClass'); 

                $('.activatedcomment').removeClass('activatedcomment');
                
                $('.load-bar').hide();

            });


        });

}

function clickHandlers() { // this binds the click function on results,


                    var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID)

                    $('#menubutton').click(function(){

                        $('#menu').animate({
                            left: '0'
                          }, 800);
                    
                    });

                    $('#menuclosebutton').click(function(){

                        $('#menu').animate({
                            left: '-55%'
                          }, 800);
                    
                    });


                    $(".result").unbind('click');
                    $(".result").click(function() { // When any result is clicked

                        $(this).unbind('click');
                        $('.load-bar').show(); // Show loadbar while getting extra data

                        $( this ).clone().appendTo( "#bodyid" ).addClass('activatedresult'); // Clone clicked result

                         // Add extra class for clicked div

                        // $(this).addClass('activatedresult');
                        // $(this).removeAttr('style');

                        $('#bodyid').css('overflow-y','hidden');
                        

                        dok_id = $(this).attr("dok_id"); // The currently read results ID
                        $(this).addClass(dok_id);


                        // $('.activatedresult').find(".upvote").unbind('click');
                        $('.activatedresult').find(".upvote").click(function() { // Activate functionality on upvote button
                            $('.load-bar').show(); 
                            $(this).unbind('click');
                            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes

                            $.post('http://lingon.funkar.nu/sites/riksdagen/php/upvote.php',{'user_id': userID, 'dok_id': JSON.stringify(dok_id)}, function(data) { // Send upvote

                                currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes

                                $('.'+dok_id).find('.upvote').next().text(currentVoteCount); // Also for the original result in the list

                                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                                    $('.activatedresult').find('.downvote').next().addClass('votingSubtractClass');

                                    currentSubVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                                    currentSubVoteCount = parseInt(currentVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

                                    $('.votingSubtractClass').text(currentSubVoteCount); // Set new amount of downvotes
                                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class
                                    $('.'+dok_id).find('.downvote').next().text(currentSubVoteCount);

                                }

                                $('.votingOperationClass').removeClass('votingOperationClass'); 
                                
                                $('.load-bar').hide();

                            });


                        });

                        $('.activatedresult').find(".downvote").unbind('click');
                        $('.activatedresult').find(".downvote").click(function() { // Activate functionality on upvote button
                            $('.load-bar').show(); 
                            $(this).unbind('click');
                            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes

                            $.post('http://lingon.funkar.nu/sites/riksdagen/php/downvote.php',{'user_id': userID, 'dok_id': JSON.stringify(dok_id)}, function(data) { // Send upvote

                                currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes
                                $('.'+dok_id).find('.downvote').next().text(currentVoteCount);

                                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                                    $('.activatedresult').find('.upvote').next().addClass('votingSubtractClass');

                                    currentSubVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                                    currentSubVoteCount = parseInt(currentSubVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

                                    $('.votingSubtractClass').text(currentSubVoteCount); // Set new amount of upvotes
                                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class
                                    $('.'+dok_id).find('.upvote').next().text(currentSubVoteCount);


                                }

                                $('.votingOperationClass').removeClass('votingOperationClass'); 
                                
                                $('.load-bar').hide();

                            });


                        });

                        $('.activatedresult').find('.first').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.reporttext').fadeOut();
                            $('.activatedresult').find('.docrefs').fadeIn();
                            $('.activatedresult').find('.debatetext').fadeOut();
                            $('.activatedresult').find('.videodome').fadeOut();
                            $('.activatedresult').find('.videodome').remove();

                            $('.activatedresult').find('.docrefs').attr('id','activateddocrefs');

                            var element = document.getElementById("activateddocrefs");

                            if (element.offsetHeight < element.scrollHeight ||
                                element.offsetWidth < element.scrollWidth) {
                                $('#activateddocrefs').addClass('longdocrefs');
                                $('.activatedresult').find('.expander').fadeIn();
                                $('.activatedresult').find('.expander').click(function(){
                                    $('#activateddocrefs').toggleClass('longdocrefs');
                                    // $(this).removeClass('activatedreporttext');
                                    $('#activateddocrefs').toggleClass('extendeddocrefs');

                            });

                        }

                        });

                        $('.activatedresult').find('.second').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.reporttext').fadeIn();
                            $('.activatedresult').find('.docrefs').fadeOut();
                            $('.activatedresult').find('.debatetext').fadeOut();
                            $('.activatedresult').find('.videodome').fadeOut();
                            $('.activatedresult').find('.videodome').remove();

                        });

                        $('.activatedresult').find('.third').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.reporttext').fadeOut();
                            $('.activatedresult').find('.docrefs').fadeOut();
                            $('.activatedresult').find('.debatetext').fadeIn();
                            width = $(window).width();
                            if ( !$( ".videodome" ).length ) {
 
                                $('.activatedresult').find('.debatetext').after('<iframe class="videodome" src="https://www.riksdagen.se/views/pages/embedpage.aspx?did=' + dok_id + '" width="' + (width*0.9) + '" height="' + (width*0.5) + '" allowfullscreen=""></iframe>');
                             
                            }
                            e.stopPropagation();
                        });

                        $('.activatedresult').find('.fourth').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.reporttext').fadeOut();
                            $('.activatedresult').find('.docrefs').fadeOut();
                            $('.activatedresult').find('.debatetext').fadeOut();
                            $('.activatedresult').find('.videodome').fadeOut();
                            $('.activatedresult').find('.videodome').remove();
                            $('.activatedresult').find('.decision').fadeIn();
                            

                        });


                        // Expands the result div to accomodate further actions when pressed

                        // $( this ).css('height','100%');


                        $.post('http://lingon.funkar.nu/sites/riksdagen/php/fetchDocRefs.php',{'dok_id': JSON.stringify(dok_id)}, function(data) { // Get related documents

                            $('.activatedresult').find('.resultbuttons').before(data);

                            $('.activatedresult').find(".docref").click(function() {

                                pdfUrl = $(this).attr('pdf');
                                window.open(pdfUrl);

                            });

                        });

                        height = $(window).height();
                        headerHeight = $("#header").css("height");
                        headerHeight = parseInt(headerHeight);
                        height = height - headerHeight;

                        originalHeight = $(this).height();
                        originalHeightBody = $(this).find('.resultbody').height();

                        // Adds an escape route

                        $("#closebutton").fadeIn();

                        $('.activatedresult').find('.activatedresultbuttons').fadeIn();
                        $(".activatedresult").find('.resultbuttons').fadeOut();

                        $(".activatedresult").find('.timeline').fadeIn();

                        $('.activatedresult').find('.reporttext').show();
                        $('.activatedresult').find('.reporttext').attr('id','specialreport');
                        $('.activatedresult').find('.reporttext').addClass('activatedreporttext');
                        $('.activatedreporttext').wrapInner('<p></p>');


                        var element = document.getElementById("specialreport");

                        if (element.offsetHeight < element.scrollHeight ||
                            element.offsetWidth < element.scrollWidth) {
                            $('.activatedresult').find('.reporttext').addClass('longreporttext');
                            $('.activatedreporttext').click(function(){
                                $(this).toggleClass('longreporttext');
                                // $(this).removeClass('activatedreporttext');
                                $(this).toggleClass('extendedreporttext')

                            });

                        }

                        $('.activatedresult').find('.decision').attr('id','specialdecision');
                        $('.activatedresult').find('.decision').addClass('activateddecision');


                        $('.activateddecision').click(function(){
                                $(this).toggleClass('longdecision');
                                // $(this).removeClass('activatedreporttext');
                                $(this).toggleClass('extendeddecision')

                            });

                        
                        // Locks scroll position in place

                        // var stopScroll = function(e) {
                        //     e.preventDefault();
                        // };

                        // document.getElementById('results').addEventListener('touchmove', stopScroll, false);
                        // document.getElementById('bodyid').addEventListener('touchmove', stopScroll, false);
                        

                        // $(this).find('.comments').attr('id','coolcomments');
                        // document.getElementById('coolcomments').addEventListener('touchmove', function(e){e.stopPropagation()}, false);

                        $('.activatedresult').on('touchmove',function(e){
                            if(!$('.comments').has($(e.target)).length){
                                e.preventDefault();
                            }
                            if(!$('.extendeddocrefs').has($(e.target)).length){
                                e.preventDefault();
                            }
                        });


                        // $(document).on("touchmove", function(e) { e.preventDefault() }); $(document).on("touchmove", ".comments", function(e) { e.stopPropagation() });

                        // Invites some extra UI elements to the party

                        $('.activatedresult').find(".comdiv").fadeIn();                        

                        $('.activatedresult').find(".comdiv").animate({

                            width: '100%'

                        }, 800);

                        

                        // $('.activatedresult').find("#doclink").fadeIn();
                        // $('.activatedresult').find("#commentlink").fadeIn();
                        // $('.activatedresult').find("#doclink").css('display','inline-block');
                        // $('.activatedresult').find("#commentlink").css('display','inline-block');

                        // Let's make this div the right size, shall we?

                        $('.activatedresult').css("height",height);


                        $('.activatedresult').find(".resultbody").css("height","90%");

                        
                        offset = $(this).offset().top;
                        offset = offset - headerHeight;
                        originalOffset = $('body').offset().top;

                        // $('html, body').animate({
                        //     scrollTop: offset
                        // }, 800);

                        scrollingDist = $(window).scrollTop();
                        scrollDist = $( this ).offset().top;
                        scrollDist = parseInt(scrollDist)-parseInt(scrollingDist);

                        $('.activatedresult').css('top',scrollDist);

                        $('.activatedresult').css({
                          "position": "fixed",
                          "z-index": "9"
                        });

                        $('.activatedresult').animate({
                            top: "48px"
                          }, 800, function() {
                            // Animation complete.
                        });

                        // Add extra class for this results specific comments

                        commentclass = 'comments'+dok_id;
                        $('.activatedresult').find('.comments').addClass(commentclass);


                        // Click function for the comment-button


                        $('.activatedresult').find("#commentlink").unbind('click');
                        $('.activatedresult').find("#commentlink").click(function() { 


                            // Hijack the close button for an escape route from "comment writing mode"
                            $('#closebutton').unbind('click');
                            $('#closebutton').click(function(){


                                $('.activatedresult').find('.resultbodytext').fadeIn();
                                $('.activatedresult').find('.activatedresultbuttons').fadeIn();
                                $('.activatedresult').find('#postcomment').fadeOut();
                                $('.activatedcomments').fadeIn();
                                $('.activatedresult').find('.timeline').fadeIn();

                                closeButton()

                                

                            });


                            // Removes the read comments to accomodate comment form

                            $('.activatedresult').find('.comments').addClass('activatedcomments');
                            $('.activatedcomments').fadeOut();


                            // Comment writing mode

                            $('.activatedresult').find('.resultbodytext').fadeOut();
                            $('.activatedresult').find('.resultbuttons').fadeOut();
                            $('.activatedresult').find('.timeline').fadeOut();



                            // Clone and insert comment form

                            commentTarget = $('.activatedresult').find('.comdiv');
                            $("#postcomment").clone().insertAfter(commentTarget);
                            $('.activatedresult').find("#postcomment").fadeIn();

                            // Submit function of comment form

                            $('.activatedresult').find(".commentform").submit(function(e) { 

                                $('.load-bar').show(); // Loading...

                                e.preventDefault();

                                commentText = $(this).find("#commentfield").val(); // Get the comment text

                                if (/\S/.test(commentText)) { // string is not empty and not just whitespace


                                    $('.activatedresult').find('#postcomment').fadeOut(); // Away with the form!
                                    $('.activatedresult').find('#postcomment').remove();

                                    $('html, body').animate({ // UI-hotfix for scrolling back after comment has been sent
                                        scrollTop: offset
                                    }, 800);

                                    var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID

                                    // Post comment

                                    $.post('http://lingon.funkar.nu/sites/riksdagen/php/addcomment.php',{'userid': userID, 'commenttext': JSON.stringify(encodeURIComponent(commentText)), 'parent': 'none', 'dok_id': JSON.stringify(dok_id)}, function(data) {
                                        $.post('http://lingon.funkar.nu/sites/riksdagen/php/comments.php',{'dok_id': dok_id}, function(data) {

                                                $("."+commentclass).empty(); // Remove old data
                                                $("."+commentclass).append(data); // Append data received from server
                                                colorizeComments()
                                                commentButtons()
                                            })

                                        $('.load-bar').hide(); // Post completed!
                                        $('.activatedcomments').fadeIn(); // Get those comments back!

                                    });

                                    // Comment writing mode deactivated

                                    $('.activatedresult').find('.resultbodytext').fadeIn();
                                    $('.activatedresult').find('.timeline').fadeIn();
                                    

                                }else{

                                    $('#commentfield').attr('placeholder','Du har inte skrivit något, pröva igen!');
                                    $('.load-bar').hide();

                                };


                            });

                        });
                        
                        // Get comments

                        $.post('http://lingon.funkar.nu/sites/riksdagen/php/comments.php',{'dok_id': dok_id}, function(data) {

                           
                            $("."+commentclass).append(data); //append data received from server

                            $("."+commentclass).fadeIn();

                            colorizeComments()
                            commentButtons()

                            $('.load-bar').hide(); // Fetching of comments completed!

                        })



                        // Close result view



                        closeButton()




                        });

};