export const dateConvertForMUI = (inputDate) => {
    // Parse the input date in "MMM, DD, YYYY" format
    const parsedDate = new Date(inputDate);
  
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date"; // Handle invalid dates here
    }
  
    // Convert the date to ISO 8601 format
    const isoDate = parsedDate.toISOString();
  
    // Return the ISO 8601 formatted date
    return isoDate;
  }

export const dateConvertForUser = (isoDate) => {
    // Parse the ISO date string into a Date object
    const date = new Date(isoDate);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid dates here
    }
  
    // Define an array of month names
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Get the month, day, and year components from the date
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Create the custom date format "MMM, DD, YYYY"
    const customDate = `${month}, ${day.toString().padStart(2, '0')}, ${year}`;
  
    return customDate;
  }
  