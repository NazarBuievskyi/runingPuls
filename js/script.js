
$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        // adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }

            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn( 100 );
    });
    $('.catalog-item__btn').on('click', function() {
        $('#arrow').fadeOut( 100 );
    });
    $('.modl__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut( 100 );
    });
    // $('.catalog-item__btn').on('click', function(){
    //     $('.overlay, #order').fadeIn( 100 );
    // });

    $('.catalog-item__btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modl__descr').text($('.catalog-item__subtittle').eq(i).text());
            $('.overlay, #order').fadeIn( 100 );
        })
    });

    $('#consultation-form').validate();
    $('#consultation form').validate();
    $('#order form').validate();

    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите ваше имя",
                    minlength: jQuery.validator.format("Ваше имя должно состоять минимум из {0} букв")
                  },
                phone: "Введите свой телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Адресс почты не верен"
                }
            }
            
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+99 (999) 999-999");

    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth and page up
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          var hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 400, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });

      new WOW().init();
    
  });