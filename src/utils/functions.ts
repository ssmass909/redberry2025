export const getGeorgianDates = (isoDate: string) => {
  const monthsGeorgian = ["იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];
  const georgianWeekdays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();

    const weekdayAbbr = georgianWeekdays[dayOfWeek];

    return {
      taskInfoPage: `${weekdayAbbr} - ${month.toString().padStart(2, "0")}/${day}/${year}`,
      tasksPage: `${day} ${monthsGeorgian[monthIndex]}, ${year}`,
    };
  } catch (error) {
    console.error("Error formatting date:", error);
    return {
      taskInfoPage: "Invalid date",
      tasksPage: "Invalid date",
    };
  }
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
