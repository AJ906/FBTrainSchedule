// Initialize Firebase
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

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destName = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train schedule data
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
  // alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Creates Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name; 
  var destName = childSnapshot.val().dest; 
  var firstTrain = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq; 

  // Train Info console log testing.
  console.log(trainName);
  console.log(destName);
  console.log(firstTrain);
  console.log(trainFreq);

// Find remainder of minutes between first train and current time (takes out hours)
  var remainderCalc = moment().diff(moment.unix(firstTrain), "minutes")%trainFreq;

// Subtract the remaining minutes from the train frequency to find minutes until next train.
  var minutesAwayCalc = trainFreq - remainderCalc;

// Add minutesAwayCalc to current time to find Next Arrival time.
  var nextArrivalCalc = moment().add(minutesAwayCalc,"m").format("HH:mm A");
  
  console.log (remainderCalc);
  console.log (minutesAwayCalc);
  console.log (nextArrivalCalc);


  // Add each train's data into the table
  $("#train-schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" +
  trainFreq + "</td><td>" + nextArrivalCalc + "</td><td>" + minutesAwayCalc + "</td></tr>");
});
