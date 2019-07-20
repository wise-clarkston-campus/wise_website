/*
$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var forum = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/Forum',
        data: forum,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().trim().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/Forum/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
*/