const isNumber = require("is-number");

/**
 * @method isEmpty  function
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const esIsEmpty = (value) => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

const esGetNumber = (value) => {
  let num = 0;
  if (!esIsEmpty(value)) {
    num = Number(value);
    num = isNumber(num) ? num : 0;
  }

  return num;
};

module.exports = { esGetNumber, esIsEmpty };
