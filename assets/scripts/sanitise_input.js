const sanitise = function (inputString) {
  const validChars = '0123456789.';
  
  const sign = (function () {
    if (inputString[0] === '-') {
      return false;
    } else if (inputString[0] === '+') {
      return true;
    } else {
      return true;
    }
  })();

  const processed = inputString
    .split('')
    .filter(char => validChars.indexOf(char) >= 0)
    .join('');

  const whereTheDotIs = processed.indexOf('.');
  const processedWithOnlyOneDot = processed
    .split('')
    .filter((char, idx) => (char !== '.' || idx === whereTheDotIs))
    .join('');

  const returnedString = (whereTheDotIs > 0) ? processedWithOnlyOneDot : processed;
  
  const returnedFloatWithoutSign = (returnedString.length > 0) ?
    (!!parseFloat(returnedString) ? parseFloat(returnedString) : 0) :
    0;
  const returnedFloat = (!!sign) ? returnedFloatWithoutSign : -returnedFloatWithoutSign;

  return returnedFloat;
}