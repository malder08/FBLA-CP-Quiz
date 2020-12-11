import React from 'react';

function ValidationDisplay(props) {

    const notAnswered = props.notAnswered;
    const question = props.question;
    const answers = props.answers;
    const questionIndex = props.questionIndex;
    const matchAnswered = props.matchAnswered;
    const setMatchValidated = props.setMatchValidated;

    // validation for all questions except matching

    if (question.type !== "match") {

        // check to see if the index of a question appears in the notAnswered array

        for (var i = 0; i < notAnswered.length; i++) {

            // if the index does appear in the array, it means the question has not been answered and must display an error message

            if (notAnswered[i] === questionIndex) {

                //display error message

                return <p style={{ display: 'inline-block', paddingLeft: '5px', color: 'red'}}>
                    Answer missing.
                </p>

            }
        }
    }

    // validation for matching question

    else {

        var message = "";
        var validated = true;

        // make sure the number of answers listed in the answer array is the same as the required answers

        if (matchAnswered !== question.matchA.length) {
            message = message.concat("Missing an answer field."); // add to error message
            validated = false;
        }

        // if the lengths are the same that doesn't mean everything is answered, check to make sure it is or if there are no duplicates

        else {

            var missing = false;

            // parse through each answer for the match question to make sure it isn't blank
            // if it is, display error message warning that a field is missing

            for (var j = 0; j < answers[questionIndex].length; j++) {

                // parsing

                if (answers[questionIndex][j] === undefined || answers[questionIndex][j] === "") {
                    missing = true;               
                }
            }

            if (missing) {
                message = message.concat("Missing an answer field. "); // add to error message
                validated = false; 
            }

            //invalid answers or duplicates
            else {

                var code = "";
                var duplicate = false;

                for (var k = 0; k < answers[questionIndex].length; k++) {

                    // check if all of the answers are within the corrrect range of ASCII values
                    // display "Invalid Answer." error message if not

                    code = answers[questionIndex][k].toUpperCase().charCodeAt(0);

                    if (code > (65 + question.matchA.length) || code < 65) {
                        message = message.concat("Invalid answer. "); // add to error message
                        validated = false; 
                    }

                    // if a character appears twice or more in the answer array, display an error message warning of duplicate
                    for (var i = 0; i < answers[questionIndex].length; i++) {
                        if (code === answers[questionIndex][i].toUpperCase().charCodeAt(0) && i !== k) {
                            duplicate = true;
                        }
                    }

                }

                if (duplicate) {
                    message = message.concat("Cannot have duplicate answers. "); // add to error message
                    validated = false; 
                }
            }
        }

        // if the match answers have been validated, set matchValidated to true
        if (validated) {
            setMatchValidated(true);
        }
    
        // making sure the form has been submitted and the question has been answered before displaying error message
        if (matchAnswered !== undefined) {

            //display error message

            return <p style={{ display: 'inline-block', paddingLeft: '5px', color: 'red'}}>
                {message}
            </p>
        }

    }

    return null;
}

export default ValidationDisplay