window.addEventListener("load", function() {
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let randomIndex = Math.floor(Math.random()*json.length);
         const missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = 
         `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[randomIndex].name}</li>
            <li>Diameter: ${json[randomIndex].diameter}</li>
            <li>Star: ${json[randomIndex].star}</li>
            <li>Distance from Earth: ${json[randomIndex].distance}</li>
            <li>Number of Moons: ${json[randomIndex].moons}</li>
         </ol>
         <img src= "${json[randomIndex].image}">`
      })
   });

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      if (pilotNameInput.value === "" || copilotNameInput.value === "" || 
      fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) || 
         !isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
         alert("Invalid input!");
         event.preventDefault();
      }

      document.getElementById("pilotStatus").innerHTML = `${pilotNameInput.value} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `${copilotNameInput.value} is ready for launch`;

      if (fuelLevelInput.value < 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = 'Not enough fuel for launch';
         document.getElementById("launchStatus").innerHTML = 'Shuttle not ready for launch';
         document.getElementById("launchStatus").style.color = "red";
      } else {
         document.getElementById("launchStatus").innerHTML = 'Shuttle is ready for launch';
         document.getElementById("launchStatus").style.color = "green";
      }

      event.preventDefault(); // To prevent the page from clearing after it "submits"
      document.querySelector("form").reset(); // clears the form
   });
});



