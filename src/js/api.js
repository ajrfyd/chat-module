// const url = "https://chat.hkound.pe.kr";
const url = "http://localhost:8088";

export const getUserInfo = async (nickName) => await fetch(`${url}/user/search/${nickName}`).then(res => res.json());