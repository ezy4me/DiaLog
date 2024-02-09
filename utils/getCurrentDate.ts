const getCurrentDate = (value?: string) => {
  let date = new Date();

  if (value) {
    if (value.includes("-")) {
      date = new Date(value);
      return date.toLocaleDateString('ru')
    } else if (value.includes("/")) {
      const dateParts = value.split("/");
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      date = new Date(year, month, day);
    }
  }

  const monthStr = date
    .toLocaleString("ru", { month: "short" })
    .split("")
    .map((char, index) => (index === 0 ? char.toLocaleUpperCase() : char))
    .join("");
  const dayStr = date.toLocaleString("ru", { day: "numeric" });
  const yearStr = date.toLocaleString("ru", { year: "numeric" });

  return `${monthStr} ${dayStr}, ${yearStr}`;
};

export default getCurrentDate;
