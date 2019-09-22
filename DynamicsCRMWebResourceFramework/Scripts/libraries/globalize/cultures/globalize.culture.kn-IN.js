/*jsl:ignore*/
/*
 * Globalize Culture kn-IN
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {

var Globalize;

if ( typeof require !== "undefined" &&
	typeof exports !== "undefined" &&
	typeof module !== "undefined" ) {
	// Assume CommonJS
	Globalize = require( "globalize" );
} else {
	// Global variable
	Globalize = window.Globalize;
}

Globalize.addCultureInfo( "kn-IN", "default", {
	name: "kn-IN",
	englishName: "Kannada (India)",
	nativeName: "ಕನ್ನಡ (ಭಾರತ)",
	language: "kn",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ರೂ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
				namesAbbr: ["ಭಾನು.","ಸೋಮ.","ಮಂಗಳ.","ಬುಧ.","ಗುರು.","ಶುಕ್ರ.","ಶನಿ."],
				namesShort: ["ರ","ಸ","ಮ","ಬ","ಗ","ಶ","ಶ"]
			},
			months: {
				names: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್",""],
				namesAbbr: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್",""]
			},
			AM: ["ಪೂರ್ವಾಹ್ನ","ಪೂರ್ವಾಹ್ನ","ಪೂರ್ವಾಹ್ನ"],
			PM: ["ಅಪರಾಹ್ನ","ಅಪರಾಹ್ನ","ಅಪರಾಹ್ನ"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

}( this ));

/*jsl:end*/
