import React from 'react';

function Results(props) {
    const questions = props.questions;
    const answers = props.answers;
    const setAllValidated = props.setAllValidated;
    const setMatchValidated = props.setMatchValidated;

    const correctArr = [];

    // calulate how many correct answers they are and create the correctArr
    const checkCorrect = () => {

        // initialize counter variable
        var correct = 0;

        // parse through all answers
        for (var i = 0; i < answers.length; i++) {

            // if it is not a match question, compare the inputted answer to the correct answer and add to correct counter if correct
            if (questions[i].type !== "match") {
                if (questions[i].correctAnswer === answers[i]) {
                    correct++;
                    correctArr[i] = true;
                }
                else {
                    correctArr[i] = false;
                }
            }

            // if it is a match question, parse through each supplied answer and compare it to the inputting answer (it is an array answer)
            // if the arrays match, matchCorrect will be true and the answer will be true
            else {

                var matchCorrect = true;

                for (var j = 0; j < answers[i].length; j++) {
                    if (answers[i][j] !== questions[i].correctAnswer[j]) {
                        matchCorrect = false;
                    }
                }

                if (matchCorrect) {
                    correct++;
                }

                correctArr[i] = matchCorrect;
            }
        }

        return correct;
    }

    const numCorrect = checkCorrect();

    function ResultsQuestion(props2) {

        const question = props2.question;
        const questionIndex = props2.questionIndex;

        if (question.type === "mc") {

            return <div>
                {
                    (answers[questionIndex] === question.correctAnswer) ? <p style={{color: "green", display: "inline-block"}}>✔</p> : <p style={{color: "red", display: "inline-block"}}>✘</p>  
                }
                <p style={{ display: 'inline-block', marginRight: '10px', marginLeft: "10px" }}>{ questionIndex + 1}.</p>
                <p style={{display: "inline-block"}}>{question.question}</p>
                {
                question.options.map(option => (
                    <div key={option}>
                        <input 
                            type="radio"
                            checked={ (answers[questionIndex] === option || question.correctAnswer === option) ? true : false }
                            style={ (answers[questionIndex] === option || question.correctAnswer === option)  ? {display: "none"} : {backgroundColor: "blue"}}
                        />
                        { 
                            (answers[questionIndex] === option || question.correctAnswer === option)
                            ? <div style={ (question.correctAnswer === option) ? { width: "8px", height: "8px", borderRadius: "50%", border: "1px solid green", backgroundColor: "green", backgroundClip: "content-box", padding: "3px", display: "inline-block", marginRight: "4px", marginLeft: "4px"} : { width: "8px", height: "8px", borderRadius: "50%", border: "1px solid red", backgroundColor: "red", backgroundClip: "content-box", padding: "3px", display: "inline-block", marginRight: "4px", marginLeft: "4px"}}></div> 
                            : <div style={{ display: "inline-block"}}></div>
                        }
                        <p style={{ display: 'inline-block' }}>{ option }</p>
                    </div>
                ))
            }
            </div>
        }
        else if (question.type === "fitb") {
            return <div>
                {
                    (answers[questionIndex].toLowerCase() === question.correctAnswer.toLowerCase()) ? <p style={{color: "green", display: "inline-block"}}>✔</p> : <p style={{color: "red", display: "inline-block"}}>✘</p>  
                }
                <p style={{ display: 'inline-block', marginRight: '10px', marginLeft: "10px" }}>{ questionIndex + 1}.</p>
                <p style={{ display: 'inline-block', paddingRight: '5px' }}>{ question.beforeBlank }</p>
                {
                    (answers[questionIndex].toLowerCase() === question.correctAnswer.toLowerCase())
                    ? <p style={{color: "green", display: "inline-block", textDecoration: "underline"}}>{answers[questionIndex]}</p>
                    : <div style={{display: "inline-block"}}>
                        <p style={{color: "red", display: "inline-block", textDecoration: "line-through", marginRight: "5px"}}>{answers[questionIndex]}</p>
                        <p style={{color: "green", display: "inline-block", textDecoration: "underline"}}>{question.correctAnswer}</p>
                    </div> 
                }
                <p style={{ display: 'inline-block', paddingLeft: '5px' }}>{ question.afterBlank }</p>
            </div>
        }
        else if (question.type === "dropdown") {
            return <div>
                {
                    (answers[questionIndex] === question.correctAnswer) ? <p style={{color: "green", display: "inline-block"}}>✔</p> : <p style={{color: "red", display: "inline-block"}}>✘</p>  
                }
                <p style={{ display: 'inline-block', marginRight: '10px', marginLeft: "10px" }}>{ questionIndex + 1}.</p>
                <p style={{ display: 'inline-block', paddingRight: '5px' }}>{ question.beforeBlank }</p>
                {
                    (answers[questionIndex] === question.correctAnswer)
                    ? <p style={{color: "green", display: "inline-block", textDecoration: "underline"}}>{answers[questionIndex]}</p>
                    : <div style={{display: "inline-block"}}>
                        <p style={{color: "red", display: "inline-block", textDecoration: "line-through", marginRight: "5px"}}>{answers[questionIndex]}</p>
                        <p style={{color: "green", display: "inline-block", textDecoration: "underline"}}>{question.correctAnswer}</p>
                    </div> 
                }
                <p style={{ display: 'inline-block', paddingLeft: '5px' }}>{ question.afterBlank }</p>
            </div>
        }
        else {
            return <div>
                {
                    (correctArr[questionIndex]) ? <p style={{color: "green", display: "inline-block"}}>✔</p> : <p style={{color: "red", display: "inline-block"}}>✘</p>  
                }
                <p style={{ display: 'inline-block', marginRight: '10px', marginLeft: "10px" }}>{ questionIndex + 1}.</p>
                <p style={{ display: 'inline-block', paddingRight: '5px' }}>{ question.question }</p>
                <table style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
                    {
                        question.matchA.map((itemA, index) => (

                            <tr>
                                {
                                    (answers[questionIndex][index] === question.correctAnswer[index])
                                        ? <div>
                                            <td><p style={{color: "white"}}>A</p></td>
                                            <td>
                                        <p style={{color: "green", display: "inline-block", textDecoration: "underline"}}>{answers[questionIndex][index]}</p>
                                    </td>
                                        </div>
                                    : <td>
                                    <div style={{display: "inline-block"}}>
                                        <p style={{color: "red", display: "inline-block", textDecoration: "line-through", marginRight: "5px"}}> {answers[questionIndex][index]} </p>
                                        <p style={{color: "green", display: "inline-block", textDecoration: "underline"}}> {question.correctAnswer[index]} </p>
                                    </div>
                                    </td>
                                }
                                <td>
                                    <p style={{ display: 'inline-block', marginRight: '50px'}}>{ itemA }</p>
                                </td>
                                <td>
                                    <p style={{ display: 'inline-block', marginRight: '10px'}}>{String.fromCharCode(65 + index)}. </p>
                                    <p style={{ display: 'inline-block'}}>{ question.matchB[index] }</p>
                                </td>
                            </tr>
                        ))
                    }
            </table>
            </div>
        }
    }

    return <div> 
        <h3>Results</h3>
        <h3>{ numCorrect }/5</h3>
        {
            questions.map((question, index) => (
                <ResultsQuestion key={index} question={question} questionIndex={index}></ResultsQuestion>
            ))
        }
    </div>

}

export default Results