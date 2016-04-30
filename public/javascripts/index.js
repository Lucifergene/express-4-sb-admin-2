require.config({
	paths: {
		'jquery': '/lib/jquery/dist/jquery',
    'bootstrap': '/lib/bootstrap/dist/js/bootstrap',
    /* RaphaelJS BEGIN*/
    'eve': '/lib/eve/eve',
    'raphael.core':'/lib/raphael/dev/raphael.core',
    'raphael.svg':'/lib/raphael/dev/raphael.svg',
    'raphael.vml':'/lib/raphael/dev/raphael.vml',
    'raphael':'/lib/raphael/dev/raphael.amd',
    /* RaphaelJS END*/
    'morris': '/lib/morris.js/morris',
    'morris-data': '/static/javascripts/morris-data',
    'sb-admin-2': '/static/javascripts/sb-admin-2'

		//'datatables.net':'/lib/datatables.net/js/jquery.dataTables',
		//'datatables':'/lib/datatables.net-bs/js/dataTables.bootstrap',
	},
	shim: {
		'jquery'    : { exports: '$' },
    'bootstrap' : { deps: ['jquery'], exports: 'bootstrap'},
		/*'datatables'		: {
			deps: ['jquery','datatables.net'],
			exports: 'datatables'
		},*/
    //'eve': {exports: 'eve'},
    'raphael': {
      deps: ['eve','raphael.core','raphael.svg','raphael.vml'],
      exports: 'Raphael'
    },
    'morris':{
			deps: ['jquery','raphael'],
			exports: 'Morris'
		}

	}
});

define ('isIE', [], function () {
    return function() {
      var undef,
    		v = 3,
    		div = document.createElement("div"),
    		all = div.getElementsByTagName("i");
    	while (
    		div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->",
    		all[0]
    	) {
    		return v > 4 ? v : undef;
    	}
    };
});

define ('handleSidebarToggler', [], function () {
      return function(){

        var body = $('body');

    	  // handle sidebar show/hide
    	  body.on('click', '.sidebar-toggler', function (e) {

    		var sidebarMenuSubs = $('#sidebar .nav-second-level, #sidebar .nav-third-level');

    		//collapse("toggle") した際にheightが「0」になるため、height style削除
    		$("#sidebar-area .dropdown-collapse").parent("li").children("ul").css('height', '');

    		$(".sidebar-search", $('.page-sidebar')).removeClass("open");
    		if (body.hasClass("sidebar-closed")) {
    			body.removeClass("sidebar-closed");
    			sidebarMenuSubs.addClass('collapse');

    			if ($.cookie) {
    				$.cookie('sidebar-closed', '0');
    			}
    		} else {
    			body.addClass("sidebar-closed");
    			sidebarMenuSubs.removeClass('collapse');

    			if ($.cookie) {
    				$.cookie('sidebar-closed', '1');
    			}
    		}
    		$(window).trigger('resize');
    	});

    };
});


require(['jquery', 'bootstrap', 'raphael', 'morris', 'isIE', 'handleSidebarToggler'/*'datatables',*/],
function($, bootstrap, Raphael, Morris, isIE, handleSidebarToggler/*datatables,*/ ){

window.Raphael = Raphael;

//side menu toggle (init)
if (isIE() <= 9) {
  $('#sidebar').find("li.active").has("ul").children("ul").collapse("show");
  $('#sidebar').find("li").not(".active").has("ul").children("ul").collapse("hide");
} else {
  $('#sidebar').find("li.active").has("ul").children("ul").addClass("collapse in");
  $('#sidebar').find("li").not(".active").has("ul").children("ul").addClass("collapse");
}

//side menu toggle (setting)
$("#sidebar-area .dropdown-collapse").on((jQuery.support.touch ? "tap" : "click"), function(e) {
  e.preventDefault();

  if ($("body").hasClass("sidebar-closed")) {
    return false;
  }

  $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");

  //if ($toggle) { //toggle On ・ Off

  $(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");

  //}
  return false;
});

handleSidebarToggler();

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

if ($.cookie && $.cookie('sidebar-closed') === '1' && !$('body').hasClass("sidebar-closed") && width >= 768) {
  $('body').addClass("sidebar-closed");
  $('#sidebar .nav-second-level, #sidebar .nav-third-level').removeClass('collapse');
}

$(window).bind("load resize", function() {
  topOffset = 50;
  var body = $('body');
  var sidebarMenuSubs = $('#sidebar .nav-second-level, #sidebar .nav-third-level');

  width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

  if (width < 768) {
    $('div.navbar-collapse').addClass('collapse');
    topOffset = 100; // 2-row-menu

    if (body.hasClass("sidebar-closed")) {
      body.removeClass("sidebar-closed");
      sidebarMenuSubs.addClass('collapse');
    }
  } else {
    $('div.navbar-collapse').removeClass('collapse');
    /*
    if ($.cookie) {
      if ($.cookie('sidebar-closed') === 1 && !$('body').hasClass("sidebar-closed")) {
        body.addClass("sidebar-closed");
        sidebarMenuSubs.removeClass('collapse');
      }
    }*/
  }

  height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
  height = height - topOffset;
  if (height < 1) height = 1;
  if (height > topOffset) {
    $("#page-wrapper").css("min-height", (height) + "px");
  }
});

/*
var url = window.location;
var element = $('ul.nav a').filter(function() {
  return this.href == url;
}).addClass('active').parent().parent().addClass('in').parent();
if (element.is('li')) {
  element.addClass('active');
}
*/


//ページローディング画面の非表示化
/*
if ($('#pageLoading').css("display") == "block") {
  $('#pageLoading').delay(100).css("display","none");
}
*/

//$('#sidebar').metisMenu();

//console.info(morrisdata);

//console.info(window.Raphael);

      //$('#side-menu').metisMenu();
      //$.morrisdata(Raphael);
     //Morris.raphael = Raphael;

     Morris.Donut({
         element: 'morris-donut-chart',
         data: [{
             label: "Download Sales",
             value: 12
         }, {
             label: "In-Store Sales",
             value: 30
         }, {
             label: "Mail-Order Sales",
             value: 20
         }],
         resize: true
     });

      Morris.Area({
          element: 'morris-area-chart',
          data: [{
              period: '2010 Q1',
              iphone: 2666,
              ipad: null,
              itouch: 2647
          }, {
              period: '2010 Q2',
              iphone: 2778,
              ipad: 2294,
              itouch: 2441
          }, {
              period: '2010 Q3',
              iphone: 4912,
              ipad: 1969,
              itouch: 2501
          }, {
              period: '2010 Q4',
              iphone: 3767,
              ipad: 3597,
              itouch: 5689
          }, {
              period: '2011 Q1',
              iphone: 6810,
              ipad: 1914,
              itouch: 2293
          }, {
              period: '2011 Q2',
              iphone: 5670,
              ipad: 4293,
              itouch: 1881
          }, {
              period: '2011 Q3',
              iphone: 4820,
              ipad: 3795,
              itouch: 1588
          }, {
              period: '2011 Q4',
              iphone: 15073,
              ipad: 5967,
              itouch: 5175
          }, {
              period: '2012 Q1',
              iphone: 10687,
              ipad: 4460,
              itouch: 2028
          }, {
              period: '2012 Q2',
              iphone: 8432,
              ipad: 5713,
              itouch: 1791
          }],
          xkey: 'period',
          ykeys: ['iphone', 'ipad', 'itouch'],
          labels: ['iPhone', 'iPad', 'iPod Touch'],
          pointSize: 2,
          hideHover: 'auto',
          resize: true
      });






      Morris.Bar({
          element: 'morris-bar-chart',
          data: [{
              y: '2006',
              a: 100,
              b: 90
          }, {
              y: '2007',
              a: 75,
              b: 65
          }, {
              y: '2008',
              a: 50,
              b: 40
          }, {
              y: '2009',
              a: 75,
              b: 65
          }, {
              y: '2010',
              a: 50,
              b: 40
          }, {
              y: '2011',
              a: 75,
              b: 65
          }, {
              y: '2012',
              a: 100,
              b: 90
          }],
          xkey: 'y',
          ykeys: ['a', 'b'],
          labels: ['Series A', 'Series B'],
          hideHover: 'auto',
          resize: true
      });


});
