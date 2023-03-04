import React, { useState, useEffect } from 'react';
import { MathJax } from 'better-react-mathjax';
import '../fonts/MathJax_Main-Regular.woff';
import { questionID, API_URL_LINK } from '../config';

const Main = () => {
	const [question, setQuestion] = useState('');
	const [questionIdx, setQuestionIdx] = useState(0);
	const [isAPIFailed, setIsAPIFailed] = useState(false);

	const getQuestion = async () => {
		try {
			const res = await fetch(API_URL_LINK + questionID[questionIdx]);
			const data = await res.json();
			setQuestion(data[0].Question);
		} catch (error) {
			setIsAPIFailed(true);
		}
	};

	useEffect(() => {
		getQuestion();
	}, [questionIdx]);
	useEffect(() => {
		if (typeof window?.MathJax !== 'undefined') {
			window.MathJax.typesetPromise();
		}
	});

	if (isAPIFailed) {
		return <h3 className="center">API Failed, Please refresh page.</h3>;
	}
	if (!question) {
		return <h2 className="center">Loading...</h2>;
	}
	return (
		<div className="main">
			<div className="ques-block">
				<div className="ques-no">Question: {questionIdx + 1}</div>
				<div className={'ques'}>
					<MathJax>{question}</MathJax>
				</div>
			</div>

			{!isAPIFailed && (
				<div className="btns">
					<button
						disabled={questionIdx === 0}
						onClick={() => {
							questionIdx !== 0 &&
								setQuestionIdx(questionIdx - 1);
						}}>
						Previous
					</button>
					<button
						disabled={questionIdx === questionID.length - 1}
						onClick={() => {
							questionIdx !== questionID.length - 1 &&
								setQuestionIdx(questionIdx + 1);
						}}>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default Main;
