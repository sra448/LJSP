// just some functions that might come in handy

getContentInBrackets = function(str) {
  var bracketCount = 0,
      resultString = "";

  for (var i = 0, l = str.length; i < l; i++) {
    if (str[i] === '(') {
      bracketCount += 1;
    } else if (str[i] === ')') {
      bracketCount -= 1;
      if (bracketCount <= 0) {
        return resultString.substr(1);
      }
    }

    resultString += str[i];
  }

  return resultString;

};
