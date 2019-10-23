function cart() {
    $.ajax({
        url: '/ajax/cart',
        type: 'GET',
        data: {

        },
        success: function (returnData) {
            $('.cartPage').html(returnData);
        }
    });
}

function mediaQuery(min, max) {
    let maxWidth = "(max-width: " + max + "px)";
    let minWidth = "(min-width: " + min + "px)";
    var mediaQuery = window.matchMedia(minWidth + " and " + maxWidth);
    return mediaQuery;
}