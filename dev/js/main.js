(function() {

var $menuToggle;
var menuOpened;
var $menu = $('.nav');

$menuToggle = $('.menu-toggle');
menuOpened = 'nav--opened';


var toggleMenu = {
  init: function() {
    console.log(this);
    $menuToggle.click( toggleMenu.toggleMenu );
  },
  toggleMenu: function() {

    if ($menu.hasClass(menuOpened)) {
      $menu.removeClass(menuOpened);
    } else {
      $menu.addClass(menuOpened);
    }

  }
}


var bodyClick = {
  init: function() {
    $('body').click( 
      bodyClick.closeMenu 
    );
  },
  closeMenu: function(e) {
    console.log(e.target);

    if ( !$menu.is(e.target) && !$menuToggle.find('*').is(e.target) ) {
      if ($menu.hasClass(menuOpened)) {
        console.log(true);
        $menu.removeClass(menuOpened);
      }
    }

  }
}

$(document).ready(function() {
  toggleMenu.init();
  bodyClick.init();
});



$(function() {

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOV', 'DEC'];

  function renderSite(data) {
    data = $.xml2json(data);
    var posts = data.channel.item;
   
    renderLatestArticles(posts);
  }

  function renderLatestArticles(posts) {
    var $parent = $('.sidebox.latest-articles .sidebox-content');
    if(!$parent) {return};

    for(var i = 0; i < Math.min(posts.length, 5); i++) {
      var p = posts[i];
      var date = new Date(p.pubDate);
      var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      var $a = $('<a href="' + p.link + '"><div class="date">' + dateStr + '</div><div>' + p.title + '</div></a>');
      if(i == 4) {
        $a.addClass('last');
      }
      $parent.append($a);
    }
    
    $parent.removeClass('loading');
  }

  $.ajax({
    dataType: 'xml',
    url: '/rss',
    type: 'GET'
  }).success(renderSite);

});




})(jQuery);