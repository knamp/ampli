/**
 * A blacklist of attributes on elements
 */
export default [{
  selector: '*',
  attributes: [
    /^bg.*/,
    /^on.*/,
    /^margin.*/,
    'style',
  ],
}, {
  selector: 'meta',
  attributes: ['http-equiv'],
}]
