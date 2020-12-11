import React, { useState, useEffect, useRef } from 'react';
import QuestionType from './QuestionType.js';
import Results from './Results.js';
import { useReactToPrint } from 'react-to-print';

function Questions() {
    // list of questions - temporary
    const [questions, setQuestions] = useState([
        {
            type: "mc",
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
            options: [
                "Option 1",
                "Option 2",
                "Option 3",
                "Option 4"
            ],
            correctAnswer: "Option 1",
            correctAnswerIndex: 0,
        },
        {
            type: "fitb",
            beforeBlank: "Lorem ipsum dolor sit amet, consectetur ",
            afterBlank: " elit 2?",
            correctAnswer: "Answer",
        },
        {
            type: "fitb",
            beforeBlank: "Lorem ipsum dolor sit amet, consectetur ",
            afterBlank: " elit 2?",
            correctAnswer: "Answer",
        },
        {
            type: "dropdown",
            beforeBlank: "Lorem ipsum dolor sit amet, consectetur ",
            afterBlank: " elit 3?",
            options: [
                "Option 5",
                "Option 6",
                "Option 7",
                "Option 8",
            ],
            correctAnswer: "Option 5",
        },
        {
            type: "match",
            question: "Match the following terms.",
            matchA: [
                "Match 1A",
                "Match 2A",
                "Match 3A",
                "Match 4A",
            ],
            matchB: [
                "Match 1B",
                "Match 2B",
                "Match 3B",
                "Match 4B",
            ],
            correctAnswer: [
                "A",
                "B",
                "C",
                "D"
            ]
        },
    ])

    const [notAnswered, setNotAnswered] = useState([]);
    const [matchAnswered, setMatchAnswered] = useState();
    
    // user's answers
    const [answers, setAnswers] = useState([
        ,
        ,
        ,
        ,
        []
    ]);

    // see if all of the answers except match have been validated
    const [allValidated, setAllValidated] = useState(false);
    // see if the match answers have been validated
    const [matchValidated, setMatchValidated] = useState(false);

    const handleSubmit = (event) => {
        
        // temporary to store indexes of unanswered questions
        let newArr = [];
        
        for (var i = 0; i < answers.length; i++) {
            //check to see if the question is answered, if not, add the index to the array
            if (questions[i].type !== "match" && answers[i] === undefined) {
                newArr.push(i);
            }
            
            // if it is a match question and not all the fields are answered, set matchAnswered equal to the length to be used later
            else if (questions[i].type === "match" && answers[i].length <= questions[i].matchA.length) {
                setMatchAnswered(answers[i].length);
            }
        }
        
        if (newArr.length !== 0) {
            setNotAnswered(newArr);    
        }
        else {
            setAllValidated(true);
        }
        
    }

    // check to see if answers are updating correctly (diagnostic)
    useEffect(()  => {
        console.log(answers);
    }, [answers]);

    const reset = () => {
        setAllValidated(false);
        setMatchValidated(false);

        // reset questions quiz (probably just use the funciton that will be used to randomly select questions)
        // reset answers
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // if the answers are not validated, continue showing the questions their error messages
    if (!allValidated || !matchValidated) {
    // if (false) {
        return (
            <div>
                <h3>FBLA Quiz</h3>
                    {
                        // parse through question list and display correct question type for each question
                        questions.map((question, index) => (
                            <QuestionType key={index} question={question} questionIndex={index} setAnswers={setAnswers} answers={answers} notAnswered={notAnswered} matchAnswered={matchAnswered} setMatchValidated={setMatchValidated}></QuestionType>
                        ))
                    }
                <input type="button" value="Submit" onClick={e => handleSubmit(e)}></input>
            </div>
        )
    }
    // if all of the answers have been validated, display the results when the submit button is pressed
    else {
        return <div>
            <Results questions={questions} answers={answers} setAllValidated={setAllValidated} setMatchValidated={setMatchValidated} ref={componentRef}></Results>
            <input type="button" value="Print" style={{marginRight: "10px"}} onClick={handlePrint()}></input>
            <input type="button" value="Generate New Quiz" onClick={e => reset()}></input>
        </div>
    }
    
}

export default Questions;