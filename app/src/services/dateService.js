export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get day, month, and year
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    // Return formatted date
    return `${month} ${day}, ${year}`;
};
