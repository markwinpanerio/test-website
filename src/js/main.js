jQuery(function($) {
    const homePageTransition = new TimelineMax({delay: 0.5});
    const controller = new ScrollMagic.Controller({});
    const $sectionHeader = $('.section-header');

    $('.back-to-top').on('click', function() {
       $('html, body').animate({
            scrollTop: 0
        })
    })

    $(window).on('load', function() {
        homePageTransition
            .to('.mask-logo span', 0.7, {
                marginLeft: 20,
                ease: Power4.easeOut
            })
            .to('.mask-logo span', 0.7, {
                marginLeft: '-136px',
                ease: Power4.easeOut
            }, '+=0.5')
            .to('.mask-logo', 0.9, {
                top: '-50px',
                opacity: 0,
                ease: Power4.easeOut
            }, '+=0.1')
            .to('.mask', 1.2, {
                height: 0,
                ease: Power4.easeOut
            }, '-=0.4')
            .staggerTo('.js-header-item', 0.9, {
                left: 0,
                opacity: 1,
                ease: Power4.easeOut
            }, 0.05, '-=0.6')
            .staggerTo('.js-header-single-item', 0.9, {
                left: 0,
                opacity: 1,
                ease: Power4.easeOut
            }, 0.05, '-=0.8')
            .staggerTo('.js-landing-item', 0.9, {
                left: 0,
                opacity: 1,
                ease: Power4.easeOut
            }, 0.05, '-=0.8')
    })

    $sectionHeader.each(function(i) {
        const $this = $sectionHeader.eq(i);

        const tl = new TimelineMax();
            tl
            .staggerTo($this.find('.js-section-header-item'), 1.2, {
                opacity: 1,
                left: 0,
                ease: Power4.easeOut,
                autoRound:false
            }, 0.1);

            const scene = new ScrollMagic.Scene({
                triggerElement: $this[0],
                triggerHook: 'onEnter',
                offset: $this.outerHeight() * 1.25
            })
                .setTween(tl)
                .reverse(false)
                .addTo(controller);
    })

})