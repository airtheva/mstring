/* Copyright (c) 2012 Richard Rodger */

var errmsg = "mstring: required format is function (){/*** ... ***/}, this is invalid: ";

module.exports = function(f){
  if( !_.isFunction(f) ) {
    throw new Error(errmsg+f);
  }

  var fs = f.toString();
  // Modified by airtheva@github, making it more flexible and work better in Windows.
  //var m  = fs.match(/^function\s*\(\)\s*\{\s*\/\*\*\*\n([\s\S]*)\n\*\*\*\/\s*\}$/);
  var m  = fs.match(/^function\s*\(\)\s*\{\s*\/\*\*\*\r?\n?([\s\S]*)\r?\n?\s*\*\*\*\/\s*\}$/);
  if( m && _.isString(m[1]) ) {
    return m[1];
  }
  else throw new Error(errmsg+fs);
}

var _ = {};
_.isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};
_.isString = function(obj) {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
};
