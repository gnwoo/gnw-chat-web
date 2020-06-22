export const checkAuthStatus = (setAuthed) => {
  fetch("http://localhost:8080/authStatus", {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  })
  .then(res =>  {
    if (res.ok) {
      console.log("auth check ok")
      setAuthed(true);
    } else {
      throw new Error("auth check no"); 
    }
  })
  .catch(error => {
    console.log(error)
  });
};
