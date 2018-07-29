// the youtube api function destroy() doesn't work so the only way i found to
// work is this
export const destroyIframeYT = () => {
  const oldYT = document.getElementById("player");
  if (oldYT) {
    console.log("[got iframe]");
    const replaceDiv = document.createElement("div");
    replaceDiv.id = "player";

    const parent = document.getElementById("inPlayer");
    parent.replaceChild(replaceDiv, oldYT);
  } else {
    console.log("[got inner]");
    const oldChild = document.getElementById("inPlayer");

    const newChild = document.createElement("div");
    newChild.id = "inPlayer";
    newChild.innerHTML('<div id="player"></div>');

    const parent = document.getElementById("outPlayer");
    parent.replaceChild(newChild, oldChild);
  }
};

export const checkSeekTimePause = (timeDiff, player, place) => {
  if (timeDiff < 10) {
    if (timeDiff > -10) {
      console.log("[noDiff]");
      player.pauseVideo();
      return;
    } else {
      console.log("[Diff]");
      player.seekTo(place, true);
      player.pauseVideo();
      return;
    }
  } else {
    console.log("[Diff]");
    player.seekTo(place, true);
    player.pauseVideo();
    return;
  }
};

export const checkSeekTimePlay = (timeDiff, player, place) => {
  if (timeDiff < 10) {
    if (timeDiff > -10) {
      console.log("[noDiff]");
      player.playVideo();
      return;
    } else {
      console.log("[Diff]");
      player.seekTo(place, true);
      player.playVideo();
      return;
    }
  } else {
    console.log("[Diff]");
    player.seekTo(place, true);
    player.playVideo();
    return;
  }
};
