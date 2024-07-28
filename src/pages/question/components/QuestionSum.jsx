import styled from 'styled-components';
import meco from '../../../assets/Img//questionImg/happy.png';
import { BackGroundImg } from '../../../styles/common';
import Background from '../../../assets/Img/backgroundImg/calendar&question.png';
import CustomButton from '../../../components/customButton/customButton';
import { useNavigate } from 'react-router-dom';

const QuestionSum = () => {
    const navigate = useNavigate();
    //Summary라는 객체 선언, 객체 안에 contents, questions, answers 세 개의 값이 들어있음.
    const Summary = {
        contents: '태기와 주먹다짐',
        questions: [
            '기분이 어땠나요?',
            '그 행동의 결과는 어땠나요?',
            '다음에는 어떻게 해결할 건가요?',
        ],
        answers: [
            '싸워서 마음이 아팠어요',
            '나의 주먹이 날라갔어요',
            '주먹보다 말로 풀려고 할 거에요',
        ],
    };
    //구조분해할당 (객체 속성 questions, answers 를 꺼내서 각 변수에 직접 할당)
    //questions에 '기분이 어땠나요?', '그 행동의~', '''가 들어가고
    //answers에 '싸워서~','~','~'가 할당됨
    //아래처럼 한 줄로 (구조분해할당) 쓸 수도 있고 그냥 할당 방식으로 쓸 수 도 있음
    //일반적인 할당 방식: const questions = Summary.questions, const answers = Summary.answers
    const { questions, answers } = Summary;

    return (
        <BackImg>
            <QuestionSumImg>
                <img src={meco} alt="QuestionSumImg" />
            </QuestionSumImg>
            <QuestionAnswer>
                <Wrapper>
                    <Question>오늘의 인상깊은 사건은 무엇인가요?</Question>
                    <Answer>친구들과의 약속</Answer>
                </Wrapper>
                {questions.map(
                    (
                        question,
                        idx, //questions 배열의 각요소에 대한 map(반복)을 수행함. 현재 돌고 있는 문자열: question, 현재 요소의 인덱스: idx (얘는 answers 배열의 답변 가져오는 거에 사용)
                    ) => (
                        <Wrapper key={idx}>
                            {/* 현재 질문(question)문자열 */}
                            <Question>{question}</Question>
                            {/* questions 배열의 현재 인덱스의 idx, 와 같은 인덱스의 answers배열 요소를 가져옴 */}
                            <Answer>{answers[idx]}</Answer>
                        </Wrapper>
                    ),
                )}
            </QuestionAnswer>
            <BtnWrapper>
                <CustomButton
                    icon="right"
                    onClick={() => navigate('/question')} //시간가계부 버튼을 클릭하면 question으로 이동
                >
                    시간 가계부
                </CustomButton>
            </BtnWrapper>
        </BackImg>
    );
};

export default QuestionSum;
const BackImg = styled.div`
    ${BackGroundImg(Background)}
    padding: 72px 30px 0 30px;
`;
const QuestionSumImg = styled.div``;

const QuestionAnswer = styled.div`
    text-align: left;
    padding-top: 5%;
    color: #edececde;
    font-weight: 700;
`;
const Wrapper = styled.div`
    padding-bottom: 8%;
`;
const Question = styled.div`
    padding-bottom: 2%;
    font-size: 18px;
`;
const Answer = styled.div`
    font-size: 16px;
    border-radius: 10px;
    background-color: #0000002b;
    padding: 3%;
`;
const BtnWrapper = styled.div`
    display: flex;
    justify-content: end;
`;
