(function ($) {
  "use strict";

  jQuery(document).ready(function ($) {
    // for Preloader
    $(window).on('load', function () {
        $("#loading").fadeOut(500);
    });
  });

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    loop: true,
    nav: false,
    dots: true,
    items: 1,
    dotsData: true,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
    // layoutMode: 'masonry', // Use masonry layout mode

  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

    // Trigger layout after each image loads to avoid overlap
    $('.portfolio-container').imagesLoaded().progress(function() {
      portfolioIsotope.isotope('layout');
    });
})(jQuery);

$(document).ready(function () {
  var path = window.location.pathname;
  // var filename = path.match(/.*\/([^/]+)\.([^?]+)/i)[1];
  var match = path.match(/.*\/([^/]+)\.([^?]+)/i);

  // 에러 방지를 위해 null 체크 추가
  if (match && match[1]) {
    var filename = match[1];

    // loading time
    $(window).on('load', function () {
      $("#loading").fadeOut(500);
    });

    if (filename == "research") {
      $("#nav-research").addClass("active");
    } else if (filename == "professor") {
      $("#nav-professor").addClass("active");
      $("#nav-people").addClass("active");
    } else if (filename == "students") {
      $("#nav-students").addClass("active");
      $("#nav-people").addClass("active");
    } else if (filename == "publication") {
      $("#nav-publication").addClass("active");
    } else if (filename == "grant") {
      $("#nav-grant").addClass("active");
    } else if (filename == "news") {
      $("#nav-news").addClass("active");
    } else if (filename == "gallery") {
      $("#nav-gallery").addClass("active");
    } else if (filename == "about") {
      $("#nav-about").addClass("active");
    } else {
      console.log("Cannot find matching ID");
    }
  } else {
    console.log("Cannot find matching ID");
  }

});

function fixOwlCarouselHeight() {
  let maxHeight = 0;
  $(".owl-carousel .owl-carousel-item").each(function () {
      let thisHeight = $(this).height();
      if (thisHeight > maxHeight) {
          maxHeight = thisHeight;
      }
  });

  $(".owl-carousel .owl-carousel-item").height(maxHeight);
}

// 페이지 로드 후 실행
$(document).ready(function () {
  fixOwlCarouselHeight();
});

// 윈도우 크기 조정 시 다시 실행
$(window).resize(function () {
  fixOwlCarouselHeight();
});
