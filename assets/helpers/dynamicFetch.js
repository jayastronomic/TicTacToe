async function dynamiceFetch(path, player) {
  const API = `http://localhost:4000/api/v1${path}`;
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
    credentials: "include",
  };
  const response = await fetch(API, payload);
  const data = await response.json();
  return data;
}
