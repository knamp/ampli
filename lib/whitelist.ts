/**
 * A whitelist of all supported HTML-tags elements
 *
 * From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 */
export default [

  // Main root
  "html",
  "head",
  "body",

  // Document metadata
  "link",
  "meta",
  "style",
  "title",

  // Content sectioning
  "address",
  "article",
  "aside",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  "nav",
  "section",

  // Text content
  "blockquote",
  "dd",
  "dir",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "hr",
  "li",
  "main",
  "ol",
  "p",
  "pre",
  "ul",

  // Inline text semantics
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "nobr",
  "q",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "tt",
  "u",
  "var",
  "wbr",
  // Image and multimedia
  // disabled: 'area',
  // disabled: 'audio',
  // disabled: 'img'
  "map",
  // disabled: 'track',
  // disabled: 'video',
  // Embedded content
  // disabled: 'applet',
  // disabled: 'embed',
  // disabled: 'iframe',
  // disabled: 'noembed',
  // disabled: 'object',
  // disabled: 'param',
  // disabled: 'picture',
  // disabled: 'source',
  // Scripting
  // disabled: 'canvas',
  "noscript",
  "script",

  // Demarcating edits
  "del",
  "ins",

  // Table content
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",

  // Forms
  "button",
  "datalist",
  "fieldset",
  // disabled: 'form',
  "input",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "textarea",

  // Interactive elements
  "details",
  "dialog",
  // disabled: 'menu',
  // disabled: 'menuitem',
  "summary",

  // Web Components
  // disabled: 'content',
  // disabled: 'element',
  // disabled: 'shadow',
  // disabled: 'slot',
  // disabled: 'template',

  // Obsolete and deprecated elements
  "acronym",
  // disabled: 'applet',
  // disabled: 'basefont',
  // disabled: 'bgsound',
  "big",
  // disabled: 'blink',
  "center",
  // disabled: 'command',
  // disabled: 'content',
  "dir",
  // disabled: 'element',
  "font",
  // disabled: 'frame',
  // disabled: 'frameset',
  // disabled: 'image',
  // disabled: 'isindex',
  // disabled: 'keygen',
  // disabled: 'listing',
  "marquee",
  // disabled: 'menu',
  // disabled: 'menuitem',
  // disabled: 'multicol',
  // disabled: 'nextid',
  "nobr",
  // disabled: 'noembed',
  // disabled: 'noframes',
  "plaintext",
  // disabled: 'shadow',
  // disabled: 'spacer',
  // disabled: 'strike',
  "tt",
  // disabled: 'xmp'

  // Amp specific tags:
  "amp-img", // Replaces img
];
