const truncateText = (text: string, maxTextLength = 120) =>
  text.length > maxTextLength ? text.slice(0, maxTextLength - 1) + '…' : text;

export { truncateText };
