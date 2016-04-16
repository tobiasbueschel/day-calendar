app.controller('MainCtrl', function($scope, $state, $window, $timeout){

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
            start: 150,
            end: 220
        },
        {
            start: 180,
            end: 220
        },
        {
            start: 180,
            end: 230
        },
        {
            start: 150,
            end: 220
        },
        {
            start: 180,
            end: 220
        },
        {
            start: 180,
            end: 230
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
            console.log(events[i]);
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
        $scope.$apply();
    };

    // call the renderDay function when the app starts
    renderDay(events);
    
    // expose the renderDay function to the browser window
    $window.renderDay = renderDay;

    // $timeout(function() {
    //
    // });

});