/*
	Degrees What?
	Geoff Pack, June 2023
	https://github.com/virtualgeoff/degreeswhat
*/

/* jshint esversion: 6 */
/* globals degreesData */

// shortcuts
const $ = document.querySelector.bind(document);
const $All = document.querySelectorAll.bind(document);

const DegreesWhat = (function() {
	'use strict';

	const radius = 130;
	const tau = 2 * Math.PI;

	let center,
		angleRadians = 0,
		angleDegrees = 0,
		angleOffset  = 0,
		displayType,  // 'compass' | 'protractor'
		snap,         // true | false
		colorScheme,  // 'light' | 'dark' | 'auto'
		compass, compassCard, angleIndicator, compassOverlay;

	function drawCompass() {
		let h = parseFloat($('#degreeNumbers').getAttribute('font-size')),
			textOffset = 4,
			angle, scale,
			str1 = '',
			str2 = '';

		// marks
		for (let i=0; i<360; i++) {
			let length = 5;
			if ((i % 5)  === 0) { length = 9;}
			if ((i % 15) === 0) { length = 15; }
			str1 += `<line x1="0" y1="${radius}" x2="0" y2="${radius-length}" transform="rotate(${i})" />`;
		}
		$('#degreeMarks').innerHTML = str1;

		// numbers
		for (let i=0; i<360; i+=15) {
			angle = i + 180;
			str2 += `
				<g x="0" y="0" transform="rotate(${angle}) translate(0,${radius - h * textOffset})">
					<text x="0" y="0" transform="rotate(180)">${i}</text>
				</g>`;
		}

		// points of the compass
		let points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
		for (let i=0; i<16; i++) {
			angle = (i * 360/16 + 180);
			scale = 1.3;
			if (i%2 === 0) { scale = 2; }
			if ((i%4 === 0)) { scale = 3.1; }

			str2 += `
				<g x="0" y="0" transform="rotate(${angle}) translate(0,${radius - h * 2.5 * textOffset}) scale(${scale})">
					<polygon points="0,8.5 1.5,6 -1.5,6" />
					<text x="0" y="0" transform="rotate(180)" font-size="5px">${points[i]}</text>
				</g>`;
		}
		$('#degreeNumbers').innerHTML = str2;

		// adjust text position
		$('#text1').setAttribute('transform', 'translate(0,-22)');
		$('#text2').setAttribute('transform', 'translate(0, 22)');

		// modify indicator
		angleIndicator.setAttribute('transform', 'rotate(-90)');
		$('#angleIndicator path').setAttribute('d', 'M 135,0 L 60,0');
		$('#angleIndicator circle').setAttribute('r', '0');
	}

	function drawProtractor() {
		let h = parseFloat($('#degreeNumbers').getAttribute('font-size')),
			textOffset = 4,
			length, angle, angle2, yPos,
			str1 = '',
			str2 = '';

		// marks
		for (let i=0; i<360; i++) {
			length = 5;
			if ((i % 5)  === 0) { length = 9;}
			if ((i % 10) === 0) { length = radius-15; }
			if ((i % 90) === 0) { length = radius; }
			str1 += `<line x1="0" y1="${radius}" x2="0" y2="${radius-length}" transform="rotate(${i})" />`;
		}
		$('#degreeMarks').innerHTML = str1;

		// numbers
		for (let i=-170; i<=180; i+=10) {
			angle = (i+90) * -1;
			angle2 = ((i >= 0) && (i <= 180)) ? 180 : 0;
			yPos   = ((i >= 0) && (i <= 180)) ? 0 : (h*0.75);
			str2 += `
				<g x="0" y="0" transform="rotate(${angle}) translate(0,${radius - h * textOffset})">
					<rect x="-1" y="${-h*0.7}" width="2" height="${h*2.1}" fill="#fff" />
					<text x="0" y="${yPos}" transform="rotate(${angle2})">${i}</text>
				</g>`;
		}
		$('#degreeNumbers').innerHTML = str2;

		// adjust text position
		$('#text1').setAttribute('transform', 'translate(0,-45)');
		$('#text2').setAttribute('transform', 'translate(0, 45)');

		// modify compass card and indicator
		compassCard.setAttribute('transform', 'rotate(0)');
		$('#angleIndicator path').setAttribute('d', 'M 0,0 L 135,0');
		$('#angleIndicator circle').setAttribute('r', '2');
	}

	function updateInfo() {
		// temp conversions
		let D    = angleDegrees.toFixed(1),
			d    = Number(D),
			R    = angleRadians.toFixed(2),
			T    = (d/360).toFixed(2),
			G    = (d * 10/9).toFixed(1),
			C    = ((d >= -273.15) ? D : '—'),
			CtoF = ((d >= -273.15) ? (d * 9/5 + 32).toFixed(1) : '—'),
			CtoK = ((d >= -273.15) ? (d + 273.15).toFixed(2) : '—'),
			CtoR = ((d >= -273.15) ? (d * 9/5 + 491.67).toFixed(2) : '—'),
			FtoC = ((d-32) * 5/9).toFixed(1),
			FtoK = ((d + 459.67) * 5/9).toFixed(2),
			FtoR = (d + 459.67).toFixed(2);

		// big text
		$('#textAngle').textContent = `${D}°`;
		$('#textC').textContent     = `${C} °C = `;
		$('#textCtoF').textContent  = `${CtoF} °F`;
		$('#textF').textContent     = `${D} °F = `;
		$('#textFtoC').textContent  = `${FtoC} °C`;

		// info1
		$('#info1 dl').innerHTML = `
			<dt>${D}° = </dt>
			<dd>${R} rad<br>
				${G} gon<br>
				${T} turns</dd>
			<dt>${C} °C = </dt>
			<dd>${CtoF} °F<br>
				${CtoK} K<br>
				${CtoR} °Ra</dd>
			<dt>${D} °F = </dt>
			<dd>${FtoC} °C<br>
				${FtoK} K<br>
				${FtoR} °Ra</dd>`;

		// info2
		if (degreesData) {
			degreesData.showInfo(d);
		}
	}

	function updateAngle() {
		// limit angles
		if (angleDegrees > 5537.7) { angleDegrees = 5537.7; } //  5537.7 °C = 9999.9 °F
		if (angleDegrees < -459.6) { angleDegrees = -459.6; } // −459.67 °F = 0.00 °Ra

		//  adjust range
		if (displayType === 'compass') {
			angleDegrees = (angleDegrees + 360) % 360; // 0 <= angle < 360;
		}
		angleRadians = angleDegrees/360 * tau;

		// snap to nearest degree?
		if (snap) {
			angleDegrees = Math.round(angleDegrees);
		}

		//  rotate compass card or indicator line
		if (displayType === 'compass') {
			compassCard.setAttribute('transform', `rotate(${-angleDegrees})`);
		} else {
			angleIndicator.setAttribute('transform', `rotate(${-angleDegrees})`);
		}

		// update text
		updateInfo();
	}

	function setDisplayType(value) {
		displayType = value;
		if (value === 'compass') {
			drawCompass();
		} else {
			drawProtractor();
		}
		updateAngle();
	}

	function getPointerOffset(e) {
		// get angle where the pointer entered the compass overlay and save as angleOffset
		e.preventDefault();
		angleRadians = -1 * Math.atan2((e.offsetY-center.y), (e.offsetX-center.x));
		if (displayType === 'compass') { angleRadians -= tau/4; } // - 90° CCW
		angleOffset = (angleRadians/tau * 360) - angleDegrees;
	}

	function getPointerAngle(e) {
		// get pointer position and calculate angle
		// note atan2(y,x) gives the counterclockwise angle, in radians, between the +ve x-axis and the point (x,y)
		e.preventDefault();
		angleRadians = -1 * Math.atan2((e.offsetY-center.y), (e.offsetX-center.x));
		if (displayType === 'compass') {
			angleRadians -= tau/4;  // - 90° CCW
			angleDegrees = angleRadians/tau * 360 - angleOffset;
		} else {
			angleDegrees = angleRadians/tau * 360;
		}
		updateAngle();
	}

	function getSize(e) {
		//console.log(e);
		center = {x:compass.clientWidth/2, y:compass.clientHeight/2};
	}

	function showSection(e) {
		// hide all sections, show the one you want
		$All('section').forEach( item => { item.style.display = 'none'; });
		if ((window.location.hash) && $(window.location.hash)) { $(window.location.hash).style.display = 'block'; }
	}

	function decodeURL(anchor) {
		// decodes data in data-address attribute of an anchor tag — used to obfuscate mailto link
		let input = anchor.dataset.address.replace(/\s+/g, ',').split(',');
		let output = '';

		for (let i=0; i<input.length; i++) {
			output += String.fromCodePoint(parseInt(input[i],16));
		}
		anchor.href = output;
	}

	function setItem(itemName, value) {
		// save item to browser local storage
		// TODO: test if localStorage available and warn user?
		localStorage.setItem(itemName, value);
	}

	function getItem(itemName) {
		// get item from browser local storage
		// TODO: test if localStorage available and warn user?
		return JSON.parse(localStorage.getItem(itemName));
	}

	function setOption(checkbox) {
		// handle options checkboxes and radio buttons
		switch (checkbox.name) {
		  case 'snap':
			snap = checkbox.checked;
			setItem('snap', JSON.stringify(checkbox.checked));
			updateAngle();
			break;
		  case 'displayType':
			setDisplayType(checkbox.value);
			setItem('displayType', JSON.stringify(checkbox.value));
			break;
		  case 'colorScheme':
			colorScheme = checkbox.value;
			setItem('colorScheme', JSON.stringify(checkbox.value));
			updatecolorScheme();
			break;
		  default:
			alert('wot?');
		}
	}

	function loadOptions() {
		// load options from localStorage, and set checkboxes, etc. on page load
		// snap
		snap = getItem('snap') || false;
		$('input[name="snap"]').checked = (snap) ? true : false;

		// displayType
		displayType = getItem('displayType') || 'protractor';
		setDisplayType(displayType);
		$('#display_protractor').checked = (displayType === 'protractor') ? true : false;
		$('#display_compass').checked    = (displayType === 'compass')    ? true : false;

		// colorScheme
		colorScheme = getItem('colorScheme') || 'auto';
		updatecolorScheme();
		$('#scheme_auto').checked  = (colorScheme === 'auto')  ? true : false;
		$('#scheme_light').checked = (colorScheme === 'light') ? true : false;
		$('#scheme_dark').checked  = (colorScheme === 'dark')  ? true : false;
	}

	function updatecolorScheme() {
		document.documentElement.classList.remove('light', 'dark'); //reset values
		if (colorScheme === 'light') {
			document.documentElement.classList.add('light');
		} else if (colorScheme === 'dark') {
			document.documentElement.classList.add('dark');
		}
	}

	function init() {
		compass        = $('#compass');
		compassCard    = $('#compassCard');
		angleIndicator = $('#angleIndicator');
		compassOverlay = $('#compassOverlay');

		loadOptions(); // from localStorage
		getSize();

		// get query string, update angle
		if (location.search) {
			angleDegrees = Number(location.search.substring(1)) || 0;
			angleRadians = angleDegrees/360 * tau;
		}
		updateAngle();

		// mouse & touch
		compassOverlay.addEventListener("pointermove", getPointerAngle);
		compassOverlay.addEventListener("pointerover", getPointerOffset);

		// make overlays, handle section links
		$All('section').forEach(item => { item.classList.add('overlay'); }); // visible if JS disabled
		if (window.location.hash) { showSection(); }
		window.addEventListener('hashchange', showSection);

		// decode email URL
		$All('a[data-address]').forEach( (a) => { decodeURL(a); });
	}

	return {
		init,
		getSize,
		setOption
	};
})();

window.addEventListener('DOMContentLoaded', DegreesWhat.init);
window.addEventListener('resize', DegreesWhat.getSize);


// set up service worker for PWA
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("worker.js").then(
		(registration) => {
			console.log("Service worker registration successful");
		},
		(error) => {
			console.error("Service worker registration failed:", error);
		},
	);
} else {
	console.error("Service workers are not supported");
}

