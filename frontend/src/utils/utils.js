// EEST is fine for now, but time needs to be according to the users timezone
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    timeZone: "Europe/Athens", // EEST time zone
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};
