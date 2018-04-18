# Changelog

## v2.6.0 - unreleased
### New
* [Copies statics from the Wrapped component to the Injected component](https://github.com/yahoo/react-intl/pull/1073) by @Sparragus
* [update `FormattedMessage` to accept an element as `tagName` prop](https://github.com/yahoo/react-intl/pull/1118) by @iDuuck

### Fix
* [Replace string ref in injectIntl HOC with functional one](https://github.com/yahoo/react-intl/pull/1040) by @Panya
* Initial update of lifecycles to adhere to [upcoming React changes](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
* [Default locale error instead of warning in React Native app](https://github.com/yahoo/react-intl/pull/1121) by @naffiq
* Fix build issues

### Changes
* Updated dependencies

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
