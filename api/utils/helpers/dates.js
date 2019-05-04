exports.getDateDiff = (futureDate, currentDate) => {
  // delta
  let d = Math.abs(futureDate - currentDate) / 1000;
  // result
  const r = {};
  // structure
  const s = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  Object.keys(s).forEach(key => {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });
  // output example: { day:2, hour:14, minute: 56, second: 7 }
  return r.day;
};
