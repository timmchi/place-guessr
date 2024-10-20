export const formatDate = (dateString) => {
  console.log("datestring", dateString);
  const date = new Date(dateString);

  // Get day, month, year, hours, and minutes
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // Full month name
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};
