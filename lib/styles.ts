export const css2style = (css: React.CSSProperties) => {
  let str = '';
  for (const [key, value] of Object.entries(css)) {
    let clo = '';
    key.split('').forEach((lt) => {
      if (lt.toUpperCase() === lt) {
        clo += '-' + lt.toLowerCase();
      } else {
        clo += lt;
      }
    });
    str += clo + ':' + value + ';';
  }
  return str;
};
