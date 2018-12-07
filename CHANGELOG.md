# Changelog

## v3.0.0 - planned
### TODO
* Write tests for #997 (Message flattening)

### Breaking changes
* Drop support for React v0.14 & v15
* Drop support for Node.js v6

### Fix
* [Fix curly braces not escaped in production](https://github.com/yahoo/react-intl/pull/1214) by @tranvansang

### New
* [update `FormattedMessage` to accept an element as `tagName` prop](https://github.com/yahoo/react-intl/pull/1118) by @iDuuck
* [Support Short Relative Formats](https://github.com/yahoo/react-intl/pull/1145) by @papasmile
* [Message flattening](https://github.com/yahoo/react-intl/pull/997) by @Jascha-Sundare

### Updated
* Upgraded dependencies
* Upgraded to Babel 7
* Updated tests to the newest versions

## v2.7.2 - 24.10.2018
### Fix
* [Make react-intl react 16 compatible](https://github.com/yahoo/react-intl/pull/1201) by @ptomasroos

## v2.7.1 - 16.10.2018
### Fix
* [Fixes the ability to pass onError through IntlProvider](https://github.com/yahoo/react-intl/pull/1195)

## v2.7.0 - 2.10.2018
### Fix
* [Replace string ref in injectIntl HOC with functional one](https://github.com/yahoo/react-intl/pull/1040) by @Panya
* Initial update of lifecycles to adhere to [upcoming React changes](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
* [Default locale error instead of warning in React Native app](https://github.com/yahoo/react-intl/pull/1121) by @naffiq

### Changes
* Updated dependencies

## v2.7.0 - 2.10.2018
### Fix
* Produce a nice error if a ReactElement is passed to formatMessage() (#547)
* 613 custom error handling (#880)

## v2.6.0
### Fix
* Doesn't throw when FormattedMessage has defaultMessage #1171


## v2.5.2 - 19.04.2018
### Fixes
* Fix badly tagged release and track with upstream.

## v2.5.1 - 24.01.2018
### Fix
* Remove `"react-addons-test-utils": "^0.14.8"`

## v2.5.0 - 24.01.2018

### New
* [Add timeZone prop to IntlProvider](https://github.com/yahoo/react-intl/pull/893) by @jeremyyap
* [Add gracefull failback for missing provider](https://github.com/yahoo/react-intl/pull/1080) by @maciej-ka

### Fixes / Updates
* [Upgrade prop-types dependency](https://github.com/yahoo/react-intl/pull/1088) by @rattrayalex-stripe
* [Uplift to intl-relativeformat 2.1.0 and Fix Unit Test](https://github.com/yahoo/react-intl/pull/1090) by @papasmile  
* Updated dev dependencies by @storytellercz

### Changes
* No longer testing on Node v4 as it is no longer compatible with newest version of Jest.
