export const checkAuthStatus = (setAuthed) => {
  fetch("http://localhost:8080/auth/authentication-status", {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include'
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

export const contacts = [
  { username: "luoxiaolei", displayName: "Xiaolei Luo", rID: "rid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", rID: "rid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", rID: "rid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", rID: "rid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", rID: "rid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", rID: "rid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", rID: "rid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", rID: "rid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", rID: "rid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", rID: "rid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", rID: "rid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", rID: "rid_mantinglin_zhangjiayi" }
];
