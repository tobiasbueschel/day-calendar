# Day Calendar
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)

Try out the [demo :computer:](https://calendartm.firebaseapp.com/)

This app renders a series of events on a single day calendar. It takes an array of JavaScript Objects that contains the start and end time of the event:

```javascript
[
    {start: 30, end: 120},
    {start: 300, end: 330},
    {start: 290, end: 330}
]
```

The numbers are minutes since 9am (so 30 is 9:30 am, 120 is 11am etc.). Only the working day from 9am to 6pm is shown.

### User Interface :calendar:

![screenshot](https://github.com/tobiasbueschel/day-calendar/blob/master/ui.png)

### Instructions

You can interact with the calendar and pass an array of JavaScript objects on the console using the renderDay() function

```javascript
renderDay([
    { 
        start: 200,
        end:   270
     }
 ]);
```

### Installation Instructions
*If you are new to GitHub, you can find a quick tutorial [here](http://readwrite.com/2013/09/30/understanding-github-a-journey-for-beginners-part-1).*

###### (1) Download repository & open it

```shell
git clone https://github.com/tobiasbueschel/day-calendar.git
cd day-calendar
```

###### (2) Install node modules

```shell
sudo npm install
```

###### (3) Install bower components

```shell
bower install
```

###### (4) Running the application and making changes
The project uses the JavaScript Task Runner [Grunt](http://gruntjs.com/). The following commands will be usefull:

+ `grunt dev` runs the development version of the app
+ `grunt prod` runs the production version of the app
+ `grunt inject` _injects bower components into index.html_

### Contributing
Feel free to send a pull request. If you find any bugs please report it on the [issue page](https://github.com/tobiasbueschel/day-calendar/issues).

### References & Technology used 
+ [AngularJS](https://angularjs.org/)
+ [Bower](http://bower.io/)
+ [Grunt](http://gruntjs.com/)

### License
See the [MIT license](/LICENSE).
