# FBTrainSchedule

#What it is; what it does:

Train schedule application that incorporates Firebase to host arrival and departure data, providing up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

#Why the project is useful
This app will allow users to create a schedule for their own traveling purposes.  If they know a little html/javascript, they can customize the schedule for their own purposes.

#How users can get started with the project
This project uses HTML, CSS, Javascript, and various sub-languages such as bootstrap, jquery. Be sure to include the links or libraries in your HTML <head></head>.

You can (re)create this project by doing the following:

#Outline
Sign up for a free Firebase account (or another database service, if you'd like). View the tutorial(s) if you haven't used Firebase before.

Use HTML to create divs to hold the different page tables:

Page Title
Empty information
Train Schedule
Add Train

Use CSS to stylize the page.  I have used Bootstrap (3.3).

Use Javascript/jQuery to give user the ability to manipulate the DOM and add new trains to the schedule.

Use Moment.js to retrieve, manipulate, and calculate the time information.

Use Firebase to collect the entries, so all users may view the same schedule.

#Parameters considered
This project was constructed with the following parameters in consideration:

* When adding trains, administrators should be able to submit the following:
    
    * Train Name
    
    * Destination 
    
    * First Train Time -- in military time
    
    * Frequency -- in minutes
  
  * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  
  * Users from many different machines must be able to view same train times.
  
  * Styling and theme are completely up to you. Get Creative!


#Where users can get help with your project

Get help with this project by using Google-Fu. :-)


#Who maintains and contributes to the project

This project was constructed and is maintained solely by AJ906.

### Looking for a Challenge? ###

* Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

* Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

* As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.

**Good Luck!**
