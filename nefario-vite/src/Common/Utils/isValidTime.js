import { parseTimeInput } from './parseTimeInput';

export const isValidTime = (input) => {
  if (typeof input === "string") {
    input = input.trim();
    if (input.toUpperCase() === "NT") return false;
    const parsed = parseTimeInput(input);
    return !isNaN(parsed);
  }
  return typeof input === "number" && !isNaN(input);
};
