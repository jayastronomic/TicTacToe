var $ = (q) => {
  const elements = document.querySelectorAll(q);
  if (elements.length > 1) {
    return elements;
  } else if (elements.length === 1) {
    return elements[0];
  }
};
