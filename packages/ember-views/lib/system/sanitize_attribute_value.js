/* jshint scripturl:true */

import EmberHandlebars from "ember-handlebars-compiler";

var parsingNode;
var badProtocols = {
  'javascript:': true,
  'vbscript:': true
};

var badTags = {
  'A': true,
  'BODY': true,
  'LINK': true,
  'IMG': true
};

export var badAttributes = {
  'href': true,
  'src': true,
  'background': true
};

export default function sanitizeAttributeValue(element, attribute, value) {
  var tagName;

  if (!parsingNode) {
    parsingNode = document.createElement('a');
  }

  if (!element) {
    tagName = null;
  } else {
    tagName = element.tagName;
  }

  if (value instanceof EmberHandlebars.SafeString) {
    return value.toString();
  }

  if ((tagName === null || badTags[tagName]) && badAttributes[attribute]) {
    parsingNode.href = value;

    if (badProtocols[parsingNode.protocol] === true) {
      return 'unsafe:' + value;
    }
  }

  return value;
}
