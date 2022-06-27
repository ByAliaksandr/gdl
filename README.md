# Assessment: GDL javascript software engineer

The assessment description can be found in the README.pdf file

# About the project

Various events are fired on the page. Events data comes to the datalayer. The datalayer represents the current state of the application. Several changes in datalayer are tracked by analytics.

In short can be seen as
`events -> store(datalayer) -> analytics`

Events are published by `createEventPublisher` function (see `src/events/event-publisher.ts`);
`createEventPublisher` dispatches an action which updates the datalayer via reducers functions. There are two Redux Toolkit's slices: `appInfoSlice` (see `src/data-layer/page-info-slice.ts`) and `appInfoSlice` (see `src/data-layer/app-info-slice.ts`). These slices update datalayer object with page and app data. `AnalyticsTracker` (see `src/analytics/analytics-tracker.ts`) detects changes in datalayer and sends data to analytics platform.

The `AnalyticsDebbuger` class is used for debugging purposes. Debugging mechanism is activated by executing `window.gdl.debbug()` in the browser console.

# Requirements results overview

Below is the results overview of the 4 individual requirements of the assignment.

1. Implement logic which updates the data layer according to the specifications. (&check;)
2. Implement the "Analytics" tracker functionality according to the specifications. (&check;)
3. Create a useful debugging mechanism which provides details of the events being published, and how they are handled by GDL. (&check;)
4. Write some unit tests for the code you have created. (&#126;) (See `src/data-layer/page-info-slice.spec.ts`)

_Note_ jest configuration is not set by default. Extra time is needed to investigate the jest/webpack configuration.

_Note_ The project should aim 100% unit tests coverage.

# Development settings

The project employs [prettier](https://prettier.io/docs/en/install.html) with a pre-commit hook. This makes sure all your commits are formatted.

# Questions and answers

- Why `_analyticsActionName` and `_analyticsActionId` properties are added?

Analytics tracks the datalayer changes. Not all events perform a change in the datalayer. `_analyticsActionName` and `_analyticsActionId` properties keep the following separation `events -> store(datalayer) -> analytics` compate to `events -> analytics`. `_analyticsActionId` guarantees that all events are published even if the same event is published multiple times.
