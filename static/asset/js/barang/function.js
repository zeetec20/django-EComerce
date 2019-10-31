function buy() {
    $('#buttonBuy').attr({
        'href': $('#buttonBuy').attr('href') + "&quantity=" + $('#quantity').val() + "&color=" + $('#buttonColor').attr('color')
    });
    console.log($("#buttonBuy").attr('href'));
    window.location.href = $("#buttonBuy").attr('href');
}

function setColor(color) {
    $('#buttonColor').atrr({
        'color': color
    });
}
