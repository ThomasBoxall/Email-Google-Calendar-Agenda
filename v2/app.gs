function sendCalendarAgenda() {
  /* Get the default calendar */
  var cal = CalendarApp.getDefaultCalendar();
  var allCalendars = CalendarApp.getAllCalendars();
  
  for (var xloop = 0; xloop<allCalendars.length; xloop++){
    console.log(allCalendars[xloop].getColor().toString());
    console.log('ID: ' + allCalendars[xloop].getId());
  }


  var sendEmail = false;
  var tz = CalendarApp.getDefaultCalendar().getTimeZone(); //use the default calendar setting to get the timezone (needs to be above subject setting line)
  // Setup the basics of the email
  var mailto = 'yourEmail@example.com'; //set the email which recieves this. SET EMAIL HERE
  var subject = "Your day - " + Utilities.formatDate(new Date(), tz, "dd/MM/yyyy");
  var body = "<h1>Google Calendar - Events</h1>"; //setup the body of the email
  

  for (var loop = 0; loop<allCalendars.length; loop++){
    //loop through all calendars which I have access to and if they have events, get the event info and send it
    var events = null;
    var events = allCalendars[loop].getEventsForDay(new Date());
    //loop through current calendar and set events to equal its events for the day then include its stuff in the body
    if(events.length > 0){
      sendEmail = true;
      var colour = 'style="background-color:' + allCalendars[loop].getColor().toString() + ';"';
      var eventName = allCalendars[loop].getName().toString().replace(/<[^>]+>/g, "");
      body += "<h2 " + colour + ">" + eventName + "</h2>";
      //body += "<i>" + allCalendars[loop].getId().toString() + "</i>";
      body += "<p>";
      for (var i = 0; i < events.length; i++) {
        body += Utilities.formatDate(events[i].getStartTime(), tz, 'dd/MM HH:mm') + ' - ';
        body += Utilities.formatDate(events[i].getEndTime(), tz, 'dd/MM HH:mm') + ': ';
        body += events[i].getTitle() + '<br>';
      }
      body += "</p>";
    }


  }
  if(sendEmail == true){
    //send the email
    MailApp.sendEmail({
      to: mailto,
      subject: subject,
      htmlBody: body
    });
  } 


}
