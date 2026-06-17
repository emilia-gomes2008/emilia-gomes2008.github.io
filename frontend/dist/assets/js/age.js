const BIRTH_DATE = new Date(2008, 3, 20, 0, 0, 0);

function calculateAge(now) {
  let years = now.getFullYear() - BIRTH_DATE.getFullYear();
  let months = now.getMonth() - BIRTH_DATE.getMonth();
  let days = now.getDate() - BIRTH_DATE.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const weeks = Math.floor(days / 7);
  days = days % 7;

  return { years, months, weeks, days };
}

function pluralize(value, unit) {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

function renderAge() {
  const container = document.getElementById("age-display");
  if (!container) return;

  const { years, months, weeks, days } = calculateAge(new Date());
  const units = [
    { value: years, label: "year" },
    { value: months, label: "month" },
    { value: weeks, label: "week" },
    { value: days, label: "day" },
  ].filter((unit) => unit.value > 0);

  container.innerHTML = units
    .map(
      (unit) => `
      <div class="age-unit">
        <div class="num">${unit.value}</div>
        <div class="label">${pluralize(unit.value, unit.label)}</div>
      </div>`
    )
    .join("");
}

renderAge();
setInterval(renderAge, 1000);
