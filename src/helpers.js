export function setWithExpiry(key, value, ttl) {
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

export function timeIsLarger(time1, time2) {
  return new Date(`1/1/1999 ${time1}`) >= new Date(`1/1/1999 ${time2}`);
}

export function timeIsBetween(time, betweenA, betweenB) {
  return timeIsLarger(time, betweenA) && timeIsLarger(betweenB, time);
}

export function setInitialColorMode(resp, now, toggleColorMode, initialColorState) {
  const maghribTime = resp.data[now.getDate() - 1].timings.Maghrib.split(' ')[0];
  const fajrTime = (resp.data[now.getDate()] || resp.data[now.getDate() - 1]).timings.Fajr.split(' ')[0];
  const currentTime = `${now.getHours()}:${now.getMinutes()}`;

  if ((timeIsBetween(currentTime, fajrTime, maghribTime) && initialColorState) ||
    (timeIsBetween(currentTime, maghribTime, fajrTime) && !initialColorState)) {
    toggleColorMode();
  }
}
