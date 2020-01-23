export const formatApiDateToFriendly = (dateAsString) => {
  const parsedDate = new Date(Date.parse(dateAsString));
  // console.log(parsedDate, parsedDate.getYear());
  return (
    parsedDate.getDate() + "-" + 
    parsedDate.getMonth() + "-" + 
    (parseInt(parsedDate.getYear()) + 1900)
  )
}