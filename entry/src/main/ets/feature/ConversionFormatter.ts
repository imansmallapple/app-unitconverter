export function formatConversion(value: number): string {
  let result: string = ''
  if ((value > Math.pow(10, RESULT_MAX_LENGTH))) {
    result = value.toExponential(RESULT_MAX_PRECISION);
  } else {
    result = parseFloat(value.toFixed(RESULT_MAX_PRECISION)).toString();
    if (result.length > RESULT_MAX_LENGTH) {
      const decimalLength = (result.split('.')[1]).length;
      const precision = Math.max(decimalLength - (result.length - RESULT_MAX_LENGTH), 0);
      result = parseFloat(value.toFixed(precision)).toString();
    }
  }
  return result;
}

const RESULT_MAX_LENGTH = 14;
const RESULT_MAX_PRECISION = 8;