# AMPLI

HTML to AMP tranformer

## Usage

Install via NPM or yarn.

In your application your can call Ampli like this

```javascript
import Ampli, { IDocument } from 'ampli'

const additionalDecorators: Function[]? = [(document: IDocument) => document]
const html: string = '' //...

const ampli: Ampli = new Ampli(additionalDecorators)
const amp: string = await ampli.transform(html)

console.log(amp)
```

## License

This project is under MIT license.
