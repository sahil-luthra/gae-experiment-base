/*global $, alert, hideElements, divInstructions, divNext, trainTrial, colourCondition, showDemographics */
/*jshint multistr: true */


function showIntro() {
  hideElements();
  
  divInstructions.show();
  divInstructions.html('<p>This is part of a study being run at the University of Adelaide. By clicking "Next" below you consent to take part in it.</p><p>Details of the study: The principal investigator is Prof Me (my.email.address). For any questions regarding the ethics of the study, please contact CONTACT INFO. Please direct any questions about this study to Prof Me. Although any data gained from this study may be published, you will not be identified and your personal details will not be divulged, nor will anything be linked to your Amazon ID. We use your Amazon ID merely to ensure you successfully completed the experiment and are paid. You may withdraw at any time, although you will not be paid unless you complete the study.</p>');

  divNext.show();
  divNext.click(showDemographics);
}

// displays experiment instructions
function showInstructions() {
  hideElements();

  divInstructions.html('In this task you will see ' + colourCondition + ' and green coloured lines. The colour of the lines depends on their orientation. Your task will be to learn to classify the colour of new lines based on the orientation of them. When you are ready, please press the Next button.');
  divInstructions.show();

  divNext.show();
  divNext.click(showInstructionChecks);
}

function showInstructionChecks() {
  hideElements();

  divInstructions.show();
  divInstructions.text('Here are some questions to check if you have read the instructions correctly. If you answer all the questions correctly you will begin the experiment, otherwise you will be redirected to the instructions page again.');

  var divInstructionChecks = $('#instruction-checks');
  divInstructionChecks.html('<form> \
                              <label for="question1">Question 1:</label> \
                              <input type="radio" name="question1" value="correct" /> Correct <br /> \
                              <input type="radio" name="question1" value="incorrect" /> Incorrect<br /><br /> \
                              <label for="question2">Question 2:</label> \
                              <input type="radio" name="question2" value="correct" /> Correct <br /> \
                              <input type="radio" name="question2" value="incorrect" /> Incorrect<br /><br /> \
                              <label for="question3">Question 3:</label> \
                              <input type="radio" name="question3" value="correct" /> Correct <br /> \
                              <input type="radio" name="question3" value="incorrect" /> Incorrect<br /> \
                            </form>');
  divInstructionChecks.show();

  divNext.show();
  divNext.click(validateInstructionChecks);
}

function validateInstructionChecks() {
  hideElements();

  $('form').show();
  var instructionChecks = $('form').serializeArray();

  var ok = true;
  for(var i = 0; i < instructionChecks.length; i++) {
    // check for incorrect responses
    if(instructionChecks[i].value != "correct") {
      ok = false;
      break;
    }

    // check for empty answers
    if(instructionChecks[i].value === "") {
      alert('Please fill out all fields.');
      ok = false;
      break;
    }
  }

  // where this is the number of questions in the instruction check
  if (instructionChecks.length != 3) {
    ok = false;
  }

  if(!ok) {
    alert("You didn't answer all the questions correctly. Please read through the instructions and take the quiz again to continue.");
    showInstructions(); // go back to instruction screen
  }
  else {
    // remove instruction checks form
    $('#instruction-checks').html('');
    trainTrial(); // start experiment
  }
}

