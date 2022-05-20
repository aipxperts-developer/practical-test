ReE = function (res, err, code, data) {
  // Error Web Response
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }

  if (typeof code !== "undefined") {
    res.statusCode = code;
  } else {
    res.statusCode = 500;
  }
  let send_data = { success: false, message: err, code: code || 500 };
  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }
  return res.json(send_data);
};

ReS = function (res, msg, data, code) {
  // Success Web Response
  let send_data = { success: true, message: msg, code: code || 200 };
  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }
  if (typeof code !== "undefined") {
    res.statusCode = code;
  } else {
    res.statusCode = 200;
  }
  return res.json(send_data);
};

randomStr = function (m, remove_unessery = false) {
  var m = m || 9;
  s = "";
  let r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  if (remove_unessery)
    r = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

  for (var i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
};

isJSON = async function (text) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg"
};

detectMimeType = async function (b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

randomNum = function (m) {
  var m = m || 4;
  s = "";
  let r = "1234567890";

  for (var i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
};

generateRandomKey = function (length) {
  let start = 2;
  let stop = parseInt(length) + start;
  return Math.random().toString(36).substring(start, stop);
}

checkisArray = function (a) {
  return (!!a) && (a.constructor === Array);
};

checkisObject = function (a) {
  return (!!a) && (a.constructor === Object);
};

deleteFileSync = function (filepath) {
  const fs = require('fs');
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    return true;
  }
  else {
    return false;
  }
}