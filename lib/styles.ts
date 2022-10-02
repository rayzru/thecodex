/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const css2style = (css: React.CSSProperties) => {
  let str = '';
  for (const [key, value] of Object.entries(css)) {
    let clo = '';
    key.split('').forEach((lt) => {
      clo += lt.toUpperCase() === lt ? '-' + lt.toLowerCase() : lt;
    });
    str += `${clo}:${value};`;
  }
  return str;
};
