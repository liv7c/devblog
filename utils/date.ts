export const getFormattedDate = (
  rawDate: string,
  dateStyle: Intl.DateTimeFormatOptions['dateStyle'] = 'medium'
) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle,
  }).format(new Date(rawDate));

  return formattedDate;
};
