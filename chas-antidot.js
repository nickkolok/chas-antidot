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
				o.ifNotBlocked();
			}
		},o.time||4000);
	}
};
