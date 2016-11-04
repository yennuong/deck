(function($) {
    "use strict";
    var dropdeck = {
        init: function() {
            this.menu_slidebar();
            this.rangeToggle();
            this.tagsInput();
            this.editPage();
            this.editDesc();
            this.hoverPopup();
            this.mousemove();
            this.multiSelect();
            this.tabShowAll();
            this.librarySlides();
            this.rangeSlide();
            this.sparkbarLikes();
            this.appendButton();
            if($('.sticky').length>0){
                this.sticky('.sticky');
            }
            this.toggleEdit();
        },
        appendButton: function(){
            // $('.change_approve').on('click',function(event) {
            //    var $this = $(this);
            //     $this.toggleClass('change_approve');
            //     if($this.hasClass('change_approve')){
            //         $this.html('<i class="fa fa-thumbs-o-up"></i> Aprrove')    
            //     } else {
            //         $this.html('<i class="fa fa-thumbs-o-up"></i> Aprroved')   
            //     }
            // });
            // $('.change_denied').on('click',function(event) {
            //    var $this = $(this);
            //     $this.toggleClass('change_denied');
            //     if($this.hasClass('change_denied')){
            //         $this.html('<i class="fa fa-thumbs-o-down"></i> Deny')    
            //     } else {
            //         $this.html('<i class="fa fa-thumbs-o-down"></i> Denied')   
            //     }
            // });
            var $approved = $('.button--approve .btn-approve'),
                $deni = $('.button--approve .btn-denied');
            $('.btn-approve').on('click',function(event) {
                $('.button--approve').toggleClass('active');

            });
            $('.btn-denied').on('click',function(event) {
                $('.button--approve').toggleClass('active');

            });
        },
        tagsInput: function(){
            if($('.info-creat--deck').length){
                $("input").val()
            }
        },
        rangeToggle: function(){
            $('.trustful-toggle').each(function() {
                $(this).on('click', '.icon-active', function(event) {
                    $(this).parent('.trustful-toggle').toggleClass('toggle');
                    return false;
                });
                $('body').on('click', function(event) {
                    $('.trustful-toggle').removeClass('toggle')
                });
            }); 
        },
        sparkbarLikes: function(){
           var $likes = $('.views-info .extras-sparkbar-likes').data('likes');
           var $dislikes = $('.views-info .extras-sparkbar-dislikes').data('dislikes');
           $('.views-info .extras-sparkbar-likes').css('width', $likes);
           $('.views-info .extras-sparkbar-dislikes').css('width', $dislikes);
        },
        rangeSlide: function(){
            if ($('.list-trustful').length) {
                var $range = $("#trustful"),
                $result = $("#result_trustful");
                var track = function (data) {
                    $result.html(data.from+"% Trusted" );
                };
                $range.ionRangeSlider({
                    type: "single",
                    min: 0,
                    max: 100,
                    from: 90,
                    step: 1,
                    postfix: "%",
                    onStart: track,
                    onChange: track,
                    onFinish: track,
                    onUpdate: track
                });
            }
        },
        toggleEdit: function() {
            $('.diaram__item_wrap').each(function(index, el) {
                if($(this).children('.diaram__row').length > 0) {
                    $(this).children('.diaram__item').append('<span class="has-item"/>')
                }
            });

            $('.diaram__row ').on('click','.diaram__item',function() {
                var rowChild = $(this).siblings('.diaram__row'),
                    itemWidth = $(this).parent('.diaram__item_wrap').outerWidth(),
                    index = $(this).parent('.diaram__item_wrap').index(),
                    left = (index)*itemWidth;
                $(this).parent('.diaram__item_wrap').siblings().find('.diaram__row').removeClass('flexLo');
                rowChild.addClass('flexLo');
                rowChild.css({
                    left: left + 'px'
                });
                var myDiv = $(".main-content"),
                    scrollto = myDiv.width(),
                    scrollTop = $(document).height();
                myDiv.animate(
                    { 
                        scrollLeft:  scrollto,
                        scrollTop:  scrollTop      
                    },100);
            });
        },
        librarySlides: function(){
            if($('.slides-partner').length){
                var mySwiper = new Swiper('.swiper-container', {
                    slidesPerView: 5,
                    spaceBetween: 24,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    breakpoints: {
                    // when window width is <= 640px
                    640: {
                      slidesPerView: 1,
                    },
                    900: {
                      slidesPerView: 2,
                    }
                  }
                });   
            }
        },
        tabShowAll: function(){
            $('#tabAll').on('click',function(event) {
                $('#tabAll').parent().addClass('active'); 
                $('.tab-pane').addClass('active in'); 
                $('[data-toggle="tab"]').parent().removeClass('active'); 
            });
        },
        multiSelect: function(){
            if ($('.treding_tab').length>0) {
                $('#example-single').multiselect({
                    nonSelectedText: 'Treding tags'
                });
                $("ul.multiselect-container").mCustomScrollbar({
                });
            }
        },
        // mousemove: function(){
        //     var tooltips = document.querySelectorAll('.box-deck .box-hover');
        //     $('.box-deck').mousemove(function(e){
        //         var x = (e.clientX + 20) + 'px',
        //             y = (e.clientY + 20) + 'px';
        //             for (var i = 0; i < tooltips.length; i++) {
        //                 tooltips[i].style.top = y;
        //                 tooltips[i].style.left = x;
        //             }
        //     });
        // },
        mousemove: function(){
            var tooltips = document.querySelectorAll('.box-deck .box-hover');
            $('.box-deck').mousemove(function(e){
            var width = $(window).width();
            var xcurrent = e.clientX;
            if((width - xcurrent) < 200){
                var x = (e.clientX - 20) + 'px',
                    y = (e.clientY - 20) + 'px';
                    for (var i = 0; i < tooltips.length; i++) {
                        tooltips[i].style.top = -y;
                        tooltips[i].style.left = -x;
                    }
            }else{
                var x = (e.clientX + 20) + 'px',
                    y = (e.clientY + 20) + 'px';
                    for (var i = 0; i < tooltips.length; i++) {
                        tooltips[i].style.top = y;
                        tooltips[i].style.left = x;
                    }
            }
                        });
        },
        editDesc: function(){
            var wrapEdit =  $('.edit-desc');
            wrapEdit.on('click','.toggle__edit',function() {
                var view = $(this).siblings('.desc--view'),
                    edit = $(this).siblings('.desc--edit');
                    edit.css({
                        width: view.outerWidth() + 'px',
                        height: view.outerHeight() + 'px'
                    });
                view.toggleClass('hidden').text(edit.val());
                edit.toggleClass('hidden').select();
            });
        },
        editPage: function(){
            $(window).on('load',function(){
                var leftHeight = $('.block__left'),
                    addMore = $('.list-file__add'),
                    review = $('.review'),
                    listFile = $('.list-file').children('ul'),
                    listHeight = leftHeight.outerHeight() - review.outerHeight() - addMore.outerHeight() - 3;
                    listFile.css({
                        height: listHeight + 'px'
                    });
                if($('.block__content-view').length > 0) {
                    $(".block__content-view").mCustomScrollbar({
                        axis:"y",
                    });
                }
                if(listFile.length > 0) {
                    listFile.mCustomScrollbar({
                        axis:"y" // horizontal scrollbar
                    });
                }
            });
            var wrapEdit =  $('.block__title-wrap');
            wrapEdit.on('click','.toggle__edit',function() {
                var view = $(this).siblings('.block__title--view'),
                    edit = $(this).siblings('.block__title--edit');
                    edit.css({
                        width: view.outerWidth() + 'px',
                        height: view.outerHeight() + 'px'
                    });
                view.toggleClass('hidden').text(edit.val());
                edit.toggleClass('hidden').select();
            });

            $('.block__content').on('click',function() {
                $(this).children('.block__content-text').toggleClass('hidden');
            });
            $('.block__content').on('click','.block__content-edit',function(e) {
                e.stopPropagation();
            });
        },
        
        hoverPopup: function(){
            $('.menu-slidebar').each(function() {
                $(this).hover(function() {
                    $(this).find('.hover-deck').addClass('abc');
                    return false;
                });
                $('body').hover(function() {
                   $(this).find('.hover-deck').removeClass('abc');
                });
            });
        },
        menu_slidebar: function(){
            $('.menu-slidebar').each(function() {
                $(this).on('click', '.icon-active', function(event) {
                    $(this).parent('.menu-slidebar').toggleClass('toggle-menu');
                    return false;
                });
                $('body').on('click', function(event) {
                    $('.menu-slidebar').removeClass('toggle-menu')
                });
            }); 
        },
        sticky : function(el) {
            if($(el).length < 1) {
                return;
            }
            var wrap = $(el),
                top = wrap.offset().top;
            $(window).scroll(function() {
                if ($(this).scrollTop() > top) {
                    wrap.addClass("stickyFixed");
                } else if($(this).scrollTop() <= top) {
                   wrap.removeClass("stickyFixed");
                }
            });
        },
    };
    window.dropdeck = dropdeck;
    dropdeck.init();

})(jQuery);

