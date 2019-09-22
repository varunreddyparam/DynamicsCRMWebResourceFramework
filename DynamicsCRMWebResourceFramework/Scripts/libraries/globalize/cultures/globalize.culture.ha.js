/*jsl:ignore*/
/*
 * Globalize Culture ha
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

Globalize.addCultureInfo( "ha", "default", {
	name: "ha",
	englishName: "Hausa",
	nativeName: "Hausa",
	language: "ha",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Lahadi","Litinin","Talata","Laraba","Alhamis","Juma'a","Asabar"],
				namesAbbr: ["Lah","Lit","Tal","Lar","Alh","Jum","Asa"],
				namesShort: ["L","L","T","L","A","J","A"]
			},
			months: {
				names: ["Januwaru","Febreru","Maris","Afrilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktocba","Nuwamba","Disamba",""],
				namesAbbr: ["Jan","Feb","Mar","Afr","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis",""]
			},
			AM: ["Safe","safe","SAFE"],
			PM: ["Yamma","yamma","YAMMA"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

}( this ));

/*jsl:end*/
