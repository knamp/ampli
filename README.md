# AMPLI

HTML to AMP tranformer

## Usage

Install via NPM or yarn.

In your application your can call Ampli like this

```javascript
import * as log from "log"
import Ampli, { ContextInterface, OptionsInterface } from "ampli"

const options: OptionsInterface | null = {
  //...
}
const additionalDecorators: Function[] | null = [(document: ContextInterface, options: OptionsInterface) => document]
const html: string = "" //...

const ampli: Ampli = new Ampli(options, additionalDecorators)
const amp: string = await ampli.transform(html)

log.info(amp)
```

## Options

* `logger?: LoggerInterface`, use this object as logger instance, default [log](https://www.npmjs.com/package/log)
* `useStaticCss?: boolean`, remove CSS that is not used, default: `false`
* `additionalTags?: string[]`, custom HTML-tags that should be left in code

## Constrains

You must provide fully qualified URLs for images, stylesheets.

## TODO

* Make it possible to prefix relative URLs automatically with specific URL
* Add mechanism to include canonical tag
* Load images in parallel

## License

This project is under MIT license.
