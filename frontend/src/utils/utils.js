export const formatDate = (dateString) => {
  console.log("datestring", dateString);
  const date = new Date(dateString);

  // Get day, month, year, hours, and minutes
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};
