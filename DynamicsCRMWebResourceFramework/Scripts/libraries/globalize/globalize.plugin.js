/// <reference path="globalize.0.1.1.js" />

(function ($) {
    "use strict";

    $.localize = Globalize.localize || function (key, defaultValue, culture) { //ignore jslint
        return defaultValue;
    };

    $.format = Globalize.format || function (value, format, culture) { //ignore jslint
        return value;
    };

    $.parseInt = Globalize.parseInt || function (value, radix, culture) { //ignore jslint
        return parseInt(value, radix);
    };

    $.parseFloat = Globalize.parseFloat || function (value, culture) { //ignore jslint
        return parseFloat(value);
    };

    $.culture = Globalize.culture || function (cultureSelector) {
        return cultureSelector;
    };

}(jQuery));