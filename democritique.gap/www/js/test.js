document.addEventListener("deviceready", function(){

    // Show spinner
    $('.load-bar').show();

	// User login

                var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID)


                if(! userID){ // If the cookie doesn't exist


                    var uuid = guid(); // Generates uniquish ID

                    window.localStorage.setItem("userID", uuid); // Create a new cookie with the genereted ID

                    addUser(uuid); // Ajax to upload data to database

                };

                // else{

                //     getUserData(userID); // If user already exists, consider it logged in.

                // };



                //first download of posts when page is loaded

                // $.post('http://lingon.funkar.nu/sites/riksdagen/php/fetchReports.php',{'page': pageCount}, function(data) { //ajax command
                //
                //     $("#results").append(data); //append data received from server
                //     clickHandlers();
                //     colorizeResults();
                //     $('.load-bar').hide();
                //     pageCount++; //increment on page
                //
                // });

    var pageCount = 0; //increment count for ajax download of entry posts
    var currentDocType = 'reports'; //currently chosen type of documents to be fetched
    var currentSorting = 'date'; //currently chosen type of sorting for said documents

    getPosts(currentDocType, currentSorting, pageCount);
    pageCount++;


    $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() == $(document).height()) {

         $('.load-bar').show();

           getPosts(currentDocType, currentSorting, pageCount);
           pageCount++;
       }
    });




});
