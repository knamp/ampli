# AMPLI
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fknamp%2Fampli.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fknamp%2Fampli?ref=badge_shield)


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
* Allow scripts with `type="application/ld+json"`
* Fix SVG requests

## License

This project is under MIT license.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fknamp%2Fampli.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fknamp%2Fampli?ref=badge_large)