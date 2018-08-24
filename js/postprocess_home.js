// Copyright 2018 Dominik Reichl
$(document).ready(function() {
  $("h2").each(function(i) {
    var heading = $(this);
    var headingtext = heading.text().toLowerCase().trim().replace(/[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/[ ]/g,"-");
    heading.attr("id",headingtext );
    heading.wrap( "<a href='#" + headingtext + "' class='hash'></a>" );
  });
  $("img").each(function(i) {
    var image = $(this);
    var imageSrc = $(this).attr('src');
    image.wrap( "<a href='" + imageSrc + "'></a>" );
  });
  $(".hash, .tile, .left").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top-102-$('#tiles').height()},500);
    window.history.pushState(null, null, aid);
  });
  if (location.hash) {
    var aid = location.hash;
    $('html,body').animate({scrollTop: $(aid).offset().top-102-$('#tiles').height()},500);
  }
});
