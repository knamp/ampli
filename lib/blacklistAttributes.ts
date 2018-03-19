/**
 * A blacklist of attributes on elements
 */
export default [{
  attributes: [
    /^bg.*/,
    /^on.*/,
    /^margin.*/,
    "style",
  ],
  selector: "*",
}, {
  attributes: ["http-equiv"],
  selector: "meta",
}, {
  attributes: ["target"],
  selector: "a",
}, {
  attributes: ["type"],
  selector: "amp-img",
}];
