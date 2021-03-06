# Changelog

## v2.7.1
### Fix
* Fixes the ability to pass onError through IntlProvider (#1195)

## v2.7.0
### Fix
* Produce a nice error if a ReactElement is passed to formatMessage() (#547)
* 613 custom error handling (#880)

## v2.6.0
### Fix
* Doesn't throw when FormattedMessage has defaultMessage #1171

## v2.5.2
### Fixes
* Fix badly tagged release and track with upstream.

## v2.5.1
### Fix
* Remove `"react-addons-test-utils": "^0.14.8"`

## v2.5.0

### New
* [Add timeZone prop to IntlProvider](https://github.com/yahoo/react-intl/pull/893) by @jeremyyap
* [Add gracefull failback for missing provider](https://github.com/yahoo/react-intl/pull/1080) by @maciej-ka

### Fixes / Updates
* [Upgrade prop-types dependency](https://github.com/yahoo/react-intl/pull/1088) by @rattrayalex-stripe
* [Uplift to intl-relativeformat 2.1.0 and Fix Unit Test](https://github.com/yahoo/react-intl/pull/1090) by @papasmile  
* Updated dev dependencies by @storytellercz

### Changes
* No longer testing on Node v4 as it is no longer compatible with newest version of Jest.
