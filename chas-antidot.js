"use strict";

var chasAntidot={
	createInvisibleDiv: function() {
		chasAntidot.invisibleDiv=document.createElement('div');
		chasAntidot.invisibleDiv.style.position='absolute';
		chasAntidot.invisibleDiv.style.top='-9999px';
		chasAntidot.invisibleDiv.style.left='-9999px';
		document.body.appendChild(chasAntidot.invisibleDiv);
	},
	createUnexistingImage: function() {
		chasAntidot.unexistingImage=document.createElement('img');
		chasAntidot.unexistingImage.src=Math.random();
		chasAntidot.invisibleDiv.appendChild(chasAntidot.unexistingImage);
	},
	createSignalImage: function(url) {
		var testImage=document.createElement('img');
		testImage.src=url+'?'+Math.random();
		chasAntidot.invisibleDiv.appendChild(testImage);
		return testImage;
	},
	testSiteWithImg: function(o) {
		if(!chasAntidot.invisibleDiv) {
			chasAntidot.createInvisibleDiv();
		}
		if(!chasAntidot.unexistingImage) {
			chasAntidot.createUnexistingImage();
		}
		var testImage=chasAntidot.createSignalImage(o.url);
		
		//Теперь выбираем изображение, с которым будем сравнивать
		if(o.secondImage){
			//Если указано второе изображение, то с ним
			var anotherImage=chasAntidot.createSignalImage(o.secondImage);
		} else {
			//А иначе - с несуществующим
			var anotherImage=chasAntidot.unexistingImage;
		}

		setTimeout(function() {
			if(
				testImage.offsetWidth == 0 ||
				(
					testImage.offsetWidth  == anotherImage.offsetWidth
						&&
					testImage.offsetHeight == anotherImage.offsetHeight
				)
			){
				try {
					o.ifBlocked();
				}catch(e) {
				}
			} else {
				try {
					o.ifNotBlocked();
				}catch(e) {
				}
			}
		},o.time||4000);
	},
	createBanner: function(message, o) {
		o.ifNotBlocked = null;
		o.ifBlocked = function(){chasAntidot.showBanner(message)};
		chasAntidot.testSiteWithImg(o);
	},
	showBanner: function(mes) {
		console.log('sb');
		var banner=document.createElement('div');
		banner.id='chasAntidot-banner';
		banner.style.position='fixed';
		banner.style.top  = '0';
		banner.style.left = '0';
		banner.style.width = '100%';
		banner.style.backgroundColor = 'pink';
		banner.style.padding = '10px';
		banner.innerHTML = mes +
			'<span style="position:fixed; right:10px;" onclick="document.getElementById(\'chasAntidot-banner\').style.display=\'none\';">x</span>';
		document.body.appendChild(banner);
	},
};
