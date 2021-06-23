[![NPM Version](https://img.shields.io/npm/v/telegraf-i18n.svg?style=flat-square)](https://www.npmjs.com/package/telegraf-i18n)

# i18n for Telegraf

Internationalization middleware for [Telegraf](https://github.com/telegraf/telegraf).

## Installation

```js
$ npm install telegraf-i18n
```

## Nesting Keys

Support for nested keys. To use, set **allowNesting** option and insert $t(**key**) into the localization file. Keys are searched only in the current file. Example:


```
{
    greeting: 'Hello $t(nested.key)!', // Hello World!!!!
    nested: {
      key: 'World$t(nested.anotherKey)', // World!!!
      anotherKey: '!!!'
    }
    cycle: {
      first: '$t{cycle.second}', // $t{cycle.second}
      second: '$t{cycle.first}' // $t{cycle.first}
    }
}
```

## Example

```js
const {Telegraf} = require('telegraf')
const {I18n} = require('telegraf-i18n')

/*
yaml and json are ok
Example directory structure:
├── locales
│   ├── en.yaml
│   ├── en-US.yaml
│   ├── it.json
│   └── ru.yaml
└── bot.js
*/

const i18n = new I18n({
  defaultLanguage: 'en',
  allowMissing: false, // Default true
  allowNesting: true, // Default false
  directory: path.resolve(__dirname, 'locales')
})

// Also you can provide i18n data directly
i18n.loadLocale('en', {greeting: 'Hello!'})

const app = new Telegraf(process.env.BOT_TOKEN)

// telegraf-i18n can save current locale setting into session.
const i18n = new I18n({
  useSession: true,
  defaultLanguageOnMissing: true, // implies allowMissing = true
  directory: path.resolve(__dirname, 'locales')
})

app.use(Telegraf.memorySession())
app.use(i18n.middleware())

app.hears('/start', (ctx) => {
  const message = ctx.i18n.t('greeting', {
    username: ctx.from.username
  })
  return ctx.reply(message)
})

app.startPolling()
```

See full [example](/examples).

## User context

Telegraf user context props and functions:

```js
app.use((ctx) => {
  ctx.i18n.locale()                    // Get current locale
  ctx.i18n.locale(code)                // Set current locale
  ctx.i18n.t(resourceKey, [data])      // Get resource value (data will be used by template engine)
});
```

## Helpers

```js
const { match, reply } = require('telegraf-i18n')

// In case you use custom keyboard with localized labels.
bot.hears(match('keyboard.foo'), (ctx) => ...)

//Reply helper
bot.command('help', reply('help'))
```
