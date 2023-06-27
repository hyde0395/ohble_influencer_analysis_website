// import { useEffect } from "react";
// import dotenv from "dotenv";
// dotenv.config();

// export default function kakaoButton() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     try {
//       if (window.Kakao) {
//         const kakao = window.Kakao;
//         if (!kakao.isInitialized()) {
//           window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
//         }
//       }
//       window.Kakao.Channel.createChatButton({
//         container: "#kakao-talk-channel-chat-button",
//         channelPublicId: "_xkAERxj",
//         title: "consult",
//         size: "small",
//         color: "yellow",
//         supportMultipleDensities: true,
//       });
//       document.body.appendChild(script);
//       document.body.removeChild(script);
//     } catch (err) {}
//   }, []);
// }
