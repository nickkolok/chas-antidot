"use strict";

function testAvailability(options) {
    options = options || {};

    var settings = {
        'url': options.url || false,
        'secondUrl': options.secondUrl || false,
        'ifBlocked': options.ifBlocked || function () {},
        'ifNotBlocked': options.ifNotBlocked || function () {}
    }, testImg1;

    if (!settings.url && !settings.secondUrl) {
        throw new Error("None of input urls not specified;");
    }

    testImg1 = new Image();
    testImg1.onload = settings.ifNotBlocked;

    if (settings.url && settings.url != '') {
        testImg1.onerror = function () {
            if (settings.secondUrl) {
                testImg1 = new Image();
                testImg1.onload = settings.ifNotBlocked;
                testImg1.onerror = settings.ifBlocked;
                testImg1.src = settings.secondUrl
            } else {
                settings.ifBlocked.call(this);
            }
        };

        testImg1.src = settings.url;
    } else if (settings.secondUrl && settings.url != '') {
        testImg1.onerror = settings.ifBlocked;
        testImg1.src = settings.secondUrl
    }
}