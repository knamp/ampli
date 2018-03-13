# AMPLI

HTML to AMP tranformer

## Usage

Install via NPM or yarn.

In your application your can call Ampli like this

```javascript
import Ampli, { ContextInterface } from 'ampli'

const options: OptionsInterface[]? = {
  //...
}
const additionalDecorators: Function[]? = [(document: ContextInterface) => document]
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
