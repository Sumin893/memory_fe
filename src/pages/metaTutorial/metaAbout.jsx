import styled, { keyframes } from 'styled-components';

import Background from '../../assets/Img/backgroundImg/meta.png';
import { BackGroundImg } from '../../styles/common';
import CustomButton from '../../components/customButton/customButton';
import { useNavigate } from 'react-router-dom';

const MetaAbout = () => {
    const navigate = useNavigate();
    const handleQuestion = () => {
        navigate('/socrates');
    };
    return (
        <BackImg>
            <AboutMetaCog>
                <AboutMetaWord>
                    <h1>메타인지란?</h1>
                    <MetaWord1>자기인식</MetaWord1>
                    <MetaWord2>자기평가</MetaWord2>
                    <MetaWord3>계획</MetaWord3>
                </AboutMetaWord>
                <DesWrapper>
                    <AboutMetaDes>
                        <span>메타인지</span>는 자기 자신의 사고 과정에 대해{' '}
                        <br />
                        생각하는 능력을 의미합니다. <br />
                        즉, 자신의 생각, 학습, 이해, 기억 등을 <br />
                        인식하고 조절하는 능력입니다.
                    </AboutMetaDes>
                </DesWrapper>
                <BtnWrapper>
                    {/* <MetaButton>질문 대답 하러가기</MetaButton> */}
                    <CustomButton icon={'right'} onClick={handleQuestion}>
                        질문 대답 하러가기
                    </CustomButton>
                </BtnWrapper>
            </AboutMetaCog>
        </BackImg>
    );
};

export default MetaAbout;
const BackImg = styled.div`
    ${BackGroundImg(Background)}
`;
//a%{원하는 형태}
//정답을 바꾸는 형식의 transition 애니메이션도 있다
const aniMation = keyframes`
    0% {
        opacity: 0;
    }
    70% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const AboutMetaCog = styled.div`
    padding-top: 18%;
`;

const AboutMetaWord = styled.div`
    h1 {
        font-size: 32px;
        color: white;
        text-align: center;
        //1. 위에 정의된 애니메이션을, 2. 0초동안 3.ease의 방식으로 표현(여러 방식있음. 통통 튀는 것도 있음! 찾아서 사용)
        /////////////////////맨뒤 0s는 뭔지 모르겠네?///////////////////
        animation: ${aniMation} 0s ease 0s;
    }
`;

const MetaWord1 = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #ffffffc7;
    padding-top: 25%;
    padding-left: 15%;
    //1. 위에 정의한 애니메이션을, 2. 2초동안 3.ease의 방식으로 표현
    animation: ${aniMation} 2s ease 0s;
`;

const MetaWord2 = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #ffffffc7;
    padding-top: 8%;
    padding-left: 60%;
    //1. 위에 정의한 애니메이션을, 2. 4.5초동안 3.ease의 방식으로 표현
    animation: ${aniMation} 4.5s ease 0s;
`;

const MetaWord3 = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #ffffffc7;
    padding-top: 8%;
    padding-left: 25%;
    //1. 위에 정의한 애니메이션을, 2. 5.5초동안 3.ease의 방식으로 표현
    animation: ${aniMation} 5.5s ease 0s;
`;
const DesWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
    //1. 위에 정의한 애니메이션을, 2. 6초동안 3.ease의 방식으로 표현
    animation: ${aniMation} 6s ease 0s;
`;
const AboutMetaDes = styled.div`
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: #ffffffc7;
    padding: 15% 0 5% 0;
    span {
        font-size: 20px;
        color: #444b77;
    }
`;
const BtnWrapper = styled.div`
    margin: 0 30px;
    display: flex;
    justify-content: end;
    //1. 위에 정의한 애니메이션을, 2. 6초동안 3.ease의 방식으로 표현
    animation: ${aniMation} 6s ease 0s;
`;
