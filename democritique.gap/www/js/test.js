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

    var pageCount = 0; //increment count for ajax download of entry posts
    var currentDocType = 'reports'; //currently chosen type of documents to be fetched
    var currentSorting = 'date'; //currently chosen type of sorting for said documents

    getPosts(currentDocType, currentSorting, pageCount); // New content
    pageCount++; // Increment indexing variable


    $(window).scroll(function() { // When user scrolls to the bottom
       if($(window).scrollTop() + $(window).height() == $(document).height()) {

         $('.load-bar').show();

           getPosts(currentDocType, currentSorting, pageCount); // New content
           pageCount++;
       }
    });




});
