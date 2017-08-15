"use strict";

const TO_ROMAN_NOTATION = {
    "0": "N",
    "1": "I",
    "4": "IV",
    "5": "V",
    "9": "IX",
    "10": "X",
    "40": "XL",
    "50": "L",
    "90": "XC",
    "100": "C",
    "400": "CD",
    "500": "D",
    "900": "CM",
    "1000": "M"
};

const ATOMIC_ROMAN_NUMBER_EQUIVALENTS = Object.keys(TO_ROMAN_NOTATION);

function isInRange(value, start, end) {
    return value >= start && value < end;
}

function toRoman(value) {
    var result = "";
    while (value >= 0) {
        let i = ATOMIC_ROMAN_NUMBER_EQUIVALENTS.length - 1;
        while (i >= 0 && ATOMIC_ROMAN_NUMBER_EQUIVALENTS[i] > value) {
            i--;
        }
        value -= ATOMIC_ROMAN_NUMBER_EQUIVALENTS[i];
        result += TO_ROMAN_NOTATION[ATOMIC_ROMAN_NUMBER_EQUIVALENTS[i]];
        if (value === 0) {
            break;
        }
    }

    return result;
}

function isCorrectTime(parts) {
    return parts.length === 2 &&
        parts[0].length === 2 &&
        parts[1].length === 2 &&
        isInRange(parts[0], 0, 24) &&
        isInRange(parts[1], 0, 60);
}

/**
 * @param {String} time – время в формате HH:MM (например, 09:05)
 * @returns {String} – время римскими цифрами (IX:V)
 */
function romanTime(time) {
    if (time === undefined || time === null) {
        throw new TypeError("time argument is null or undefined);
    }
    var parts = time.split(":");
    if (!isCorrectTime(parts)) {
        throw new TypeError("Argument is not a correct time representation. Expected time in following format: HH:MM");
    }
    
    return parts.map(part => toRoman(parseInt(part))).join(":");
}

module.exports = romanTime;
