const monthAbbreviations: any = {
  "Янв.": "01",
  "Февр.": "02",
  "Март": "03",
  "Апр.": "04",
  "Май": "05",
  "Июнь": "06",
  "Июль": "07",
  "Авг.": "08",
  "Сент.": "09",
  "Окт.": "10",
  "Нояб.": "11",
  "Дек.": "12",
};

const convertToISODate = (inputDate: string, inputTime: string) => {
  const parts = inputDate.split(" ");
  const month = monthAbbreviations[parts[0]];
  const day = parts[1].replace(",", "");
  const year = parts[2];
  
  const timeParts = inputTime.split(":");

  const isoDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(timeParts[0]),
    parseInt(timeParts[1])
  );

  return isoDate.toISOString();
}

export default convertToISODate;
