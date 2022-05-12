export const snakeToPrettyString = (input: string) => {
  return input
    .split("_")
    .map((str) => str[0].toUpperCase() + str.substring(1))
    .join(" ");
};
