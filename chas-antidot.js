"use strict";

var chasAntidot = {
    /**
     * @deprecated
     */
    createInvisibleDiv: function () {
        chasAntidot.invisibleDiv = document.createElement('div');
        chasAntidot.invisibleDiv.style.position = 'absolute';
        chasAntidot.invisibleDiv.style.top = '-9999px';
        chasAntidot.invisibleDiv.style.left = '-9999px';
        document.body.appendChild(chasAntidot.invisibleDiv);
    },
    /**
     * @deprecated
     */
    createUnexistingImage: function () {
        chasAntidot.unexistingImage = document.createElement('img');
        chasAntidot.unexistingImage.src = Math.random();
        chasAntidot.invisibleDiv.appendChild(chasAntidot.unexistingImage);
    },
    /**
     * @deprecated
     */
    createSignalImage: function (url) {
        var testImage = document.createElement('img');
        testImage.src = url + '?' + Math.random();
        chasAntidot.invisibleDiv.appendChild(testImage);
        return testImage;
    },
    testSiteWithImg: function (options) {
        options = options || {};

        var settings = {
            'url': options.url || false,
            'secondUrl': options.secondUrl || false,
            'ifBlocked': options.ifBlocked || function () {
            },
            'ifNotBlocked': options.ifNotBlocked || function () {
            }
        }, testImg1;

        if (!settings.url && !settings.secondUrl) {
            throw new Error("None of input urls not specified;");
        }

        testImg1 = new Image();
        testImg1.onload = settings.ifNotBlocked;

        if (settings.url && settings.url != '') {
            testImg1.onerror = function () {
                if (settings.secondUrl && settings.url != '') {
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
    },
    createBanner: function (message, url, secondUrl) {
        chasAntidot.testSiteWithImg({
            'ifBlocked': function () {
                chasAntidot.showBanner(message)
            }
        });
    },
    showBanner: function (mes) {
        console.log('sb');
        var banner = document.createElement('div');
        banner.id = 'chasAntidot-banner';
        banner.style.position = 'fixed';
        banner.style.top = '0';
        banner.style.left = '0';
        banner.style.width = '100%';
        banner.style.backgroundColor = 'pink';
        banner.style.padding = '10px';
        banner.innerHTML = mes +
            '<span style="position:fixed; right:10px;" onclick="document.getElementById(\'chasAntidot-banner\').style.display=\'none\';">x</span>';
        document.body.appendChild(banner);
    }
};