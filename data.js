/*
	data.js
*/

/* jshint esversion: 6 */
/* globals $, $All */

var degreesData = {
	// interesting angles (in °)
	angles: [
		[
			// miscellaneous
			[0.5,   "is the approximate diameter of the Sun and of the Moon as viewed from Earth"],
			[5.145, "is the inclination of the Moon's orbit to the to the ecliptic plane (the orbital plane of Earth around the Sun)"],
			[15,    "is the angle the Earth turns in one hour"],
			[23.44, "is the angle of the tilt of the Earth's axis"],
			[6,     "is the angle the minute hand of an analogue clock turns in one minute, and the second had turns in one second"],
			[30,    "is the angle the hour hand of a (12 hour) analogue clock turns in one hour"],
			[57.296, "(57°17′44.8″) is one radian (180°/𝛑 exactly)"],
			[360,   " is 1 revolution, or 1 turn"],
			// polygons
			[60,     "is the angle between the sides of an equilateral triangle"],
			[90,     "is a right angle, the angle between the sides of a square"],
		],[
			// polygons2
			[108,    "pentagon"],
			[120,    "hexagon"],
			[128.57, "heptagon (128<sup>4</sup>⁄<sub>7</sub>° exactly)"],
			[135,    "octagon"],
			[140,    "nonagon"],
			[144,    "decagon"],
			[150,    "dodecagon"],
		],[
			// polyhedra
			[70.529,  "tetrahedron"],
			[109.471, "octahedron"],
			[116.565, "dodecahedron"],
			[138.190, "icosahedron"],
		],[
			// turns
			[30,  1, 12],
			[45,  1, 8],
			[60,  1, 6],
			[90,  1, 4],
			[120, 1, 3],
			[135, 3, 8],
			[150, 5, 12],
			[180, 1, 2],
			[210, 7, 12],
			[225, 5, 8],
			[240, 2, 3],
			[270, 3, 4],
			[300, 5, 6],
			[315, 7, 8],
			[330, 11,12],
		],[
			// compassPoints
			[11.25,  "North by East      (NbE),  the  1st"],
			[22.50,  "North-Northeast    (NNE),  the  2nd"],
			[33.75,  "Northeast by North (NEbN), the  3rd"],
			[45.00,  "Northeast          (NE),   the  4th"],
			[56.25,  "Northeast by East  (NEbE), the  5th"],
			[67.50,  "East-Northeast     (ENE),  the  6th"],
			[78.75,  "East by North      (EbN),  the  7th"],
			[90.00,  "East               (E),    the  8th"],
			[101.25, "East by South      (EbS),  the  9th"],
			[112.50, "East-Southeast     (ESE),  the 10th"],
			[123.75, "Southeast by East  (SEbE), the 11th"],
			[135.00, "Southeast          (SE),   the 12th"],
			[146.25, "Southeast by South (SEbS), the 13th"],
			[157.50, "South-Southeast    (SSE),  the 14th"],
			[168.75, "South by East      (SbE),  the 15th"],
			[180.00, "South              (S),    the 16th"],
			[191.25, "South by West      (SbW),  the 17th"],
			[202.50, "South-Southwest    (SSW),  the 18th"],
			[213.75, "Southwest by South (SWbS), the 19th"],
			[225.00, "Southwest          (SW),   the 20th"],
			[236.25, "Southwest by West  (SWbW), the 21st"],
			[247.50, "West-Southwest     (WSW),  the 22nd"],
			[258.75, "West by South      (WbS),  the 23rd"],
			[270.00, "West               (W),    the 24th"],
			[281.25, "West by North      (WbN),  the 25th"],
			[292.50, "West-Northwest     (WNW),  the 26th"],
			[303.75, "Northwest by West  (NWbW), the 27th"],
			[315.00, "Northwest          (NW),   the 28th"],
			[326.25, "Northwest by North (NWbN), the 29th", "<br><br>(Note that there is no actual compass point of <a href=\"https://en.wikipedia.org/wiki/North_by_Northwest\" target=\"_blank\">North by Northwest</a>)"],
			[337.50, "North-Northwest    (NNW),  the 30th"],
			[348.75, "North by West      (NbW),  the 31st"],
			[360.00, "North              (N),    the last (or zeroth)"],
		],
	],

	// interesting temperatures (in K - convert to °C and °F)
	temperatures: [
		[
			// miscellaneous
			[287.91, "is the mean surface temperature of the Earth"],
			[310.15, "is the average normal human body temperature"],
			[194.69, "is the sublimation point of dry ice (CO₂)"],
		],
		[
			// melting points
			[63.23, "Nitrogen (N₂) (−209.86 °C, −345.75 °F)"],
			[83.81, "Argon (Ar)    (−189.34 °C, −308.81 °F)"],
			[54.36, "Oxygen (O₂)   (−218.79 °C, −361.82 °F)"],
			[273.15, "Water"],
		],
		[
			// boiling points
			[77.355, "Nitrogen (N₂) (−195.795 °C, −320.431 °F)"],
			[87.302, "Argon (Ar)    (−185.848 °C, −302.526 °F)"],
			[90.188, "Oxygen (O₂)   (−182.962 °C, −297.332 °F)"],
			[373.13, "Water"],
		],
	],

	convertToDegreesAndMinutes: function(d) {
		let deg = Math.floor(d);
		let min = ((d % 1) * 60).toFixed(0);
		return deg + '°' + min + '′';
	},
	convertKtoC: function(d) {
		return (d - 273.15).toFixed(1);
	},
	convertKtoF: function(d) {
		return (d * 9/5 - 459.67).toFixed(1);
	},

	writeToPage: function() {
		let d,
			str1 = '';

		// angles
		for (let i=0; i<degreesData.angles.length; i++) {
			for (let j=0; j<degreesData.angles[i].length; j++) {
				d = degreesData.angles[i][j];
				str1 += `<p data-degrees="${d[0]}">`;

				if (i===0) {
					str1 += `<b>${d[0]}°</b> ${d[1]}`;
				} else if (i===1) {
					str1 += `<b>${d[0]}°</b> is the internal angle between the sides of a regular ${d[1]}`;
				} else if (i===2) {
					str1 += `<b>${d[0]}°</b> is the angle between the faces (the 'dihedral angle') of regular ${d[1]}`;
				} else if (i===3) {
					str1 += `<b>${d[0]}°</b> is <sup>${d[1]}</sup>&frasl;<sub>${d[2]}</sub> of a revolution`;
				} else if (i===4) {
					str1 += `A compass bearing of <b>${d[0]}°</b> (${degreesData.convertToDegreesAndMinutes(d[0])}) is
						${d[1]} of the 32 points of the compass ${(d[2] ? d[2] : '')}`;
				}
				str1 += '</p>';
			}
		}

		// temperatures
		for (let i=0; i<degreesData.temperatures.length; i++) {
			for (let j=0; j<degreesData.temperatures[i].length; j++) {
				d = degreesData.temperatures[i][j];

				if (i===0) {
					str1 += `<p data-degrees="${degreesData.convertKtoC(d[0])}"><b>${degreesData.convertKtoC(d[0])} °C</b> ${d[1]}</p>`;
					str1 += `<p data-degrees="${degreesData.convertKtoF(d[0])}"><b>${degreesData.convertKtoF(d[0])} °F</b> ${d[1]}</p>`;
				} else if (i===1) {
					str1 += `<p data-degrees="${degreesData.convertKtoC(d[0])}"><b>${degreesData.convertKtoC(d[0])} °C</b> is the melting point of ${d[1]} at standard atmospheric pressure</p>`;
					str1 += `<p data-degrees="${degreesData.convertKtoF(d[0])}"><b>${degreesData.convertKtoF(d[0])} °F</b> is the melting point of ${d[1]} at standard atmospheric pressure</p>`;
				} else if (i===2) {
					str1 += `<p data-degrees="${degreesData.convertKtoC(d[0])}"><b>${degreesData.convertKtoC(d[0])} °C</b> is the boiling point of ${d[1]} at standard atmospheric pressure</p>`;
					str1 += `<p data-degrees="${degreesData.convertKtoF(d[0])}"><b>${degreesData.convertKtoF(d[0])} °F</b> is the boiling point of ${d[1]} at standard atmospheric pressure</p>`;
				}
			}
		}

		$('#info2').innerHTML += str1;
	}
};

window.addEventListener('load', degreesData.writeToPage);
