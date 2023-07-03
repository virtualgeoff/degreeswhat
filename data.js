/*
	data.js
*/

/* jshint esversion: 6 */
/* globals $, $All */

var degreesData = {
	// interesting angles (in °)
	angles: [
		[
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
		],[
			// miscellaneous
			[0.5,   "is the approximate diameter of the Sun and of the Moon as viewed from Earth"],
			[5.145, "is the inclination of the Moon's orbit to the to the ecliptic plane (the orbital plane of Earth around the Sun)"],
			[15,    "is the angle the Earth turns in one hour"],
			[23.44, "is the angle of the tilt of the Earth's axis"],
			[6,     "is the angle the minute hand of an analogue clock turns in one minute, and the second had turns in one second"],
			[30,    "is the angle the hour hand of a (12 hour) analogue clock turns in one hour"],
			[34,    "is the angle of repose of dry sand"],
			[38,    "is the angle of repose of snow"],
			[45,    "is the angle of repose of gravel and wet sand"],
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
		],
	],

	// interesting temperatures (in K - convert to °C and °F)
	temperatures: [
		[
			// miscellaneous
			[287.91, "is the mean surface temperature of the Earth"],
			[310.15, "is the average normal human body temperature"],
			[194.69, "is the sublimation point of dry ice (CO₂) at standard atmospheric pressure"],
			[353.41, "is the sublimation point of Naphthalene at standard atmospheric pressure"],
		],
		[
			// melting and boiling points
			// elements
			['',      4.22,   "Helium"],
			[14.01,   20.28,  "Hydrogen"],
			[54.36,   90.20,  "Oxygen (O₂)"],
			[63.23,   77.36,  "Nitrogen (N₂)"],
			[171.6,   239.11, "Chlorine"],
			[234.43,  629.88, "Mercury"],
			[302.915, 2673,   "Gallium"],
			[336.53,  1032,   "Potassium"],
			[370.87,  1156,   "Sodium"],
			[386.85,  457.4,  "Iodine"],
			[388.36,  717.87, "Sulfur"],
			[429.75,  2345,   "Indium"],
			[544.7,   1837,   "Bismuth"],
			[594.22,  1040,   "Cadmium"],
			[600.61,  2022,   "Lead"],
			/*
			[923,     1363,   "Magnesium"],
			[933.47,  2792,   "Aluminium"],
			[692.68,  1180,   "Zinc"],
			[1337.33, 3129,   "Gold"],
			[1234.93, 2435,   "Silver"],
			[1357.77, 2835,   "Copper"],
			[1560,    2742,   "Beryllium"],
			[1728,    3186,   "Nickel"],
			[1811,    3134,   "Iron"],
			[1941,    3560,   "Titanium"],
			['' ,     4000,   "Carbon"],
			[2041.4,  4098,   "Platinum"],
			[3290,    5731,   "Tantalum"],
			[3695,    5828,   "Tungsten"],
			*/

			// compounds
			[90.694,  111.6,  "Methane"],
			[90.4,    184.6,  "Ethane"],
			[85.5,    230.90, "Propane"],
			[133,     272,    "Butane"],
			[159.01,  351.38, "Ethanol"],
			[175.6,   337.8,  "Methanol"],
			[182.60,  371.53, "Heptane"],
			[216.0,   398.2,  "Octane"],
			[260.2,   470.4,  "Ethylene glycol"],
			[273.15,  373.15, "Water"],
			[278.68,  353.2,  "Benzene"],
			[307.2,   '',     "Cocoa butter"],
			[310,     643,    "Paraffin wax"],
			[461,     '',     "Solder (60/40 Sn-Pb)"],
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
					str1 += `<b>${d[0]}°</b> is <sup>${d[1]}</sup>&frasl;<sub>${d[2]}</sub> of a revolution`;
				} else if (i===1) {
					str1 += `A compass bearing of <b>${d[0]}°</b> (${degreesData.convertToDegreesAndMinutes(d[0])}) is
						${d[1]} of the 32 points of the compass ${(d[2] ? d[2] : '')}`;
				} else if (i===2) {
					str1 += `<b>${d[0]}°</b> ${d[1]}`;
				} else if (i===3) {
					str1 += `<b>${d[0]}°</b> is the internal angle between the sides of a regular ${d[1]}`;
				} else if (i===4) {
					str1 += `<b>${d[0]}°</b> is the angle between the faces (the 'dihedral angle') of regular ${d[1]}`;
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
					if (d[0] !== '') {
						str1 += `<p data-degrees="${degreesData.convertKtoC(d[0])}"><b>${degreesData.convertKtoC(d[0])} °C</b> is the melting point of ${d[2]} at standard atmospheric pressure</p>`;
						str1 += `<p data-degrees="${degreesData.convertKtoF(d[0])}"><b>${degreesData.convertKtoF(d[0])} °F</b> is the melting point of ${d[2]} at standard atmospheric pressure</p>`;
					}
					if (d[1] !== '') {
						str1 += `<p data-degrees="${degreesData.convertKtoC(d[1])}"><b>${degreesData.convertKtoC(d[1])} °C</b> is the boiling point of ${d[2]} at standard atmospheric pressure</p>`;
						str1 += `<p data-degrees="${degreesData.convertKtoF(d[1])}"><b>${degreesData.convertKtoF(d[1])} °F</b> is the boiling point of ${d[2]} at standard atmospheric pressure</p>`;
					}
				}
			}
		}

		$('#info2').innerHTML += str1;

		// show info if query string present
		if (location.search) {
			let d = Number(location.search.substring(1)) || 0;
			degreesData.showInfo(d);
		} else {
			degreesData.showInfo(0);
		}
	},

	showInfo: function(d) {
		// for each p in #info2, show if dataset.degrees is within 1.5° of the current angle
		$All('#info2 p[data-degrees]').forEach(p => {
			let dd = d - p.dataset.degrees;
			p.style.display = ((dd >= -1.5) && (dd <= 1.5)) ? 'block' : 'none';
		});

		// color
		//document.body.style.background = `hsl(${d}deg, 100%, 50%)`;
		//$('#color').innerHTML = `HSL(<b>${d}°</b>, 100%, 50%) is the color: <span style="background:hsl(${d}deg, 100%, 50%)">&nbsp;</span>`;
	}
};

window.addEventListener('load', degreesData.writeToPage);
