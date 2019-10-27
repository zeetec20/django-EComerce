function mediaQuery(min, max) {
    let maxWidth = "(max-width: " + max + "px)";
    let minWidth = "(min-width: " + min + "px)";
    var mediaQuery = window.matchMedia(minWidth + " and " + maxWidth);
    return mediaQuery;
}