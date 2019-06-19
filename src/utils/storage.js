export default {
  fetch(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
}