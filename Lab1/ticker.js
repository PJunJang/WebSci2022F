$(document).ready(function () {

    // Calling easyTicker function to
    // create newsticker movement
    $('.ticker-board').easyTicker({
        direction: 'up',
        easing: 'swing',
        speed: 'fast',
        interval: 3000,
        height: 'auto',
        mousePause: true,
        controls: {
            playText: 'Play',
            stopText: 'Stop'
        },
        callbacks: {
            before: false,
            after: false
        }
    });
});