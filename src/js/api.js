const url = "https://chat.hkound.pe.kr";
// export const url = "http://localhost:8088";

export const getUserInfo = async (nickName) =>
  await fetch(`${url}/user/search/${nickName}`).then((res) => res.json());

export const sendMsg = async (newMsg) => {
  return await fetch(`${url}/chat/send`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMsg),
  }).then((res) => res.json());
};
