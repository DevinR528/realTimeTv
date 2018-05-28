import queryString from "query-string";

// move func in here for video player
export const validateVidUrl = url => {
  const inputUrl = url;
  const urlObj = queryString.parseUrl(inputUrl);
  if (urlObj.url.includes(".youtube.com")) {
    const cutStr = urlObj.url.substr(0, 23);
    const embedStr = cutStr + "/embed/" + urlObj.query.v + "?enablejsapi=1";

    return {
      url: embedStr,
      id: urlObj.query.v,
      screenState: false
    };
  } else if (inputUrl.match(/\.(mp4|ogv|avi)$/)) {
    const embedStr = inputUrl;

    return {
      url: embedStr,
      id: urlObj.query.v,
      screenState: true
    };
  } else {
    throw new Error(
      `URL must be either from youtube or have .mp4/ogv/avi at the end, you tried "${inputUrl}".`
    );
  }
};
