$(function(){

  function cardFlip() {
    var $card = $(this).parent();
    if ($card.hasClass('flip')) {
      return $card.removeClass('flip');
    } else {
      return $card.addClass('flip');
    }
  }

  $('.home-search-form').on('submit', function() {
    $(this).addClass('fading');
    $('.loading').addClass('visible');
  })

  $('.movie-display .poster').on('click', cardFlip);
  $('.movie-display .details').on('click', cardFlip);




  if($('.poster').attr('src') === 'N/A') {
    $('.show-add').hide();
    $('.show-remove').hide();
    $('.poster').remove();
    $('.no-image').text('No image available').css('margin','10em')
  }

  if($('#last-p').text() === ': N/A') {
    $('#last-p').remove();
    $('#tomato-image').remove();
  }
  $('.detail').each(function(){
    if($(this).text().indexOf('N/A') !== -1){
      $(this).remove();
    }
  })

  var tomatoRatingString = $('#last-p').text().substr(2);
  var tomatoRating = parseInt(tomatoRatingString);

  $('.favorites-button').on('submit',function(e){
    e.preventDefault();
    var thisUrl = $(this).attr('action');
    var thisData = $(this).serialize();
    $.ajax({
      method: 'post',
      url: thisUrl,
      data: thisData
    }).done(function(data){
      console.log('saved',data);
      $('.show-add').addClass('hidden');
      $('.show-remove').removeClass('hidden');
    })
  })

  $('.fav-remove').on('click',function(e){
    e.preventDefault();
    var btnDel = $(this);
    var thisUrl = $(this).attr('href');

    $.ajax({
      method: 'delete',
      url: thisUrl,
    }).done(function(data){
      $('.modal').modal('hide');
      btnDel.closest('li').fadeOut('slow',function(){
        $(this).remove();
      });
    })
  })


  $('.show-remove').on('click',function(e){
    e.preventDefault();
    var thisUrl = $(this).attr('href');
    $.ajax({
      method: 'delete',
      url: thisUrl
    }).done(function(data){
      console.log(data);
      $('.show-remove').addClass('hidden');
      $('.show-add').removeClass('hidden');
    })
  })


  $('.modal form').on('submit',function(e){
    e.preventDefault();
    var thisUrl = $(this).attr('action');
    var thisData = $(this).serialize();
    var modalBody = $(this).closest('.modal').find('.modal-body');
    console.log(thisData);
    $.ajax({
      method: 'post',
      url: thisUrl,
      data: thisData
    }).done(function(data){
      console.log(data);
      var myComment = $('<h4 class="user-comment">');
      myComment.text('"' + data.comment.comment + '"');
      myComment.appendTo(modalBody);
      $('.form-control').val('');
    })
  })


  $('.modal').on('shown.bs.modal', function () {
      $('.couchcomment').focus();
  })

})