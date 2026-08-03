 let step = 0;
    const instruction = document.getElementById("instruction");
    const milk1 = document.getElementById("milk1");
    const milk2 = document.getElementById("milk2");
    const cylinder = document.getElementById("cylinder");
    const cylinderFilled = document.getElementById("cylinderFilled");
    const tube1 = document.getElementById("tube1");
    const tube2 = document.getElementById("tube2");
    const tubeFilled1 = document.getElementById("tubefilled1");
    const tubeFilled2 = document.getElementById("tubefilled2");
    const pour1 = document.getElementById("milk-pour1");
    const pour2 = document.getElementById("milk-pour2");
    const streamCylinder = document.getElementById("milk-stream-cylinder");
    const cap = document.getElementById("iodine-cap");
    function startExperiment() {
      instruction.innerText = "Click on Milk Sample A to transfer to measuring cylinder.";
      step = 1;

      milk1.onclick = () => { if (step === 1) pourIntoCylinder('A'); };
      tube1.onclick = () => { if (step === 2) moveCylinderToTube('A'); };
      milk2.onclick = () => { if (step === 3) pourIntoCylinder('B'); };
      tube2.onclick = () => { if (step === 4) moveCylinderToTube('B'); };
    }

    function pourIntoCylinder(sample) {
      const milk = sample === 'A' ? milk1 : milk2;
      const pour = sample === 'A' ? pour1 : pour2;

      instruction.innerText = `Moving Milk ${sample} to measuring cylinder...`;

      milk.style.left = "27%";
      milk.style.top = "50%";
      milk.style.transform = "rotate(-25deg)";

      setTimeout(() => {
        pour.style.display = "block";
        pour.style.left = "28.5%";
        pour.style.top = "61%";

        setTimeout(() => {
          pour.style.display = "none";
          milk.style.display = "none";
          cylinder.style.display = "none";
          cylinderFilled.style.display = "block";
          cylinderFilled.style.zIndex = "10";

          instruction.innerText = `Click on Test Tube ${sample} to pour milk from cylinder.`;
          step = sample === 'A' ? 2 : 4;
        }, 1500);
      }, 1000);
    }

    function moveCylinderToTube(sample) {
      const isA = sample === 'A';
      const targetTube = isA ? tube1 : tube2;
      const filledTube = isA ? tubeFilled1 : tubeFilled2;
      const moveLeft = isA ? "42.4%" : "44.5%";
      const moveTop = "36%";
      const streamLeft = isA ? "48%" : "50%";

      instruction.innerText = `Pouring milk from cylinder to Test Tube ${sample}...`;

      cylinderFilled.style.left = moveLeft;
      cylinderFilled.style.top = moveTop;
      cylinderFilled.style.transform = "rotate(-25deg)";
      cylinderFilled.style.zIndex = "10";

      setTimeout(() => {
        streamCylinder.style.left = streamLeft;
        streamCylinder.style.top = "46.5%";
        streamCylinder.style.display = "block";

        setTimeout(() => {
          streamCylinder.style.display = "none";
          targetTube.style.display = "none";
          filledTube.style.display = "block";

          instruction.innerText = "Returning measuring cylinder...";
          cylinderFilled.style.left = "27%";
          cylinderFilled.style.top = "63%";
          cylinderFilled.style.transform = "rotate(0deg)";

          setTimeout(() => {
            cylinderFilled.style.display = "none";
            cylinder.style.display = "block";

            if (isA) {
              instruction.innerText = "Milk A added. Now click on Milk B to add milk into measuring cylinder.";
              step = 3;
            } else {
              instruction.innerText = "Milk B added. Now click on the Water Bath to start boiling.";
              step = 5;
            }
          }, 1000);
        }, 1500);
      }, 1000);
    }

    function boilSample() {
      if (step !== 5) return;

      instruction.innerText = "Placing test tubes into the water bath...";
      document.getElementById("waterbath").src = "images/waterbath2.png";

      tubeFilled1.style.left = "54.5%";
      tubeFilled1.style.top = "59%";
      tubeFilled1.style.transform = "rotate(0deg)";
      tubeFilled1.style.transition = "all 1s ease";

      tubeFilled2.style.left = "57%";
      tubeFilled2.style.top = "59%";
      tubeFilled2.style.transform = "rotate(0deg)";
      tubeFilled2.style.transition = "all 1s ease";

      setTimeout(() => {
        document.getElementById("boilingEffect").style.display = "block";
        instruction.innerText = "Boiling in progress... Please observe!";
          setTimeout(() => {
      moveTestTubesBack(); 
    }, 2000);  // Boiling duration

        step = 6;
      }, 1500);
    }
    function moveTestTubesBack() {
  if (step !== 6) return;

  instruction.innerText = "Removing test tubes and letting them cool...";

  // Move test tubes to stand
  tubeFilled1.style.transition = "all 1.5s ease";
  tubeFilled2.style.transition = "all 1.5s ease";
  tubeFilled1.style.left = "42.6%";
  tubeFilled1.style.top = "48%";
  tubeFilled2.style.left = "44.6%";
  tubeFilled2.style.top = "48%";

  setTimeout(() => {
    instruction.innerText = "Let it cool for 5 mins...";
    
    setTimeout(() => {
      instruction.innerText = "Click on the iodine bottle to add it to both test tubes.";
      cap.addEventListener("click", addIodine);
      step = 7;
    }, 2000);
  }, 1500);
}


function addIodine() {
  if (step !== 7) return;

  const cap = document.getElementById("iodine-cap");
  cap.removeEventListener("click", addIodine);

  instruction.innerText = "Adding iodine to Test Tube A...";

  cap.style.left = "50.6%";
  cap.style.top = "30%";

  setTimeout(() => {
    createDrop(cap); 

    setTimeout(() => {
      instruction.innerText = "Adding iodine to Test Tube B...";


      cap.style.left = "52.5%";

      setTimeout(() => {
        createDrop(cap); 

        setTimeout(() => {
          tubeFilled1.src = "images/Test-tube-blue.png";
          tubeFilled1.style.left = "42.8%";
          tubeFilled1.style.top = "48%";
          // Move cap back to original position
          cap.style.left = "34.6%";
          cap.style.top = "59.6%";

          setTimeout(() => {
            instruction.innerText = "Observation: Development of blue colour indicates presence of starch.";

            // Show result table
            document.getElementById("resultTable").style.display = "block";

            // Show final alert
            alert("✅ Experiment Complete!\n\nTest Tube A turned blue indicating starch adulteration. Test Tube B remained unchanged.");

            document.getElementById("reset-btn").style.display = "block";
            step = 8;

           
          }, 2000);
        }, 1500);
      }, 1000);
    }, 1000);
  }, 1000);
}

function createDrop(relativeTo) {
  const drop = document.createElement("div");
  drop.className = "drop";

  const rect = relativeTo.getBoundingClientRect();
  const labRect = document.getElementById("lab").getBoundingClientRect();


  drop.style.left = `${rect.left - labRect.left + 15}px`;
  drop.style.top = `${rect.top - labRect.top + 148}px`;

  document.getElementById("lab").appendChild(drop);

  setTimeout(() => {
    drop.remove();
  }, 1500); 
}
  function resetExperiment() {
  location.reload();
}
