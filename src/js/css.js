const imgUrl = "https://api.hkound.pe.kr/images/favicon.ico";

export const chatBtnCss = {
  position: "fixed",
  width: "50px",
  height: "50px",
  bottom: "1rem",
  right: "1rem",
  cursor: "pointer",
  background: `url(${imgUrl}) center no-repeat`,
  "border-radius": "50%",
  "z-index": 100000,
  // backgroundPosition: "left",
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "cover !important",
  // border: "1px solid red",
};

export const iframeCss = {
  position: "fixed",
  maxWidth: "400px",
  height: "700px",
  bottom: "1rem",
  right: "1rem",
  borderRadius: "2rem",
  outline: "none",
  border: "1px solid #dedede",
  opacity: 0,
  visibility: "hidden",
  transition: "all .5s .2s ease",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, .3)",
};

export const chatContainerCss = {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  // width: "390px",
  // height: "700px",
  background: "#eee",
  outline: "none",
  border: "1px solid #dedede",
  opacity: 0,
  visibility: "hidden",
  transition: "all .5s .2s ease",
  overflow: "hidden",
  "border-radius": "2rem",
  "box-shadow": "2px 2px 10px rgba(0, 0, 0, .3)",
  "z-index": 1000,
  display: "flex",
  "flex-direction": "column"
};

export const fadeInContainerCss = {
  opacity: 1,
  visibility: "visible",
  bottom: "4.5rem"
};

export const fadeOutContainerCss = {
  opacity: 0,
  visibility: "hidden",
  bottom: "1rem",
};

export const chatMenuCss = {
  display: "flex",
  margin: 0,
  padding: 0,
  "background-color": "#F8E2D6",
  "z-index": 100
};

export const chatMenuItemCss = {
  height: "60px",
  flex: 1,
  cursor: "pointer",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "font-weight": "bold",
  "font-size": "1rem"
  // border: "1px solid red",
};

export const chatBodyCss = {
  padding: "1rem",
  "box-sizing": "border-box",
};

export const chatMainCss = {
  // flex: 1,
  // original
  // padding: ".5rem",
  "box-sizing": "border-box",
  opacity: 0,
  visibility: "hidden",
  height: 0,
  transition: "all .2s ease",
  border: "1px solid red",
  // original
  // display: "none",
  // padding: ".5rem",
  // "box-sizing": "border-box",
  // height: 0,
  // transition: "all .1s .5s ease",
  // border: "1px solid red",
  overflow: "hidden"
};

export const chatRoomCss = {
  // flex: 1,
  // padding: "1rem",
  // position: "absolute",
  // width: 0,
  // height: 0,
  // bottom: 0,
  // padding: ".5rem",
  "box-sizing": "border-box",
  border: "1px solid red",
  opacity: 0,
  visibility: "hidden",
  height: 0,
  transition: "all .2s .1s ease",
  overflow: "hidden"
};