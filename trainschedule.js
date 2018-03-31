/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBcW0TMP-l76LSXoseTWTC0zzWVN41qu3A",
  authDomain: "hw7-trainschedule-aj906.firebaseapp.com",
  databaseURL: "https://hw7-trainschedule-aj906.firebaseio.com",
  projectId: "hw7-trainschedule-aj906",
  storageBucket: "hw7-trainschedule-aj906.appspot.com",
  messagingSenderId: "1018254839108"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destName = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: destName,
    first: firstTrain,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name; //formerly empName
  var destName = childSnapshot.val().dest;  //formerly empRole
  var firstTrain = childSnapshot.val().first; //formerly emp Start
  var trainFreq = childSnapshot.val().freq; //formerly emp Rate

  // Employee Info
  console.log(trainName);
  console.log(destName);
  console.log(firstTrain);
  console.log(trainFreq);


  var remainderCalc = moment().diff(moment.unix(firstTrain), "minutes")%trainFreq;
  var minutesAwayCalc = trainFreq - remainderCalc;
  var nextArrivalCalc = moment().add(minutesAwayCalc,"m").format("HH:mm A");
  
  console.log (remainderCalc);
  console.log (minutesAwayCalc);
  console.log (nextArrivalCalc);
  // // Prettify the employee start
  // var firstTrainPretty = moment.unix(firstTrain).format("MM/DD/YY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(firstTrain, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * trainFreq;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#train-schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" +
  trainFreq + "</td><td>" + nextArrivalCalc + "</td><td>" + minutesAwayCalc + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
