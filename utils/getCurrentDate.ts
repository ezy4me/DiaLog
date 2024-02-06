const getCurrentDate = () => {
  const date = new Date();
  const month = date
    .toLocaleString("ru", { month: "short" })
    .split("")
    .map((char, index) => (index == 0 ? char.toLocaleUpperCase() : char))
    .join("");
  const day = date.toLocaleString("ru", { day: "numeric" });
  const year = date.toLocaleString("ru", { year: "numeric" });

  return `${month} ${day}, ${year}`;
};

export default getCurrentDate;
