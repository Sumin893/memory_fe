import styled from 'styled-components';
import { BackGroundImg } from '../../styles/common';
import Background from '../../assets/Img/backgroundImg/logInStatistics.png';
import Meco from '../../assets/Img/meco.png'; //이미지 처리는 항상 이런 식으로 하고 아래 코드에는 경로를 쓰지말자!!
import GlassmorphismModal from '../../components/glassmorphismModal/glassmorphismModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePostLogIn } from '../../query/Post/usePostLogIn';
// import TokenService from '../../utils/tokenService';

//로그인페이지 기능
function LogInPage() {
    const navigate = useNavigate();

    //idAndPw라는 useState 선언. 초기값은 빈 문자열의 userId와 userPw를 담고 있는 하나의 객체
    const [idAndPw, setIdAndPw] = useState({
        userId: '',
        userPw: '',
    });

    //usePostLogIn라는 커스텀 훅 선언. mutate로 로그인 요청: 서버에 비동기적으로 로그인 데이터를 전송
    const { mutate } = usePostLogIn(navigate);

    //로그인버튼을 눌렀을 때 호출되는 handleLogIn함수
    const handleLogIn = () => {
        if (idAndPw.userId === '' || idAndPw.userPw === '') return; //id가 빈 문자열이거나 pw가 빈문자열이라면 채워질 때까지 다음 거를 할 수 없음
        mutate(idAndPw); //아이디와 비밀번호를 서버에 전송
    };

    return (
        <BackImg>
            <Box>
                <GlassmorphismModal>
                    <TopBox>
                        <LogoBox>로고</LogoBox>
                        <MecoImg src={Meco} alt="" />
                    </TopBox>
                    <MiddleBox>
                        <LogInInput
                            type="text"
                            name="id"
                            placeholder="아이디를 입력하세요"
                            onChange={
                                (e) =>
                                    setIdAndPw((prev) => ({
                                        ...prev,
                                        userId: e.target.value,
                                    })) //id를 text형식으로 받고, 이전상태인 초기상태의 id와 pw가 함께 들어있는 객체를 spread 연산자를 사용하여 보여준 뒤에 id가 입력되면 id만 채워줌
                            }
                        />
                        <LogInInput
                            type="password"
                            name="pw"
                            placeholder="비밀번호를 입력하세요"
                            onChange={
                                (e) =>
                                    setIdAndPw((prev) => ({
                                        ...prev,
                                        userPw: e.target.value,
                                    })) //pw를 password형식으로 받고, 이전상태인 id만 채워져 있는 spread연산자 (...prev)를 이용해서 보여주고 입력된 pw도 채워줌
                            }
                        />
                    </MiddleBox>
                    <BottomBox>
                        <LogInBt
                            type="Button"
                            disabled={
                                idAndPw.userId === '' || idAndPw.userPw === ''
                            } //id나 pw 둘 중 하나라도 안채워져 있으면 '로그인'버튼을 누를 수 없음
                            onClick={handleLogIn}
                        >
                            로그인
                        </LogInBt>
                        <LogInBt
                            type="Button"
                            onClick={() => navigate('/signUp')} //이 버튼을 누르면 signUp페이지로 이동함
                        >
                            가입하러 가기
                        </LogInBt>
                    </BottomBox>
                </GlassmorphismModal>
            </Box>
        </BackImg>
    );
}
export default LogInPage;

const BackImg = styled.div`
    ${BackGroundImg(Background)}
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 120px;
`;

const Box = styled.form`
    margin-top: 50px;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopBox = styled.div`
    /* width: 60%; */
    width: 75%;
    height: 103px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const MecoImg = styled.img`
    height: 103px;
`;
const LogoBox = styled.div`
    font-size: 30px;
    color: white;
    font-weight: bold;
`;
const MiddleBox = styled.div`
    width: 75%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const BottomBox = styled.div`
    width: 75%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const LogInInput = styled.input`
    border: 0px;
    width: 100%;
    height: 43px;
    border-radius: 10px;
    font-size: 12px;
    padding-left: 10px;
    background-color: #6a6b9d;
    font-size: 16px;
    margin-bottom: 20px;
    color: white;
    &::placeholder {
        color: #edecec;
        opacity: 70%;
    }
    &:focus {
        outline: none;
    }
`;
const LogInBt = styled.button`
    border: 0px;
    width: 100%;
    height: 43px;
    border-radius: 10px;
    font-size: 16px;
    background-color: #65628b;
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 24px;
    padding-top: 3px;
    cursor: pointer;
    font-weight: bold;
    &:disabled {
        opacity: 0.9;
    }
`;
