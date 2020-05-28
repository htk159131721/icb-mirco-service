import $ from "jquery"
export const callToGetIP = () => {
  $.getJSON("https://api.ipify.org?format=json", function(data) {
    $("#ip").html(data.ip);
  }).fail(err => {
    console.log(err);
  });
};
export const getIP = () => {
  let ip =
    document.getElementById("ip").textContent !== ""
      ? document.getElementById("ip").textContent
      : "192.168.0.1";
  return ip;
};
export const getOS = () => {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
};