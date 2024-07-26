import styled, { keyframes } from 'styled-components';
import ChattingMecoBox from './components/chattingMecoBox';
import ChattingUserBox from './components/chattingUserBox';
import { useState } from 'react';
import Background from '../../assets/Img/backgroundImg/calendar&question.png';
import { BackGroundImg } from '../../styles/common';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/customButton/customButton';
import { useGetToday } from '../../hooks/useGetToday';

function MecoQuestion() {
    const { contents } = useParams();
    const navigate = useNavigate();
    //useGetToday라는 커스텀훅을 today로 불러옴
    const today = useGetToday();

    //메코의 질문 리스트 (채팅창)
    const mecoQuestionList = [
        '이 사건에 대해 어떤 감정은 무엇이고 원인은 무엇인가요구르트?',
        '이건 테스트 질문 (2번째 질문)',
        '이것도 세번째 테스트 질문입니다!',
    ];
    //메코의 질문 답변 리스트 (채팅창)를 받기 위해 userAnswerList라는 useState 선언. 초기값은 빈 문자열의 1,2,3번째 질문에 대한 대답을 포함한 객체
    const [userAnswerList, setUserAnswerList] = useState({
        firstAnswer: '',
        secondAnswer: '',
        thirdAnswer: '',
    });

    //inputVal이라는 useState 선언. 초기값은 빈 문자열
    const [inputVal, setInputVal] = useState('');

    //질문에 대한 답변이 입력되면 실행되는 함수
    const handleAnswer = () => {
        setInputVal('');
        //만약 답변 중 첫번째 답변을 쓰지 않았다면
        if (userAnswerList.firstAnswer.length === 0)
            //userAnswerList값을 최신화 해줌. 근데 spread연산자 사용했으니까 1,2,3번째 답변 객체를 풀어서 보여줌. 일단 첫번째 답변만 넣어질 거임.
            return setUserAnswerList((prev) => ({
                ...prev,
                //첫 답변이 들어왔으면 들어온 그 값을 inputVal로 쓰고, 안들어왔으면 '(생략)'을 넣음 & 출력
                firstAnswer: inputVal ? inputVal : '(생략)',
            }));
        //만약 답변 중 두번째 답변을 쓰지 않았다면
        if (userAnswerList.secondAnswer.length === 0)
            //userAnswerList값을 최신화 해줌. 1,2번 답변이 넣어질 거임
            return setUserAnswerList((prev) => ({
                ...prev,
                //두번째 답변이 들어왔으면 들어온 그 값을 inputVal에 넣고, 안들어 왔으면 '(생략)'을 넣음 & 출력
                secondAnswer: inputVal ? inputVal : '(생략)',
            }));
        //만약 답변 중 세번째 답변을 쓰지 않았다면
        if (userAnswerList.thirdAnswer.length === 0)
            //userAnswerList값을 최신화 해줌. 1,2,3번 답변이 넣어질 거임
            return setUserAnswerList((prev) => ({
                ...prev,
                //세번째 답변이 들어왔으면 들어온 그 값을 inputVal에 넣고, 안들어 왔으면 '(생략)'을 넣음 & 출력
                thirdAnswer: inputVal ? inputVal : '(생략)',
            }));
    };
    return (
        <BackImg>
            <Wrapper>
                <Title>
                    오늘도 고생했어요.
                    <br />
                    메코는 김태기님한테
                    <br />
                    궁금한게 많아요.
                </Title>
                <ChattingTotalBox>
                    <ChattingMecoBox
                        text={'오늘의 인상깊은 사건은 무엇인가요?'}
                        isFix={true} //얜 isFix값이 true라 fadeIn 애니메이션이 적용되지 않음! 그냥 화면에 띄워져 있음
                    />
                    <>
                        <ChattingUserBox text={contents} />
                    </>
                    <ChattingMecoBox text={mecoQuestionList[0]} />
                    {/* ChattingMecoBox의 text는 mecoQuestionList의 0번째 index에 있는 질문을 보여줌 */}
                    {userAnswerList.firstAnswer.length !== 0 && ( //첫 답변이 들어왔으면 실행 돼
                        <>
                            <ChattingUserBox
                                text={userAnswerList.firstAnswer} //text로 첫번째 질문에 대한 답변을 써
                            />
                            {/* ChattingMecoBox의 text는 mecoQuestionList의 1번째 index에 있는 질문을 보여줌 (메코가 두번째 질문을 해) */}
                            <ChattingMecoBox text={mecoQuestionList[1]} />
                        </>
                    )}
                    {userAnswerList.secondAnswer.length !== 0 && ( //두번째 답변이 들어왔으면 실행 돼
                        <>
                            <ChattingUserBox
                                text={userAnswerList.secondAnswer} //text로 두번째 질문에 대한 답변을 써
                            />
                            {/* ChattingMecoBox의 text는 mecoQuestionList의 2번째 index에 있는 질문을 보여줌 (메코가 세번째 질문을 해) */}
                            <ChattingMecoBox text={mecoQuestionList[2]} />
                        </>
                    )}
                    {userAnswerList.thirdAnswer.length !== 0 && ( //세번째 답변이 들어왔으면 실행 돼
                        <>
                            <ChattingUserBox
                                text={userAnswerList.thirdAnswer} //text로 세번째 질문에 대한 답변을 써
                            />
                            {/* ChattingMecoBox의 text는 아래의 string을 말해 */}
                            <ChattingMecoBox
                                text={`그렇군요. 태기님 오늘 하루도\n고생 많으셨어요 !`}
                            />
                        </>
                    )}
                </ChattingTotalBox>
                {userAnswerList.thirdAnswer.length === 0 ? ( //userAnswerList의 길이가 0 이다 (답변을 안받은 상태(?))
                    //그럼 InputWrapper를 실행
                    <InputWrapper>
                        <AddChatting
                            placeholder="메코한테는 솔직한 답변을 해주세요."
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                        />
                        <Button onClick={handleAnswer}>보내기</Button>
                    </InputWrapper>
                ) : (
                    //아니면 EndBox를 실행
                    <EndBox>
                        <CustomButton
                            icon={'right'}
                            onClick={() => navigate(`/questionSum/${today}`)} //'대화 정리'버튼을 누르면 questionSum으로 이동함
                        >
                            대화 정리
                        </CustomButton>
                    </EndBox>
                )}
            </Wrapper>
        </BackImg>
    );
}
export default MecoQuestion;
const BackImg = styled.div`
    ${BackGroundImg(Background)}
    padding: 72px 30px 0 30px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
`;
const ChattingTotalBox = styled.div`
    height: 50vh;
    overflow: auto;
`;
const InputWrapper = styled.div`
    position: relative;
`;
const Button = styled.button`
    background-color: #534a69aa;
    border: none;
    font-size: 14px;
    color: white;
    padding: 3px 10px;
    border-radius: 5px;
    position: absolute;
    right: 10px;
    bottom: 15px;
`;
const AddChatting = styled.textarea`
    width: 100%;
    height: 20vh;
    background-color: #6e628c;
    border-radius: 10px;
    border: none;
    resize: none;
    padding: 20px;
    ::placeholder {
        color: #edececc6;
    }
    font-size: 16px;
`;
const fadeIn = keyframes`
  0%{
    opacity: 0;
  }
  80% {    
    opacity: 0;
  }
  100% {    
    opacity: 1;
  }
`;
const EndBox = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
    align-items: end;
    animation: ${fadeIn} 1s ease-in-out;
    justify-content: end;
`;
