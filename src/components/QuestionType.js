import React, { useState } from 'react';
import ValidationDisplay from './Validation.js';

function QuestionType(props) {
    //inputs
    const question = props.question;
    const questionIndex = props.questionIndex;
    const setAnswers = props.setAnswers;
    const answers = props.answers;
    const submitted = props.submitted;
    const notAnswered = props.notAnswered;
    const matchAnswered = props.matchAnswered;
    const setMatchValidated = props.setMatchValidated;

    const changeAnswer = (index, answer) => e => {
        let newArr = [...answers]; // copy current array
        newArr[index] = answer; // set the answer of the correct index to the input

        setAnswers(newArr); // overwrite the old answers array with the updated one
    }

    // same as changeAnswer but for fill in the blank (no inputted answer)
    const fitbChangeAnswer = (index) => e => {
        let newArr = [...answers];
        newArr[index] = e.target.value;

        setAnswers(newArr);

    }

    // same as changeAnswer but for fill in the blank (no inputted answer)
    const matchChangeAnswer = (questionIndex, index) => e => {
        let newArr = [...answers];
        newArr[questionIndex][index] = e.target.value.toUpperCase();

        setAnswers(newArr);

    }

    // multiple choice question
    if (question.type === "mc") {
        return <div>
            {
                (submitted) 
                ? ((question.correctAnswer === answers[questionIndex]) ? <p style={{display: 'inlineBlock'}}>Yes</p> : <p style={{display: 'inlineBlock'}}>No</p>) 
                : <p></p>
            }
            <p style={{ display: 'inline-block', marginRight: '10px' }}>{ questionIndex + 1}.</p>
            <p style={{ display: 'inline-block'}}>{ question.question }</p>
            <ValidationDisplay notAnswered={notAnswered} question={question} answers={answers} questionIndex={questionIndex} matchAnswered={matchAnswered}></ValidationDisplay>
            {
                question.options.map(option => (
                    <div key={option}>
                        <input 
                            type="radio"
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={ option.localeCompare(answers[questionIndex]) === 0 ? true : false }
                            onChange={ changeAnswer(questionIndex, option) }
                        />
                        <p style={{ display: 'inline-block' }}>{ option }</p>
                    </div>
                ))
            }
        </div>
    }

    // fill in the blank question
    else if (question.type === "fitb") {

        return <div>
            <p style={{ display: 'inline-block', marginRight: '10px' }}>{ questionIndex + 1}.</p>
            <p style={{ display: 'inline-block', paddingRight: '5px' }}>{ question.beforeBlank }</p>
            <input name="fitb" type="text" value={ answers[questionIndex] } onChange={fitbChangeAnswer(questionIndex)} />
            <p style={{ display: 'inline-block', paddingLeft: '5px' }}>{ question.afterBlank }</p>
            <ValidationDisplay notAnswered={notAnswered} question={question} answers={answers} questionIndex={questionIndex} matchAnswered={matchAnswered}></ValidationDisplay>
        </div>
    }

    // drop down question
    else if (question.type === "dropdown") {
        return <div>
            <p style={{ display: 'inline-block', marginRight: '10px' }}>{ questionIndex + 1}.</p>
            <p style={{ display: 'inline-block', paddingRight: '5px' }}>{ question.beforeBlank }</p>
            <select required value={answers[questionIndex]} onChange={ fitbChangeAnswer(questionIndex) } placeholder=" ">
                <option disabled selected value>  </option>
                {
                    question.options.map(option => (
                        <option key={option}>{option}</option>
                    ))
                }
            </select>
            <p style={{ display: 'inline-block', paddingLeft: '5px' }}>{ question.afterBlank }</p>
            <ValidationDisplay notAnswered={notAnswered} question={question} answers={answers} questionIndex={questionIndex} matchAnswered={matchAnswered}></ValidationDisplay>
        </div>
    }

    // match
    else if (question.type === "match") {

        return <div>
            <p style={{ display: 'inline-block', marginRight: '10px' }}>{ questionIndex + 1}.</p>
            <p style={{ display: 'inline-block'}}>{ question.question }</p>
            <ValidationDisplay notAnswered={notAnswered} question={question} answers={answers} questionIndex={questionIndex} matchAnswered={matchAnswered} setMatchValidated={setMatchValidated}></ValidationDisplay>
            <table style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
                    {
                        question.matchA.map((itemA, index) => (

                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        maxLength="1" 
                                        value={ answers[questionIndex][index] || ''} 
                                        onChange={matchChangeAnswer(questionIndex, index) } 
                                        style={{ width: '20px', marginRight: '10px', textTransform: 'uppercase'}} 
                                    />
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

export default QuestionType