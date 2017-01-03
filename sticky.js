
$.fn.stickyfloat = function(options, lockBottom) {
    var $obj = this;
    var parentPaddingTop = parseInt($obj.closest('.art-sidebar-group').css('padding-top'));//console.log(parentPaddingTop);
    var startOffset = $obj.parent('.art-sidebar-group').offset().top;

    var opts = $.extend({
        startOffset: startOffset,
        offsetY: parentPaddingTop,
        duration: 200,
        lockBottom: true
    }, options);

    $obj.children('.art-wrap-question').css({
        // position: 'absolute'
				background:'#3B3D47',

    });

    if (opts.lockBottom) {
        var bottomPos = $obj.parent('.art-sidebar-group').height() - $obj.height() + parentPaddingTop;
        if (bottomPos < 0)
            bottomPos = 0;
    }

    $(window).scroll(function() {
        $obj.stop();

        var pastStartOffset = $(document).scrollTop() > opts.startOffset;
        var objFartherThanTopPos = $obj.offset().top > startOffset;
        var objBiggerThanWindow = $obj.outerHeight() < $(window).height();

        if ((pastStartOffset || objFartherThanTopPos) && objBiggerThanWindow) {
            var newpos = ($(document).scrollTop() - startOffset + opts.offsetY);
            if (newpos > bottomPos)
                newpos = bottomPos;
            if ($(document).scrollTop() < opts.startOffset)
                newpos = parentPaddingTop;

            $obj.animate({
                top: newpos
            }, opts.duration);
        }
    });
};
