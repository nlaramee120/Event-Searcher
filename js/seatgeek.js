$(document).ready(function()  {

let listItem1 = document.querySelector(".listItem1");
let listItem2 = document.querySelector(".listItem2");
let listItem3 = document.querySelector(".listItem3");
let listItem4 = document.querySelector(".listItem4");
let listItem5 = document.querySelector(".listItem5");
let listItem1Used = false
let listItem2Used = false
let listItem3Used = false
let listItem4Used = false
let listItem5Used = false

var userInput = $(".userInput").val();
var userBtn = document.querySelector(".userBtn");
var userGeo = document.querySelector(".locationBtn");
var url = 'https://api.seatgeek.com/2/events?geoip=true&range=40mi&client_id=MjMyNTQ3OTl8MTYzMTEyNjQ3Mi40MjI1NzMz';
var urlGeo = 'https://api.openweathermap.org/data/2.5/forecast?q=chicago&appid=3a150e01056da8ad0b1ee8083da97feb&units=imperial';
var weatherKey = "3a150e01056da8ad0b1ee8083da97feb";
var saveBtn = document.querySelector(".saveBtn");
var modal = document.getElementById("myModal");
var eventModal = document.getElementById("eventModal");
var closeModal = document.querySelector(".close"); 
var searchShowMore = document.querySelector(".searchShowMore");
var showBtn = document.querySelector(".showBtn");
var searchShowEvenMore = document.querySelector(".searchShowEvenMore");
var hiddenPrev = document.querySelector(".hiddenPrev");
var pageNumber = 0
var modalBtn = document.querySelector(".modalBtn");
var closeEventModal = document.querySelector(".closeEventModal");
var localShowMore = document.querySelector(".localShowMore");
var localShowEvenMore = document.querySelector(".localShowEvenMore");


userBtn.addEventListener("click", (e) => {
  userInput = ($(".userInput").val())
  var clearList = $(".card");
  clearList.remove();
  e.preventDefault();
  console.log(userInput);
  var urlSearchBar = "https://api.seatgeek.com/2/events?venue.city=" + userInput + "&per_page=5&page=1&client_id=MjMyNTQ3OTl8MTYzMTEyNjQ3Mi40MjI1NzMz";
  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + weatherKey + "&units=imperial";


fetch(urlSearchBar, {
  method: "GET",
})
  .then(function(data) {
    return data.json()
  })
  .then(function (data) {
    console.log(data)

    if (data.meta.total < 1) {
      modal.style.display = "block";
    }

    closeModal.onclick = function() {
      modal.style.display = "none";
    }

    showBtn.style.display = "block";
    

    var newCard = $("<div>").attr("class", "card");

    $(".fiveDayBorder").show();
    $(".eventsTitle").show();
    $(".eventsTitle").text("Events Near " + userInput);
    $(".nearEvents").append(newCard);

    for (i = 0; i < 5; i++) {

      var newCardBody = $("<div>").attr("class", "card-body");
      $(".card").append(newCardBody);
      console.log("it works");

      let img = data.events[i].performers[0].image;
      newCardBody.append(
        "<img class='img-fluid mb-2' src=" +
          "'" +
          img +
          "'" +
          "alt=" +
          "test" +
          "></img>"
      );
      let title = data.events[i].short_title;
        newCardBody.append("<h3 class='card-title'>" + title + "<h3>");

        let date = data.events[i].datetime_local;

        newCardBody.append("<p class='card-text'>" + "Date: " + date + "<p>");

        let location = data.events[i].venue.name;
        newCardBody.append("<p class='card-text'>" + "Location: " + location + "<p>");

        let getTicks = data.events[i].url;
        newCardBody.append(
          "<a class='btn btn-primary btn-dlock mt-4 getTicks' target='_blank' href=" +
            getTicks +
            ">Get Tickets!" +
            "</a>"
        );

        newCardBody.append("<button type='button' id=button" + i + " class='btn btn-primary btn-dlock mt-4 saveBtn'><i class='far fa-heart'></i></button>"
        );

          let buttonId = "#button" + i;
          let test = location;

        $(document).on("click", buttonId, function() {
          console.log(test)

          let newDate = new Date(date);
          let dateString = newDate.toString("MMMM yyyy");

          if (listItem1Used === false) {
            listItem1.innerHTML = title + " // " + date + " // " + getTicks;
            listItem1Used = true;
         } else if (listItem2Used === false) {
            listItem2.innerHTML = title + " // " + date + " // " + getTicks;
            listItem2Used = true;
         } else if (listItem3Used === false) {
            listItem3.innerHTML = title + " // " + date + " // " + getTicks;
            listItem3Used = true;
         } else if (listItem4Used === false) {
            listItem4.innerHTML = title + " // " + date + " // " + getTicks;
            listItem4Used = true;
         } else if (listItem5Used === false) {
            listItem5.innerHTML = title + " // " + date + " // " + getTicks;
            listItem5Used = true;
         } else {
           return;
         }
         

          
          storeEntry();
        })

    }
   
      var errorNum = 8
      if (data.events[0].venue.state === data.events[1].venue.state) {
      console.log(errorNum);
      }
      else {
        modal.style.display = "block";
      }

      modalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        eventModal.style.display = "block"

        closeEventModal.onclick = function() {
          eventModal.style.display = "none";
        }
      })
      

  })

  fetch(urlFiveDay,  {
      method: "GET",
    })
    .then(function (response) {
      return response.json()
    })

    
    .then(function (response) {
       $(".appendedAll").remove();
       $(".float-child2").show();

            for (i = 0; i < 5; i++) {
              var newItem = $("<div>").attr("class", "col-sm-12 bg-primary text-white rounded appendedAll");
              $(".fiveDay").append(newItem);
      
              var date = new Date(response.list[i * 8].dt * 1000);
              newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");
      
              var iconCode = response.list[i * 8].weather[0].icon;
              var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
              newItem.append($("<img>").attr("src", iconURL));
      
              var temp = response.list[i * 8].main.temp;
              newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");
    }
  })
})

searchShowMore.addEventListener("click", (e) => {
  userInput = ($(".userInput").val())
  var clearList = $(".card");
  pageNumber ++;
  // clearList.remove();
  e.preventDefault();
  console.log(userInput);
  var urlSearchBar = "https://api.seatgeek.com/2/events?venue.city=" + userInput + "&per_page=26&page=1&client_id=MjMyNTQ3OTl8MTYzMTEyNjQ3Mi40MjI1NzMz";
  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + weatherKey + "&units=imperial";


fetch(urlSearchBar, {
  method: "GET",
})
  .then(function(data) {
    return data.json()
  })
  .then(function (data) {
    console.log(data)


    if (data.meta.total < 1) {
      modal.style.display = "block";
    }

    closeModal.onclick = function() {
      modal.style.display = "none";
    }

    showBtn.style.display = "none";
    hiddenPrev.style.display = "block";

    var newCard = $("<div>").attr("class", "card");

    $(".fiveDayBorder").show();
    $(".eventsTitle").show();
    $(".eventsTitle").text("Events Near " + userInput);

    for (i = 5; i < 25; i++) {

      var newCardBody = $("<div>").attr("class", "card-body");
      $(".card").append(newCardBody);
      console.log("it works");

      var img = data.events[i].performers[0].image;
      newCardBody.append(
        "<img class='img-fluid mb-2' src=" +
          "'" +
          img +
          "'" +
          "alt=" +
          "test" +
          "></img>"
      );
      var title = data.events[i].short_title;
        newCardBody.append("<h3 class='card-title'>" + title + "<h3>");

        var date = data.events[i].datetime_local;

        newCardBody.append("<p class='card-text'>" + "Date: " + date + "<p>");

        var location = data.events[i].venue.name;
        newCardBody.append("<p class='card-text'>" + "Location: " + location + "<p>");

        var getTicks = data.events[i].url;
        newCardBody.append(
          "<a class='btn btn-primary btn-dlock mt-4 getTicks' target='_blank' href=" +
            getTicks +
            ">Get Tickets!" +
            "</a>"
        );

        newCardBody.append("<button type='button' id=button" + i + " class='btn btn-primary btn-dlock mt-4 saveBtn'><i class='far fa-heart'></i></button>"
        );

        let buttonId = "#button" + i;
          let test = location;

        $(document).on("click", buttonId, function() {
          console.log(test)
        })

    }

      var errorNum = 8
      if (data.events[0].venue.state === data.events[1].venue.state) {
      console.log(errorNum);
      }
      else {
        modal.style.display = "block";
      }
  })

  fetch(urlFiveDay,  {
      method: "GET",
    })
    .then(function (response) {
      return response.json()
    })

    
    .then(function (response) {
       $(".appendedAll").remove();
       $(".float-child2").show();

            for (i = 0; i < 5; i++) {
              var newItem = $("<div>").attr("class", "col-sm-12 bg-primary text-white rounded appendedAll");
              $(".fiveDay").append(newItem);
      
              var date = new Date(response.list[i * 8].dt * 1000);
              newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");
      
              var iconCode = response.list[i * 8].weather[0].icon;
              var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
              newItem.append($("<img>").attr("src", iconURL));
      
              var temp = response.list[i * 8].main.temp;
              newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");
    }
  })
})


searchShowEvenMore.addEventListener("click", (e) => {
  userInput = ($(".userInput").val())
  var clearList = $(".card");
  e.preventDefault();
  console.log(userInput);
  var urlSearchBar = "https://api.seatgeek.com/2/events?venue.city=" + userInput + "&per_page=50&page=1&client_id=MjMyNTQ3OTl8MTYzMTEyNjQ3Mi40MjI1NzMz";
  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + weatherKey + "&units=imperial";


fetch(urlSearchBar, {
  method: "GET",
})
  .then(function(data) {
    return data.json()
  })
  .then(function (data) {
    console.log(data)

    if (data.meta.total < 1) {
      modal.style.display = "block";
    }

    closeModal.onclick = function() {
      modal.style.display = "none";
    }

    showBtn.style.display = "none";
    hiddenPrev.style.display = "none";

    var newCard = $("<div>").attr("class", "card");

    $(".fiveDayBorder").show();
    $(".eventsTitle").show();
    $(".eventsTitle").text("Events Near " + userInput);

    for (i = 25; i < 50; i++) {

      var newCardBody = $("<div>").attr("class", "card-body");
      $(".card").append(newCardBody);
      console.log("it works");

      var img = data.events[i].performers[0].image;
      newCardBody.append(
        "<img class='img-fluid mb-2' src=" +
          "'" +
          img +
          "'" +
          "alt=" +
          "test" +
          "></img>"
      );
      var title = data.events[i].short_title;
        newCardBody.append("<h3 class='card-title'>" + title + "<h3>");

        var date = data.events[i].datetime_local;

        newCardBody.append("<p class='card-text'>" + "Date: " + date + "<p>");

        var location = data.events[i].venue.name;
        newCardBody.append("<p class='card-text'>" + "Location: " + location + "<p>");

        var getTicks = data.events[i].url;
        newCardBody.append(
          "<a class='btn btn-primary btn-dlock mt-4 getTicks' target='_blank' href=" +
            getTicks +
            ">Get Tickets!" +
            "</a>"
        );

        newCardBody.append("<button type='button' id=button" + i + " class='btn btn-primary btn-dlock mt-4 saveBtn'><i class='far fa-heart'></i></button>"
        );

          let buttonId = "#button" + i;
          let test = location;

        $(document).on("click", buttonId, function() {
          console.log(test)
        })

    }

      var errorNum = 8
      if (data.events[0].venue.state === data.events[1].venue.state) {
      console.log(errorNum);
      }
      else {
        modal.style.display = "block";
      }
  })

  fetch(urlFiveDay,  {
      method: "GET",
    })
    .then(function (response) {
      return response.json()
    })

    
    .then(function (response) {
       $(".appendedAll").remove();
       $(".float-child2").show();

            for (i = 0; i < 5; i++) {
              var newItem = $("<div>").attr("class", "col-sm-12 bg-primary text-white rounded appendedAll");
              $(".fiveDay").append(newItem);
      
              var date = new Date(response.list[i * 8].dt * 1000);
              newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");
      
              var iconCode = response.list[i * 8].weather[0].icon;
              var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
              newItem.append($("<img>").attr("src", iconURL));
      
              var temp = response.list[i * 8].main.temp;
              newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");
    }
  })
})







userGeo.addEventListener("click", (e) => {
  e.preventDefault();
  var clearList = $(".card");
  clearList.remove();
  seatGeek();
});

function seatGeek() {

  fetch(url, {
    method: "GET",
  })
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);

      showBtn.style.display = "none";
      hiddenPrev.style.display = "none";
      localShowMore.style.display = "block";
      localShowEvenMore.style.display = "none";

      var newCard = $("<div>").attr("class", "card");

        $(".fiveDayBorder").show();
        $(".eventsTitle").show();
        $(".eventsTitle").text("Events Near You");
        $(".nearEvents").append(newCard);

      for (i = 0; i < 5; i++) {
        
        var newCardBody = $("<div>").attr("class", "card-body");
        $(".card").append(newCardBody);
        console.log("it works");

        var img = data.events[i].performers[0].image;
        newCardBody.append(
          "<img class='img-fluid mb-2' src=" +
            "'" +
            img +
            "'" +
            "alt=" +
            "test" +
            "></img>"
        );

        var title = data.events[i].short_title;
        newCardBody.append("<h3 class='card-title'>" + title + "<h3>");

        // var dateConv = moment().format("MMM Do, YYYY, hh:mm:");
        var date = data.events[i].datetime_local;

        newCardBody.append("<p class='card-text'>" + "Date: " + date + "<p>");

        var location = data.events[i].venue.name;
        newCardBody.append("<p class='card-text'>" + "Location: " + location + "<p>");

        var getTicks = data.events[i].url;
        newCardBody.append(
          "<a class='btn btn-primary btn-dlock mt-4 getTicks' target='_blank' href=" +
            getTicks +
            ">Get Tickets!" +
            "</a>"
        );

        newCardBody.append("<button type='button' id=button" + i + " class='btn btn-primary btn-dlock mt-4 saveBtn'><i class='far fa-heart'></i></button>"
        );

          let buttonId = "#button" + i;
          let test = location;

        $(document).on("click", buttonId, function() {
          console.log(test)
        })
      }
    });
    
    

    localShowMore.addEventListener("click", (e) => {
      userInput = ($(".userInput").val())
      var clearList = $(".card");
      pageNumber ++;
      // clearList.remove();
      e.preventDefault();
      console.log(userInput);
      var urlSearchBar = "https://api.seatgeek.com/2/events?geoip=true&range=40mi&per_page=26&page=1&client_id=MjMyNTQ3OTl8MTYzMTEyNjQ3Mi40MjI1NzMz";
      var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + weatherKey + "&units=imperial";
    
    
    fetch(urlSearchBar, {
      method: "GET",
    })
      .then(function(data) {
        return data.json()
      })
      .then(function (data) {
        console.log(data)
    
    
        if (data.meta.total < 1) {
          modal.style.display = "block";
        }
    
        closeModal.onclick = function() {
          modal.style.display = "none";
        }
    
        showBtn.style.display = "none";
        hiddenPrev.style.display = "none";
        localShowMore.style.display = "none";
        localShowEvenMore.style.display = "block";
        
    
        var newCard = $("<div>").attr("class", "card");
    
        $(".fiveDayBorder").show();
        $(".eventsTitle").show();
        $(".eventsTitle").text("Events Near " + userInput);
    
        for (i = 5; i < 25; i++) {
    
          var newCardBody = $("<div>").attr("class", "card-body");
          $(".card").append(newCardBody);
          console.log("it works");
    
          var img = data.events[i].performers[0].image;
          newCardBody.append(
            "<img class='img-fluid mb-2' src=" +
              "'" +
              img +
              "'" +
              "alt=" +
              "test" +
              "></img>"
          );
          var title = data.events[i].short_title;
            newCardBody.append("<h3 class='card-title'>" + title + "<h3>");
    
            var date = data.events[i].datetime_local;
    
            newCardBody.append("<p class='card-text'>" + "Date: " + date + "<p>");
    
            var location = data.events[i].venue.name;
            newCardBody.append("<p class='card-text'>" + "Location: " + location + "<p>");
    
            var getTicks = data.events[i].url;
            newCardBody.append(
              "<a class='btn btn-primary btn-dlock mt-4 getTicks' target='_blank' href=" +
                getTicks +
                ">Get Tickets!" +
                "</a>"
            );
    
            newCardBody.append("<button type='button' id=button" + i + " class='btn btn-primary btn-dlock mt-4 saveBtn'><i class='far fa-heart'></i></button>"
            );
    
            let buttonId = "#button" + i;
              let test = location;
    
            $(document).on("click", buttonId, function() {
              console.log(test)
            })
    
        }
    
          var errorNum = 8
          if (data.events[0].venue.state === data.events[1].venue.state) {
          console.log(errorNum);
          }
          else {
            modal.style.display = "block";
          }
      })
    
      fetch(urlGeo,  {
          method: "GET",
        })
        .then(function (response) {
          return response.json()
        })
    
        
        .then(function (response) {
           $(".appendedAll").remove();
           $(".float-child2").show();
    
                for (i = 0; i < 5; i++) {
                  var newItem = $("<div>").attr("class", "col-sm-12 bg-primary text-white rounded appendedAll");
                  $(".fiveDay").append(newItem);
          
                  var date = new Date(response.list[i * 8].dt * 1000);
                  newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");
          
                  var iconCode = response.list[i * 8].weather[0].icon;
                  var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                  newItem.append($("<img>").attr("src", iconURL));
          
                  var temp = response.list[i * 8].main.temp;
                  newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");
        }
      })
    })




    localShowEvenMore.addEventListener("click", (e) => {
      userInput = ($(".userInput").val())
      var clearList = $(".card");
      e.preventDefault();
      console.log(userInput);
      var urlSearchBar = "https://api.seatgeek.com/2/events?geoip=true&range=40mi&per_page=50&page=1&client_id=MjMyNTQ3OTl8MTYzMTEyNjQ3Mi40MjI1NzMz";
      var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + weatherKey + "&units=imperial";
    
    
    fetch(urlSearchBar, {
      method: "GET",
    })
      .then(function(data) {
        return data.json()
      })
      .then(function (data) {
        console.log(data)
    
        if (data.meta.total < 1) {
          modal.style.display = "block";
        }
    
        closeModal.onclick = function() {
          modal.style.display = "none";
        }
    
        showBtn.style.display = "none";
        hiddenPrev.style.display = "none";
        localShowMore.style.display = "none";
        localShowEvenMore.style.display = "none";
    
        var newCard = $("<div>").attr("class", "card");
    
        $(".fiveDayBorder").show();
        $(".eventsTitle").show();
        $(".eventsTitle").text("Events Near " + userInput);
    
        for (i = 25; i < 50; i++) {
    
          var newCardBody = $("<div>").attr("class", "card-body");
          $(".card").append(newCardBody);
          console.log("it works");
    
          var img = data.events[i].performers[0].image;
          newCardBody.append(
            "<img class='img-fluid mb-2' src=" +
              "'" +
              img +
              "'" +
              "alt=" +
              "test" +
              "></img>"
          );
          var title = data.events[i].short_title;
            newCardBody.append("<h3 class='card-title'>" + title + "<h3>");
    
            var date = data.events[i].datetime_local;
    
            newCardBody.append("<p class='card-text'>" + "Date: " + date + "<p>");
    
            var location = data.events[i].venue.name;
            newCardBody.append("<p class='card-text'>" + "Location: " + location + "<p>");
    
            var getTicks = data.events[i].url;
            newCardBody.append(
              "<a class='btn btn-primary btn-dlock mt-4 getTicks' target='_blank' href=" +
                getTicks +
                ">Get Tickets!" +
                "</a>"
            );
    
            newCardBody.append("<button type='button' id=button" + i + " class='btn btn-primary btn-dlock mt-4 saveBtn'><i class='far fa-heart'></i></button>"
            );
    
              let buttonId = "#button" + i;
              let test = location;
    
            $(document).on("click", buttonId, function() {
              console.log(test)
            })
    
        }
    
          var errorNum = 8
          if (data.events[0].venue.state === data.events[1].venue.state) {
          console.log(errorNum);
          }
          else {
            modal.style.display = "block";
          }
      })
    
      fetch(urlFiveDay,  {
          method: "GET",
        })
        .then(function (response) {
          return response.json()
        })
    
        
        .then(function (response) {
           $(".appendedAll").remove();
           $(".float-child2").show();
    
                for (i = 0; i < 5; i++) {
                  var newItem = $("<div>").attr("class", "col-sm-12 bg-primary text-white rounded appendedAll");
                  $(".fiveDay").append(newItem);
          
                  var date = new Date(response.list[i * 8].dt * 1000);
                  newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");
          
                  var iconCode = response.list[i * 8].weather[0].icon;
                  var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                  newItem.append($("<img>").attr("src", iconURL));
          
                  var temp = response.list[i * 8].main.temp;
                  newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");
        }
      })
    })
    


  //   fetch(urlGeo,  {
  //     method: "GET",
  //   })
  //   .then(function (response) {
  //     return response.json()
  //   })
  //   // .then(function (response) {
     
  //   // })

  //   .then(function (response) {
      
  //      $(".appendedAll").remove();
  //      $(".float-child2").show();

  //           for (i = 0; i < 5; i++) {
  //             var newItem = $("<div>").attr("class", "col-sm-12 bg-primary text-white rounded appendedAll");
  //             $(".fiveDay").append(newItem);
      
  //             var date = new Date(response.list[i * 8].dt * 1000);
  //             newItem.append("<h4>" + date.toLocaleDateString() + "<h4>");
      
  //             var iconCode = response.list[i * 8].weather[0].icon;
  //             var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  //             newItem.append($("<img>").attr("src", iconURL));
      
  //             var temp = response.list[i * 8].main.temp;
  //             newItem.append("<p>" + ("Temp: " + temp + " F") + "<p>");
  //   }
  // }) 
}



// $(".saveBtn").delegate("click", function() {
//   console.log("yoyo")
//   listItem1.innerHTML = "hello"
// })






})


















let entry1 = $(".listItem1");
let entry2 = $(".listItem2");
let entry3 = $(".listItem3");
let entry4 = $(".listItem4");
let entry5 = $(".listItem5");

function storeEntry() {
  localStorage.setItem("event1", entry1.text());
  localStorage.setItem("event2", entry2.text());
  localStorage.setItem("event3", entry3.text());
  localStorage.setItem("event4", entry4.text());
  localStorage.setItem("event5", entry5.text());
};

let getEntry1 = localStorage.getItem("event1");
let getEntry2 = localStorage.getItem("event2");
let getEntry3 = localStorage.getItem("event3");
let getEntry4 = localStorage.getItem("event4");
let getEntry5 = localStorage.getItem("event5");

let pullEvents = [getEntry1, getEntry2, getEntry3, getEntry4, getEntry5];

for(i = 0; i < pullEvents.length; i++) {
   entry1.text(getEntry1);
   entry2.text(getEntry2);
   entry3.text(getEntry3);
   entry4.text(getEntry4);
   entry5.text(getEntry5);
};












