$(document).one("pageinit", function() {
  showRuns();

  $("#submitAdd").on("tap", addRun);
  $("#submitEdit").on("tap", editRun);
  $("#stats").on("tap", "#editLink", setCurrent);
  $("#stats").on("tap", "#deleteLink", deleteRun);
  $("#clearRuns").on("tap", clearRuns);

  function showRuns() {
    let runs = getRuns();

    if (runs != "" && runs != null) {
      for (let item in runs) {
        $("#stats").append(
          `<li class="ui-body-inherit ui-li-static">
            <strong>Date: </strong>${runs[item]["date"]}</br>
            <strong>Distance: </strong>${runs[item]["miles"]} mile(s)
            <div class="controls">
              <a href="#edit" id="editLink" data-miles="${runs[item]["miles"]}" data-date="${runs[item]["date"]}">Edit</a> | 
              <a href="#" id="deleteLink" data-miles="${runs[item]["miles"]}" data-date="${runs[item]["date"]}">Delete</a>
            </div>
          </li>`
        );
      }
      $("#home").bind("pageinit", function() {
        $("#stats").listview("refresh");
      });
    } else{
      $('#stats').html(`<p>You have no logged runs</p>`);
    }
  }

  //--------------------------------------------------------
  // ADD RUN
  //--------------------------------------------------------

  function addRun() {
    let miles = $("#addMiles").val();
    let date = $("#addDate").val();

    let run = {
      miles: parseFloat(miles),
      date: date
    };

    let runs = getRuns();

    runs.push(run);

    alert("Run Added");

    localStorage.setItem("runs", JSON.stringify(runs));

    window.location.href = "index.html";

    return false;
  }

  //--------------------------------------------------------
  // EDIT RUN
  //--------------------------------------------------------

  function editRun() {
    let currentMiles = localStorage.getItem("currentMiles");
    let currentDate = localStorage.getItem("currentDate");
    let runs = getRuns();

    for (let item in runs) {
      if (runs[item].miles == currentMiles && runs[item].date == currentDate) {
        runs.splice(runs[item], 1);
      }
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    let miles = $("#editMiles").val();
    let date = $("#editDate").val();

    let update_run = {
      miles: parseFloat(miles),
      date: date
    };

    runs.push(update_run);

    alert("Run Updated");

    localStorage.setItem("runs", JSON.stringify(runs));

    window.location.href = "index.html";

    return false;
  }

  //--------------------------------------------------------
  // DELETE RUN
  //--------------------------------------------------------

  function deleteRun(){
    localStorage.setItem("currentMiles", $(this).data("miles"));
    localStorage.setItem("currentDate", $(this).data("date"));

    let currentMiles = localStorage.getItem("currentMiles");
    let currentDate = localStorage.getItem("currentDate");
    let runs = getRuns();

    for (let item in runs) {
      if (runs[item].miles == currentMiles && runs[item].date == currentDate) {
        runs.splice(runs[item], 1);
      }
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    if(confirm("Are you sure?")) alert("Run Deleted");
    else return;

    window.location.href = "index.html";

    return false;
  }

  //--------------------------------------------------------
  // CLEAR ALL RUNS
  //--------------------------------------------------------

  function clearRuns(){
    if(confirm("Are you sure?")) {
      localStorage.removeItem('runs');
      $('#stats').html('<p>You have no logged runs</p>');
    }
    return;
  }

  //--------------------------------------------------------
  // GET RUN
  //--------------------------------------------------------

  function getRuns() {
    let runs = [];

    let currentRuns = localStorage.getItem("runs");

    if (currentRuns !== null) {
      runs = JSON.parse(currentRuns);
    }

    return runs.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function setCurrent() {
    localStorage.setItem("currentMiles", $(this).data("miles"));
    localStorage.setItem("currentDate", $(this).data("date"));

    $("#editMiles").val(localStorage.getItem("currentMiles"));
    $("#editDate").val(localStorage.getItem("currentDate"));
  }
});
