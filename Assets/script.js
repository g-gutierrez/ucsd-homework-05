let workDay = {
    "9AM": "",
    "10AM": "",
    "11AM": "",
    "12PM": "",
    "1PM": "",
    "2PM": "",
    "3PM": "",
    "4PM": "",
    "5PM": ""
  };
  
  $(document).ready(function(){
    if(!localStorage.getItem('workDay')) {
      updateCalendarTasks(workDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
    }
  })
  
  $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  
  let counter = 1;
  for(const property in workDay) {
    let textEntry = "#text-entry" + counter;
    $(textEntry).text(workDay[property]);
    let timeId = "#time" + counter;
    let presentHour = moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = hourNumberFromHourString(timeString);  
    if(timeNumber < presentHour) {
      $(textEntry).addClass("past");
    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future");
    } else {
      $(textEntry).addClass("present");
    }
    counter ++;
  }
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();    
    saveSchedule(hourString, value);
  });
  
  function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "9AM": return 9;
      case "10AM": return 10;
      case "11AM": return 11;
      case "12PM": return 12;
      case "1PM": return 13;
      case "2PM": return 14;
      case "3PM": return 15;
      case "4PM": return 16;
      case "5PM": return 17;
    }
  }
  
  function loadCorrectDataset() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourString] = val
    saveToLocalStorage(workHours);
  }
  
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }
  