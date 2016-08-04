alert('loaded');

function getPosts(type, sorting, pageCount) {

  $.post('http://lingon.funkar.nu/sites/riksdagen/php/fetchReports.php',{'page': pageCount, 'type': type, 'sorting': sorting}, function(data) { //ajax command

      $("#results").append(data); //append data received from server
      clickHandlers();
      colorizeResults();
      $('.load-bar').hide();

  });

}
