// the youtube api function destroy() doesn't work so the only way i found to
// work is this
export const destroyIframeYT = () => {
  const oldYT = document.getElementById("player");
  if (oldYT) {
    const replaceDiv = document.createElement("div");
    replaceDiv.id = "player";

    const parent = document.getElementById("inPlayer");
    parent.replaceChild(replaceDiv, oldYT);
    
  } else {
    const oldChild = document.getElementById("inPlayer");

    const newChild = document.createElement("div");
    newChild.id = "inPlayer";
    newChild.innerHTML('<div id="player"></div>');

    const parent = document.getElementById("outPlayer");
    parent.replaceChild(newChild, oldChild);
  }
};

