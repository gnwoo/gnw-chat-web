export const checkAuthStatus = async () => {
  fetch("http://localhost:8080/authStatus", {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: "include",
  })
  .then(res =>  {
    if (res.ok) {
      console.log("auth check ok");
      return true;
    } else {
      throw new Error(); 
    }
  })
  .catch(error => {
    console.log("auth check no");
    return false;
  });
};
