# AMPLI

HTML to AMP tranformer

## Usage

Install via NPM or yarn.

In your application your can call Ampli like this

```javascript
import Ampli, { IDocument } from 'ampli'

const options: IOptions[]? = {
  //...
}
const additionalDecorators: Function[]? = [(document: IDocument) => document]
const additionalTags: string[]? = []
const html: string = '' //...

const ampli: Ampli = new Ampli(options, additionalDecorators, addtionalTags)
const amp: string = await ampli.transform(html)

console.log(amp)
```

## Constrains

You must provide fully qualified URLs for images, stylesheets.

## License

This project is under MIT license.
