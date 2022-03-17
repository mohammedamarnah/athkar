export function jsonFetch(url) {
  return fetch(url).then((resp) => resp.json());
}

export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export function timeIsLarger(time1, time2) {
  return new Date(`1/1/1999 ${time1}`) >= new Date(`1/1/1999 ${time2}`);
}

export function fetchAthanTimes(latitude, longitude) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const api = 'https://api.aladhan.com/v1/calendar';
  return jsonFetch(
    `${api}?latitude=${latitude}&longitude=${longitude}&method=4&month=${month}&year=${year}`
  );
}

export function setInitialColorMode(resp, colorMode, toggleColorMode) {
  const now = new Date();
  const hours = now.getHours();
  const minutes =  `${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
  const currentTime = `${hours}:${minutes}`;

  const maghribTime =
    resp.data[now.getDate() - 1].timings.Maghrib.split(' ')[0];
  const fajrTime = (
    resp.data[now.getDate()] || resp.data[now.getDate() - 1]
  ).timings.Fajr.split(' ')[0];

  if (
    (timeIsLarger(currentTime, fajrTime) && colorMode === 'dark') ||
    (timeIsLarger(currentTime, maghribTime) && colorMode === 'light')
  ) {
    toggleColorMode();
  }
}

export function setDarkModeOnAthan(colorMode, toggleColor) {
  const location = getWithExpiry('location_coordinates');
  if (location) {
    const latitude = location.split(' ')[0];
    const longitude = location.split(' ')[1];
    fetchAthanTimes(latitude, longitude).then((resp) =>
      setInitialColorMode(resp, colorMode, toggleColor)
    );
  } else {
    console.log("fetching from ip registry again...");
    const key = 'x95i5ncysbrcywd9';
    jsonFetch(`https://api.ipregistry.co/?key=${key}`).then((resp) => {
      const latitude = resp.location.latitude;
      const longitude = resp.location.longitude;
      setWithExpiry(
        'location_coordinates',
        `${latitude} ${longitude}`,
        2628000000
      );
      fetchAthanTimes(latitude, longitude).then((resp) =>
        setInitialColorMode(resp, colorMode, toggleColor)
      );
    });
  }
}
