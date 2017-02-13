document.addEventListener("deviceready", function(){

    // StatusBar.styleLightContent();


    // if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    //
    //   $('#header').css('border-top','20px solid black');
    //   $('#results').css('padding-top','80px');
    //   $('#menu').css('padding-top','20px');
    //
    // }



    function handleOpenURL(url) {
      setTimeout(function() {
        alert("received url: " + url);
      }, 0);

      urlSplit = url.split('//');
      fullReq = urlSplit[1].split('=');
      functionReq = fullReq[0];
      targetReq = fullReq[1];

      alert(targetReq);

      openArticle(targetReq)
    }

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
    getStartPage(); // New content

    if (tablet) {

      $(window).scroll(function() { // When user scrolls to the bottom
         if($(window).scrollTop() + $(window).height() == $(document).height() && !$('.newstext').length) {

           $('.load-bar').show();


            if(uistate == 'decisions') {

             getPosts(currentDocType, currentSorting, pageCount); // New content
             pageCount++;

           } else if (uistate == 'news') {

             getNews(pageCount);
             pageCount++;
           } else if (uistate == 'bills') {

             $('.load-bar').remove();

           }

         }
      });

    } else {

    $(window).scroll(function() { // When user scrolls to the bottom
       if($(window).scrollTop() + $(window).height() == $(document).height() && !$('.activatedresult').length && !$('.newstext').length) {

         $('.load-bar').show();


          if(uistate == 'decisions') {

           getPosts(currentDocType, currentSorting, pageCount); // New content
           pageCount++;

         } else if (uistate == 'news') {

           getNews(pageCount);
           pageCount++;
         } else if (uistate == 'bills') {

           $('.load-bar').remove();

         }

       }
    });

  }




});
