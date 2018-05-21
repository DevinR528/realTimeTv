import { loadSdk } from "../../../../../store/utility";

export const createYT = videoId => {
  return new Promise(resolve => {
    loadSdk().then(YT => {
      const playerObj = new YT.Player("player", {
        height: "200",
        width: "369",
        videoId: `${videoId}`
      });
      resolve(playerObj);
    });
  });
};
