$(document).ready(function(){
    
    $('.portfolio_sl').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="left_bt" style="color:black"> <i class="fa fa-chevron-left"></i> </button>',
        nextArrow: '<button type="button" class="right_bt" style="color:black"> <i class="fa fa-chevron-right"></i> </button>',
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });
    
    $('.otziv_sl').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="left_bt" style="color:black"> <i class="fa fa-chevron-left"></i> </button>',
        nextArrow: '<button type="button" class="right_bt" style="color:black"> <i class="fa fa-chevron-right"></i> </button>',
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });
    
});
