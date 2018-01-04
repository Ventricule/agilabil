// html2print needs CSS regions

var nb_page = 65;

$(function() {

  beforeLayout();

  setTimeout(afterLayout(), 3000);

});

function afterLayout(){

		// INIT
    // ====

    // Creating crop marks
    $("#master-page").append("<div class='crops'><div class='crop-top-left'><span class='bleed'></span></div><div class='crop-top-right'><span class='bleed'></span></div><div class='crop-bottom-right'><span class='bleed'></span></div><div class='crop-bottom-left'><span class='bleed'></span></div></div>")

		// Defining specifics masters
		var master = {
			"9" : "columns",
			"10" : "columns",
			"54" : "columns",
			"55" : "columns",
			"56" : "columns",
			"58" : "columns",
			"59" : "columns"
		};

    // Cloning the master page
    for (i = 1; i < nb_page; i++){
			if ( master[i] != null && master[i] != false ) {
				$("#master-page-" + master[i]).clone().attr("id","page-"+i).insertBefore($("#master-page")).addClass(master[i]);
			} else {
        $("#master-page").clone().attr("id","page-"+i).insertBefore($("#master-page"));
			}
    }
    $("#master-page").attr("data-width", $(".paper:first-child").width()).hide();

    // Get the flow
		var flow = document.webkitGetNamedFlows().namedItem('myStory');

		// Cross-reference connections
		$('#my-story a[href^="#"]').each(function(){
				var anchor = $(this).attr('href').substr(1);
				var target = $("#my-story [id^='" + anchor + "']").closest('article > *');
				var $this = $(this);
				if(target.size()) {
					// Get region by content
					var region = flow.getRegionsByContent(target[0]);
					var pagenum = $(region).closest('.paper').index() + 1;
					$this.html(pagenum);
				}
		});

		// Absolute positionned elements
		var elements = $('#my-story > [id], #my-story > [class], #my-story img').filter(function() {
		  return $(this).css('position').indexOf('absolute') > -1;
		});
		elements.each(function(){
      if( $(this).parent().is("#my-story") ) {
        var container = this;
        var content = this;
      } else {
        var container = $(this).parent()[0];
        var content = this;
      }
			$(container).css({ 'position' : 'relative', 'visibility' : 'collapse' });
			var region = flow.getRegionsByContent(container);
			$(content).insertBefore($(region)).css({ 'position' : 'absolute', 'visibility' : 'visible' });
		})

		// Fill page header
		$('.page').each(function(){
			var page = $(this),
					article = page.find("article"),
					chapter = article.children().last().attr('data-chapter');
			page.find('.footer .chapter').html(chapter);
		});

    // Specific pages classes
		/*
    $('.paper:nth-child(n+21):nth-child(-n+35)').addClass('atelier');
		$('.paper:nth-child(n+42):nth-child(-n+54)').addClass('atelier');

		$('.paper:nth-child(13)').addClass('full-page');
		$('.paper:nth-child(16)').addClass('full-page');

		$('.paper:nth-child(17)').addClass('chapitre');
		$('.paper:nth-child(39)').addClass('chapitre');
    */

}

function beforeLayout(){

  // ATTRIBUTE CLASSES TO TITLES
  // ===========================

  $('#my-story h2, #my-story h3, #my-story h4, #my-story h5, #my-story h6').each(function(){
      var title = $(this).text().indexOf(':') > 0 ? $(this).text().substr(0, $(this).text().indexOf(':')) : $(this).text(),
          name = title.toLowerCase().split(' ').slice(0, 2).join('-').stripAccents().replace(/[^a-z0-9]/gi, '-'),
          tag = $(this).prop("tagName").toLowerCase(),
          level = parseInt( tag.substr(1) ),
          parents = 'h2';
      for( var i = 2 ; i <= level ; i++) {
          parents += ', h' + i ;
      }
      $(this).nextUntil(parents).andSelf().addClass( tag + '-' + name);
      if(level == 2) {
          $(this).nextUntil(parents).attr('data-chapter', title);
      }
      // Add ID
      $(this).attr('id', name);
  });

  // REMOVE CROSS REFERENCES DUMMIE TEXT
  // ===================================

  $('#my-story a[id]').each(function(){
      $(this).html('');
      $(this).parent().addClass('collapse');
  });

}

String.prototype.stripAccents = function() {
		var translate_re = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;
		var translate = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
		return (this.replace(translate_re, function(match){
				return translate.substr(translate_re.source.indexOf(match)-1, 1); })
		);
};
