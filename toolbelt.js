(function (root) {
    "use strict";
    var belt = function () {
        this.goldenRatio = (2 + Math.sqrt(5)) / 2;
    };
    
    belt.getRadians = function (angle) {
        return angle * Math.PI / 180;
    };
    
    belt.distAB = function (p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    
    belt.getCoordsOnCircle = function (angle, distance, optCoords) {
        var rad = this.getRadians(angle),
            c = {};
        optCoords = (typeof optCoords === "undefined") ? {x: 0, y: 0} : optCoords;
        c.x = Math.cos(rad) * distance + optCoords.x;
        c.y = Math.sin(rad) * distance + optCoords.y;
        return c;
    };
    
    belt.isLeapYear = function (year) {
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    };
    
    belt.getDaysInMonth = function (month, year, zeroIndex) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            leapDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        if(this.isLeapYear(year)) {
            return zeroIndex?leapDays[month]:leapDays[month-1];    
        }
        return zeroIndex?days[month]:days[month-1];    
        
    }
    root.requestAnimationFrame = (function () {
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());
    root.tb = belt;
}(window));