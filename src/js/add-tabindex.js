// add a tabindex on code blocks when they overflow in the x direction
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach((pre) => {
    if (
      pre.scrollWidth > pre.clientWidth ||
      pre.scrollHeight > pre.clientHeight
    ) {
      pre.setAttribute('tabindex', '0');
    }
  });
});
