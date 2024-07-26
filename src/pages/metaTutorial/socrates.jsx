import styled from 'styled-components';
import { BackGroundImg } from '../../styles/common';
import Background from '../../assets/Img/backgroundImg/meta_1.png';
import CustomButton from '../../components/customButton/customButton';
import { useState } from 'react';
import { socratestQuestionList } from '../../constants/socratesQuestionList';
import ProgressBar from '../../components/progressBar/progressBar';
import { useNavigate } from 'react-router-dom';

//'Socrates'라는 이름의 함수형 컴포넌트 선언
function Socrates() {
    const navigate = useNavigate();
    //currentQuestion이라는 useState 선언. 초기값은 0
    const [currentQuestion, setCurrentQuestion] = useState(0);
    //answer라는 useState 선언. 초기값은 빈 문자열의 answer1,2,3,4,5를 포함한 객체
    const [answer, setAnswer] = useState({
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
    });

    //handleUpDownQuestion컴포넌트(질문 번호를 up or down시킴) 안에서 매개변수 upDown을
    const handleUpDownQuestion = (upDown) => {
        //만약 upDown이 'up'이면
        if (upDown === 'up') {
            //만약 현재 질문번호가 4이면 더이상 증가시키지 않음
            if (currentQuestion === 4) return;
            //번호가 4 전까지는 upDown이 'up'이면 이전값(이전 질문 번호)에 +1 해줌
            setCurrentQuestion((prev) => prev + 1);
        }
        //만약 upDown이 'down'이면
        if (upDown === 'down') {
            //이전값(질문 번호)에 -1 해줌
            setCurrentQuestion((prev) => prev - 1);
        }
    };
    return (
        <BackImg>
            <MainQuestion>
                자신에 대해서 <br />
                얼마나 알고 있나요?
            </MainQuestion>
            <MiniQuestion>
                {socratestQuestionList[currentQuestion].question} &#40;
                {currentQuestion + 1}/5&#41;
            </MiniQuestion>
            {/* 소크라테스질문리스트에서 현재 질문을 받아오고, currentQuestion이라는 useState 초기값은 0부터 시작하니까 +1시켜서 1부터 표시되도록 함 */}
            <ProgressBar currentPageNum={currentQuestion} limit={4} />
            <MainAnswer>
                <textarea
                    name="AboutMeAnswer"
                    placeholder="답변이 어려우면 작성하지 않아도 괜찮아요 &#10;언제든 다시 작성이 가능합니다"
                    // textarea값이 변경될 때마다 onChange 호출됨
                    onChange={(e) =>
                        setAnswer((prev) => ({
                            ...prev, //prev로 이전상태 보여줌, spread연산자니까 answer1,2,3,4,5를 펼쳐서 하나의 객체로 보여줌
                            [`answer${currentQuestion + 1}`]: e.target.value, //currentQuestion이 0이면 answer1이 업데이트 됨(answer는 1부터인데 currentQuestion리스트는 배열안에 객체라 0부터 시작이었음 그래서 번호가 다름)
                        }))
                    }
                    value={answer[`answer${currentQuestion + 1}`]}
                    rows={6}
                    cols={40}
                />
            </MainAnswer>
            <MQButton>
                {currentQuestion === 0 ? ( //현재 질문이 1번 질문이야(0번 인덱스)
                    <div></div> //그럼 왼쪽엔 이전질문버튼이 있을 필요가 없어서 그냥 빈 div
                ) : (
                    //현재 질문이 1번 이상의 질문이야(2,3,4,5번)
                    <CustomButton
                        icon={'left'}
                        onClick={() => handleUpDownQuestion('down')} //'이전 질문'버튼 누르면 "handleUpDownQuestion"이거에서 'down' 값으로 처리
                    >
                        이전 질문
                    </CustomButton> //그럼 '이전 질문'이라는 버튼 보여줌
                )}
                {currentQuestion === 4 ? ( //현재 질문이 5번 질문이야(4번 인덱스)
                    <CustomButton icon={'right'} onClick={() => navigate('/')}>
                        홈으로
                    </CustomButton> //마지막 질문이니까 오른쪽엔 '홈으로'라는 버튼, 그리고 그 버튼을 누르면 홈으로 감 (navigate가 '/'니까)
                ) : (
                    //현재 질문이 5번 질문이 아니면
                    <CustomButton
                        icon={'right'}
                        onClick={() => handleUpDownQuestion('up')} //그냥 오른쪽에 '다음 질문'버튼을 보여줌
                    >
                        다음 질문
                    </CustomButton>
                )}
            </MQButton>
        </BackImg>
    );
}
export default Socrates;

const BackImg = styled.div`
    ${BackGroundImg(Background)}
    padding: 50% 30px 0 30px;
`;

const MainQuestion = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: white;
    padding-bottom: 20px;
`;

const MiniQuestion = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #edececd7;
    padding-bottom: 20px;
`;

const MainAnswer = styled.div`
    textarea {
        font-size: 16px;
        height: 180px;
        resize: none; //사용자가 임의로 사이즈 조절 할 수 없게 함
        outline: none;
        border-radius: 10px;
        width: 100%;
        background-color: #00000046;
        color: white;
        padding: 10px;
        ::placeholder {
            color: #b3aeae;
            font-size: 14px;
            font-weight: 700;
        }
    }
`;

const MQButton = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5% 0;
`;
