function sendCalendarAgenda() {
  /* Get the default calendar */
  var cal = CalendarApp.getDefaultCalendar();
  var allCalendars = CalendarApp.getAllCalendars();
  
  for (var xloop = 0; xloop<allCalendars.length; xloop++){
    console.log(allCalendars[xloop].getName());
    console.log('ID: ' + allCalendars[xloop].getId());
  }


  var sendEmail = false;
  var mailto = 'yourEmail@example.com'; //set the email which recieves this. SET EMAIL HERE
  var body = 'Google Calendar - Events' + '\n\n'; //setup the body of the email
  //var tz = Session.getScriptTimeZone(); //set the timezone used for formatting of times
  var tz = CalendarApp.getDefaultCalendar().getTimeZone(); //use the default calendar setting to get the timezone

  for (var loop = 0; loop<allCalendars.length; loop++){
    //loop through all calendars which I have access to and if they have events, get the event info and send it
    var events = null;
    var events = allCalendars[loop].getEventsForDay(new Date());
    //loop through current calendar and set events to equal its events for the day then include its stuff in the body
    if(events.length > 0){
      sendEmail = true;
      body += allCalendars[loop].getName().toString() + '\n';
      for (var i = 0; i < events.length; i++) {
        body += Utilities.formatDate(events[i].getStartTime(), tz, 'dd.MM HH:mm') + ' - ';
        body += Utilities.formatDate(events[i].getEndTime(), tz, 'dd:MM HH:mm') + ': ';
        body += events[i].getTitle() + '\n\n';
      }
    }


  }
  if(sendEmail == true){
    //send the email
    MailApp.sendEmail(mailto, 'Your calendar today', body);
  } 


}
