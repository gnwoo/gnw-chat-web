export const checkAuthStatus = (username, JWT) => {
  fetch("http://localhost:8080/authStatus", {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      JWT: JWT
    }
  )})
  .then(res =>  {
    return res.ok;
  });

  return false;
};
