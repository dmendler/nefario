export const parseTimeInput = (input) => {
    if (typeof input !== "string") return NaN;
    input = input.trim();
    if (input.includes(":")) {
      const [minutes, seconds] = input.split(":");
      return parseInt(minutes, 10) * 60 + parseFloat(seconds);
    } else {
      return parseFloat(input);
    }
  };
  