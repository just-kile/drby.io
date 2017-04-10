# drby.io

Hi. drby.io will help you to get an up-to-date roller derby ranking.
 
*Note: Work in progress =)*

## Grabbers

drby.io won't have any data on it's own but *just* collect existing data and calculate something awesome out of it. The data is aggregated from wftda.com (official rankings) and flattrackstats.com (game results).

You find the grabbers in 'grabbers' directory.

### Setup

* Install Python 3 & pip.
* `pip install pymongo`
* Install a mongo DB (locally).

### Run the grabbers

* `python fts_grabber.py` to import game results from flattrackstats.com to your mongo db.
* `python wftda_grabber.py` to import official rankings to your mongo db.

## Backend (drby.io)

Backend will run with nodejs.

### Setup

* `npm install`

### Run Tests

* `npm test`

## Frontend (DrbyNgFrontend)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

```
ng new drby-ng-frontend --prefix drby --routing --style scss --verbose
```

### Development server

1. Run `npm install`.
2. Run `npm start` for a development server.
3. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
