export const getGeorgianDate = (isoDate: string) => {
  const monthsGeorgian = ["იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const month = monthsGeorgian[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
};

export const generateRandomColors = (x: number) => {
  const colors: string[] = [];
  for (let i = 0; i < x; i++) {
    const color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    colors.push(color);
  }
  return colors;
};

export const abbreviateText = (text: string, targetLength: number) => {
  let words = text.split(" ");
  const overflow = text.length - targetLength;
  if (overflow <= 0) return text;

  const lettersPerWord = Math.floor(targetLength / words.length) - 1;
  words = words.map((word) => word.substring(0, lettersPerWord));
  const result = words.join(". ") + ".";
  console.log(lettersPerWord, result);
  return result;
};
