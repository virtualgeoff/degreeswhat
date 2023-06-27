/*
	Degrees What?

	Degrees What? is a light-hearted tool for converting temperatures between Celsius (°C)
	Fahrenheit (°F), Kelvin (K) and other scales.

	It also shows some interesting facts about angles and temperatures.

	Geoff Pack, June 2023
	https://github.com/virtualgeoff/degreeswhat
*/

/* jshint esversion: 6 */

// shortcuts
const $ = document.querySelector.bind(document);
const $All = document.querySelectorAll.bind(document);

const Angulator = (function() {
	'use strict';

	let center,
		mouse,
		radius = 130,
		angleRadians = 0,
		angleDegrees = 0,
		tau = 2 * Math.PI,
		displayType, // 'compass' | 'protractor'
		compass, compassCard, angleIndicator, degreeMarks, degreeNumbers;

	function drawCompass() {
		let h = parseFloat(degreeNumbers.getAttribute('font-size')),
			textOffset = 4,
			angle, scale,
			str1 = '',
			str2 = '';

		let points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

		// set display type and default angle (if no mouse position yet)
		displayType = 'compass';
		angleDegrees = 90;

		// marks
		for (let i=0; i<360; i++) {
			let length = 5;
			if ((i % 5)  === 0) { length = 9;}
			if ((i % 15) === 0) { length = 15; }
			str1 += `<line x1="0" y1="${radius}" x2="0" y2="${radius-length}" transform="rotate(${i})" />`;
		}
		degreeMarks.innerHTML = str1;

		// numbers
		for (let i=0; i<360; i+=15) {
			angle = i + 180;
			str2 += `
				<g x="0" y="0" transform="rotate(${angle}) translate(0,${radius - h * textOffset})">
					<text x="0" y="0" transform="rotate(180)">${i}</text>
				</g>`;
		}
		// points of the compass
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
		degreeNumbers.innerHTML = str2;
	}

	function drawProtractor() {
		let h = parseFloat(degreeNumbers.getAttribute('font-size')),
			textOffset = 4,
			length, angle, angle2, yPos,
			str1 = '',
			str2 = '';

		// set display type and default angle (if no mouse position yet)
		displayType = 'protractor';
		angleDegrees = 0;

		// marks
		for (let i=0; i<360; i++) {
			length = 5;
			if ((i % 5)  === 0) { length = 9;}
			if ((i % 10) === 0) { length = radius-15; }
			if ((i % 90) === 0) { length = radius; }
			str1 += `<line x1="0" y1="${radius}" x2="0" y2="${radius-length}" transform="rotate(${i})" />`;
		}
		degreeMarks.innerHTML = str1;

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
		degreeNumbers.innerHTML = str2;
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

		if (displayType === 'compass') {
			$('#text1').setAttribute('transform', 'translate(0,-26)');
			$('#text2').setAttribute('transform', 'translate(0, 26)');
		} else {
			$('#text1').setAttribute('transform', 'translate(0,-44)');
			$('#text2').setAttribute('transform', 'translate(0, 44)');
		}

		// big text
		$('#textAngle').textContent = `${D}°`;
		$('#textC').textContent     = `${C} °C = `;
		$('#textCtoF').textContent  = `${CtoF} °F`;
		$('#testF').textContent     = `${D} °F = `;
		$('#testFtoC').textContent  = `${FtoC} °C`;

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
		// for each p in #info2, show if dataset.degrees is within 1.5° of the current angle
		$All('#info2 p[data-degrees]').forEach(p => {
			let dd = d - p.dataset.degrees;
			p.style.display = ((dd >= -1.5) && (dd <= 1.5)) ? 'block' : 'none';
		});
	}

	function updateAngle() {
		// calculate angle
		// note atan2(y, x) gives the counterclockwise angle, in radians,
		// between the positive x-axis and the point (x, y)
		if (mouse) {
			angleRadians = -1 * Math.atan2((mouse.y-center.y), (mouse.x-center.x));
			if (displayType === 'compass') { angleRadians -= tau/4; }
			angleDegrees = angleRadians/tau * 360;
		} else if (location.search) {
			angleDegrees = Number(location.search.substring(1)) || 0;
			if (angleDegrees > 5000) { angleDegrees = 5000; }
			if (angleDegrees < -459) { angleDegrees = -459; }
			angleRadians = angleDegrees/360 * tau;
		}

		//  adjust angle range
		if (displayType === 'compass') {
			angleDegrees = (angleDegrees + 360) % 360; // 0 <= angle < 360;
			angleRadians = (angleRadians + tau) % tau; // 0 <= angle < tau
		}

		//  rotate compass card or indicator line
		if (displayType === 'compass') {
			compassCard.setAttribute('transform', `rotate(${-angleDegrees})`);
			angleIndicator.setAttribute('transform', 'rotate(-90)');
		} else {
			compassCard.setAttribute('transform', 'rotate(0)');
			angleIndicator.setAttribute('transform', `rotate(${-angleDegrees})`);
		}

		// update text
		updateInfo();
	}

	function setType(value) {
		if (value === 'compass') {
			drawCompass();
		} else {
			drawProtractor();
		}
		updateAngle();
	}

	function mouseMove(e) {
		//console.log(e);
		mouse = {x:e.offsetX, y:e.offsetY};
		updateAngle();
	}

	function getSize(e) {
		//console.log(e);
		center = {x:compass.clientWidth/2, y:compass.clientHeight/2};
		updateAngle();
	}

	function init() {
		compass        = $('#compass');
		compassCard    = $('#compassCard');
		angleIndicator = $('#angleIndicator');
		degreeMarks    = $('#degreeMarks');
		degreeNumbers  = $('#degreeNumbers');

		drawProtractor();
		getSize();

		//compass.addEventListener("mousemove", mouseMove);
		compassCard.addEventListener("mousemove", mouseMove);
	}

	return {
		init,
		getSize,
		setType
	};
})();

window.addEventListener('load', Angulator.init);
window.addEventListener('resize', Angulator.getSize);
