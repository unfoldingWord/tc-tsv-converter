/* eslint-disable no-useless-escape */

export const ELLIPSIS = '\u2026';
export const THREE_DOTS = '...';

// list of possible hyphen and dash characters used for range separator
export const ZERO_WIDTH_SPACE = '\u200B';
export const NO_BREAK_SPACE = '\u00A0';
export const ZERO_WIDTH_NO_BREAK_SPACE = '\uFEFF';
export const HARD_NL = `\\n`;

/**
 * look for a white space character not detected with trim()
 * @param {string} char
 * @returns {boolean}
 */
export const isExtraWhiteSpace = char => {
  const whiteSpaceChars = [ NO_BREAK_SPACE, ZERO_WIDTH_SPACE, ZERO_WIDTH_NO_BREAK_SPACE ];

  for (let i = 0; i < whiteSpaceChars.length; i++) {
    if (char === whiteSpaceChars[i]) {
      return true;
    }
  }
  return false;
};

/**
 * trim text of white space including zero width white space
 * @param text
 */
export const trimWhiteSpace = text => {
  let result = text;
  let changed = true;

  while (changed) {
    const trimmedText = result.trim();
    changed = result !== trimmedText;

    if (changed) {
      result = trimmedText;
    }

    if (result.length) {
      const leadingChar = result.substring(0,1);

      if (isExtraWhiteSpace(leadingChar)) {
        changed = true;
        result = result.substring(1);
      }

      if (result.length) {
        const trailingChar = result.substring(result.length - 1);

        if (isExtraWhiteSpace(trailingChar)) {
          changed = true;
          result = result.substring(0, result.length - 1);
        }
      }
    }
  }

  return result;
};
