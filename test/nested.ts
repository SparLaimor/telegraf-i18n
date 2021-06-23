import test from 'ava'

import {I18n} from '../source/i18n'

test('can translate with nested keys', t => {
  const i18n = new I18n({allowNesting: true})
  i18n.loadLocale('en', {
    greeting: 'Hello $t(nested.key)!',
    nested: {
      key: 'World'
    }
  })
  t.is(i18n.t('en', 'greeting'), 'Hello World!')
})

test('will not paste when nested are closed', t => {
  const i18n = new I18n({allowNesting: true})
  i18n.loadLocale('en', {
    greeting: 'Hello $t(nested.key)!',
    nested: {
      key: 'World $t(greeting)'
    }
  })
  t.is(i18n.t('en', 'greeting'), 'Hello $t(nested.key)!')
})

test('can translate with chain of nested keys', t => {
  const i18n = new I18n({allowNesting: true})
  i18n.loadLocale('en', {
    greeting: 'Hello $t(nested.key)!',
    nested: {
      key: 'World $t(nested.anotherKey)',
      anotherKey: '!!!'
    }
  })
  t.is(i18n.t('en', 'greeting'), 'Hello World !!!!')
})
