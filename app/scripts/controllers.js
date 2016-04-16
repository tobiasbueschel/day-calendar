app.controller('MainCtrl', function($scope, $state, $window){

    $scope.currentDate = Date.now();
    $scope.times = [
        "9am",
        "10am",
        "11am",
        "noon",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm"
    ];

    // array of JavaScript Objects that contains the start and end. The numbers are minutes since 9am. (so 30 is 9:30am, 120 is 11am)
    var events = [
        {
            start: 20,
            end: 60
        },
        {
            start: 150,
            end: 220
        },
        {
            start: 140,
            end: 220
        },
        {
            start: 180,
            end: 230
        },
        {
            start: 330,
            end: 460
        },
        {
            start: 300,
            end: 400
        },
        {
            start: 480,
            end: 500
        }
    ];

    var renderDay = function(events){

        // prepare the array of JavaScript Objects
        for (var k = 0; k < events.length; k++) {

            // initialize the horizontal level for all events
            events[k].level = 1;

            // create new date object for the starting time
            var s = new Date();
            s.setHours(9);
            s.setMinutes(0);
            s.setSeconds(0);
            s.setMinutes(events[k].start);

            // create new date object for the ending time
            var e = new Date();
            e.setHours(9);
            e.setMinutes(0);
            e.setSeconds(0);
            e.setMinutes(events[k].end);

            // assign both date objects to each event
            events[k].startDate = s;
            events[k].endDate = e;
        }


        for (var i = 0; i < events.length; i++){
            totalCollissions = 0;
            rightCollissions = 0;
            events[i].width = 0;

            for (var j = 0; j < events.length; j++){

                // check if event collides with any other event using the following formula (StartTimeA <= EndTimeB)  and  (EndTimeA >= StartTimeB)
                if ( events[i].start <= events[j].end && events[i].end >= events[j].start ){

                    // increments width which signifies that event collides with another
                    events[i].width++;

                    totalCollissions++;
                    if ( j >= i){
                        rightCollissions++;
                    }
                }   
            }
            events[i].level = rightCollissions / totalCollissions * 100;
        }
        $scope.events = events;
        $scope.safeApply();

    };

    // Helper function that checks the current phase before executing your function.
    // source: https://coderwall.com/p/ngisma/safe-apply-in-angular-js
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    
    // call the renderDay function when the app starts
    renderDay(events);
    
    // expose the renderDay function to the browser window
    $window.renderDay = renderDay;

});