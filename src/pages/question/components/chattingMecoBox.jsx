import styled, { keyframes } from 'styled-components';
import Star1 from '../../../assets/Img/questionImg/star.png';

//ChattingMecoBox 컴포넌트형 함수 선언, text랑 isFix를 props로 받을거임
function ChattingMecoBox({ text, isFix }) {
    return (
        // isFix는 ChattingBox 컴포넌트 안에서 사용됨
        <ChattingBox isFix={isFix}>
            <Box>
                {text}
                <Star src={Star1} />
            </Box>
        </ChattingBox>
    );
}
export default ChattingMecoBox;
const fadeIn = keyframes` //서서히 나타남
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
const ChattingBox = styled.div`
    display: flex;
    margin: 20px 0;
    animation: ${fadeIn} 2.5s ease-in-out; //1. 정의된 fadeIn 애니메이션을 2. 2.5초동안 3. ease-in-out방식으로 표현
    animation: ${({ isFix }) => isFix && 'none'};
    //isFix의 값이 true이면, 애니메이션을 쓰지 않을 거임 => 맨처음 "오늘의 인상깊은 사건은 무엇인가요" 이건 fadeIn이 필요없으니까!
`;
const Box = styled.div`
    background-color: #e1e2ed;
    color: #5a639c;
    padding: 10px 30px;
    max-width: 90%;
    border-radius: 40px;
    font-weight: bold;
    white-space: pre-line;
    position: relative;
`;
const Star = styled.img`
    position: absolute;
    top: -7px;
    right: 7px;
`;
