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

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDest = $("#destination-input").val().trim();
  var trnFirst = moment($("#first-train-input").val().trim(),"HH:mm").subract(10,"years").format("X");
  var trnFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrn = {
    name: trnName,
    destination: trnDest,
    first: trnFirst,  
    frequency: trnFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrn);

  // Logs everything to console
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.first);
  console.log(newTrn.frequency);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().destination;
  var trnFirst = childSnapshot.val().first;
  var trnFreq = childSnapshot.val().frequency;

  // train Info
  console.log(trnName);
  console.log(trnDest);
  console.log(trnFirst);
  console.log(trnFreq);

  var remainder = moment().diff(moment.unix(trnFirst),"minutes")%frequency;
  var minutesAway = frequency - remainder;
  var nextArrival = moment().add(minutes,"m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  // Prettify the train start
  // var trnStartPretty = moment.unix(trnFirst).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var trnMonths = moment().diff(moment.unix(trnStart, "X"), "months");
  // console.log(trnMonths);

  // Calculate the total billed rate
  // var trnBilled = trnMonths * trnRate;
  // console.log(trnBilled);

  // Add each train's data into the table
  $("#trainSchedule-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" +
  trnFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any atttrnt we use meets this test case