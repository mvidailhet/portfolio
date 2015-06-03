/**
 * Created by Vidailhet on 03/06/15.
 */

'use strict';

var mobileWidthLimit = 752;

$('.project-preview').click(function () {
    $('.project-details').slideUp();
    var isActive = $(this).hasClass('active');
    $('.project-preview').removeClass('active');
    if (!isActive) {
        $(this).addClass('active');

        // if mobile screen, put the details div just under the project image
        if ($(window).width() < mobileWidthLimit) {
            $($(this).attr('data-target')).insertAfter($(this));
        } else {
            $($(this).attr('data-target')).appendTo($(this).parents('.row').attr('data-target'));
        }

        $($(this).attr('data-target')).slideDown();
    }

    return false;
});

var currentWindowWidth = 0;

function findPreviewFromDetail(projectDetailEl) {
    var result = null;
    $('.project-preview').each(function (index, projectPreviewEl) {
        if ($(projectPreviewEl).attr('data-target') === '#' + $(projectDetailEl).attr('id')) {
            result = projectPreviewEl;
        }
    });
    return result;
}

$(window).resize(function () {
    $('.project-details').each(function (index, projectDetailEl) {
        if ($(projectDetailEl).css('display') === 'block') {
            var projectPreviewEl = null;
            if ($(window).width() < mobileWidthLimit && currentWindowWidth > mobileWidthLimit) {
                projectPreviewEl = findPreviewFromDetail(projectDetailEl);
                $(projectDetailEl).insertAfter($(projectPreviewEl));
                console.log(projectPreviewEl);
            } else if ($(window).width() > mobileWidthLimit && currentWindowWidth < mobileWidthLimit) {
                projectPreviewEl = findPreviewFromDetail(projectDetailEl);
                console.log(projectPreviewEl);
                $(projectDetailEl).appendTo($(projectPreviewEl).parents('.row').attr('data-target'));
            }
        }
    });
    currentWindowWidth = $(window).width();
});