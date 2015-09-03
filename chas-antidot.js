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
	testSiteWithImg: function(o) {
		if(!chasAntidot.invisibleDiv) {
			chasAntidot.createInvisibleDiv();
		}
		if(!chasAntidot.unexistingImage) {
			chasAntidot.createUnexistingImage();
		}
		var testImage=document.createElement('img');
		testImage.src=o.url+'?'+Math.random();
		chasAntidot.invisibleDiv.appendChild(testImage);
		
		setTimeout(function() {
			if(testImage.offsetWidth == 0 || testImage.offsetWidth == chasAntidot.unexistingImage.offsetWidth){
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
