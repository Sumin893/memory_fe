import SignUpName from './components/signUpName';
import SignUpId from './components/signUpId';
import SignUpIntro from './components/signUpIntro';
import SignUpPassword from './components/signUpPassword';
import { useState } from 'react';
import styled from 'styled-components';
import { BackGroundImg } from '../../styles/common';
import Background1 from '../../assets/Img/backgroundImg/signUp_2.png';
import CustomButton from '../../components/customButton/customButton';
import SignUpMadal from './components/SignUpModal';
import ProgressBar from '../../components/progressBar/progressBar';

function SignUpPage() {
    //CurrentPageNum이라는 useState 정의, 이 때 초기값은 0
    const [currentPageNum, SetCurrentPageNum] = useState(0);
    //IsModalView라는 useState 정의, 이 때 초기값은 false
    const [isModalView, setIsModalView] = useState(false);
    //User라는 useState 정의, 이때 초기값은 빈 string의 name, userId, userPw가 포함된 한 개의 객체
    const [user, setUser] = useState({
        name: '',
        userId: '',
        userPw: '',
    });
    //isCheckAndError라는 useState 정의, 이때 초기 값은 false값의 isError, 빈 string의 isCheckIdMs가 포함된 한 개의 객체
    const [isCheckAndError, setIsCheckAndError] = useState({
        isError: false,
        isCheckIdMs: '',
    });

    //mutate: 비동기 작업 수행, postSignUp을 불러줌, postSignUp의 T,F에 따라 모달창을 띄울지 말지도 처리됨
    const { mutate: postSignUp } = usePostSignUp(setIsModalView);

    //페이지를 넘기기 위해 upCount ~ 정의, 안에서 useState이용
    const upCount = () => {
        //만약 currentPageNum이 1이고 user.name이 빈 문자열이라면 (&& : 둘 다 해당이라면)
        if (currentPageNum === 1 && user.name === '')
            //isError를 true값으로 바꾼다 => error다!!!!!!
            ////////////////그럼 빈 문자열이 아니라면 자동적으로 error는 false겠네? 그럼 error가 뜨지 않겠네?인가요?///////////////
            //(prev) => ({ ...prev, isError: true }) 이 부분 중괄호 묶고 또 괄호로 묶어줘야함.
            //...prev: spread연산자, prev는 객체인데 그 안에 들어 있는 걸 풀어준다고 생각하면 됨. 객체의 {}를 벗긴 상태에서 넣어준다!고 생각.
            //...prev겉에 {}가 이미 있어서 객체 안에 객체를 쓸 수 없으니까 spread 연산자를 써 준 것.
            //(prev) = isError: false였음.(isCheckAndError값이), 그리고 ...prev, 뒤에 바꾸고 싶은 key값인 isError: true를 넣어줘서 isError를 false에서 true로 바꾼 것.
            return setIsCheckAndError((prev) => ({ ...prev, isError: true }));
        //만약 currentPageNum이 2이고, user.userId가 빈 문자열이라면
        if (currentPageNum === 2 && user.userId === '')
            //isError를 true로 바꾼다 => error다!!!!
            return setIsCheckAndError((prev) => ({ ...prev, isError: true }));
        //만약 currentPageNum이 2이고, isCheckAndError에서 객체 안의 isCheckIdMs가 '사용가능한 아이디입니다.'가 나오지 않았다면
        if (
            currentPageNum === 2 &&
            isCheckAndError.isCheckIdMs !== '사용가능한 아이디입니다.'
        )
            //isCheckIdMs가 ''였다가(아무것도 안뜨다가) '중복확인 해주세요.'가 뜨게 됨.
            return setIsCheckAndError((prev) => ({
                ...prev,
                isCheckIdMs: '중복확인 해주세요.',
            }));

        //useState를 이용, SetCurrentPageNum으로 원래 페이지 +1을 시켜줌
        SetCurrentPageNum((prev) => prev + 1);
        //useState를 이용, 위에 error떴던 거를 prev로 생각하고 다시 초기값인 isError: false로, isCheckIdMs를 빈 문자열로 돌려놓음
        setIsCheckAndError((prev) => ({ isError: false, isCheckIdMs: '' }));
    };

    //페이지를 앞으로 다시 넘어가는 경우도 downCount로 정의해줌
    const downCount = () => {
        //useState를 이용, SetCurrentPageNum으로 원래 페이지 -1을 시켜줌
        SetCurrentPageNum((prev) => prev - 1);
        //페이지를 다시 뒤로 가는 거니까 error세팅도 초기값인 isError: false로 만들어 줌
        setIsCheckAndError((prev) => ({ ...prev, isError: false }));
    };
    //handleSignUp 함수 선언
    const handleSignUp = () => {
        //만약 currentPageNum이 3이고, user.userPw가 빈 문자열이라면
        if (currentPageNum === 3 && user.userPw === '')
            //isError를 true로 바꾼다 => Error다!!!
            return setIsCheckAndError((prev) => ({ ...prev, isError: true }));
        //error가 아니면 Post요청!(post: 생성)
        postSignUp(user);
        //그리고 modal을 띄움 (setIsModalView의 초기값은 false였다가 true로 바뀌면서 모달이 표시됨)
        setIsModalView(true);
    };

    return (
        <>
            {currentPageNum === 0 ? ( //삼항연산자: 조건문 ? (조건문true일때 실행값) : (조건문false일때 실행값)
                //여기서는 현재페이지가 0일땐 upCount함수를 실행, 0이 아니라면 아래의 내용을 실행
                <SignUpIntro upCount={upCount} />
            ) : (
                <BackImg1>
                    <Wrapper>
                        <Container>
                            <ProgressBar
                                currentPageNum={currentPageNum} //현재페이지에 맞는 상태바
                                limit={3} //상태바의 limit은 3으로
                            />
                            {currentPageNum === 1 && (
                                <SignUpName
                                    setUser={setUser} //user라는 useState 정의 했고 setUser로 계속 업뎃
                                    name={user.name} // 이름은 user.name으로 받음
                                    setIsCheckAndError={setIsCheckAndError} //error가 있는지 확인
                                />
                            )}

                            {currentPageNum === 2 && (
                                <SignUpId
                                    setUser={setUser} //user라는 useState 정의 했고 setUser로 계속 업뎃
                                    id={user.userId} //id는 user.userId로 받음
                                    setIsCheckAndError={setIsCheckAndError} //error가 있는지 확인
                                />
                            )}
                            {currentPageNum === 3 && (
                                <SignUpPassword
                                    setUser={setUser} //user라는 useState 정의 했고 setUser로 계속 업뎃
                                    pw={user.userPw} //pw는 user.userPw로 받음
                                    setIsCheckAndError={setIsCheckAndError} //error가 있는지 확인
                                />
                            )}
                            <ErrorBox
                                isSuccess={
                                    //아이디 사용가능한 거 썼으면 성공메세지 출력
                                    isCheckAndError.isCheckIdMs ===
                                    '사용가능한 아이디입니다.'
                                }
                            >
                                {isCheckAndError.isCheckIdMs}
                                {isCheckAndError.isError //isError를 확인하고
                                    ? '값을 입력해주세요' //isError가 true면 이거 메세지 출력하고
                                    : currentPageNum === 2 && //페이지가 2이고,
                                        isCheckAndError.isCheckIdError //isCheckIdError를 확인한 뒤
                                      ? '중복확인 해주세요.' // isCheckIdError가 true면 이거 메세지 출력하고 false면 아무것도 출력하지 않음
                                      : ''}
                            </ErrorBox>
                        </Container>
                        <ButtonWrap2>
                            <CustomButton icon={'left'} onClick={downCount}>
                                이전 질문
                            </CustomButton>
                            {currentPageNum === 3 ? ( //현재 페이지가 3이면
                                <CustomButton
                                    icon={'right'} //버튼안에 아이콘추가
                                    onClick={handleSignUp} //버튼 눌렀을 때 onClick 이벤트, handleSignUp함수 실행
                                    disable={true} ///////////////////true값이 될 때까지 버튼을 누를 수 없다????????///////////////
                                >
                                    회원가입 하기
                                </CustomButton>
                            ) : (
                                <CustomButton icon={'right'} onClick={upCount}>
                                    다음 질문
                                </CustomButton> //다음질문 버튼 누르면 upCount함수 실행, +1되겠지
                            )}
                        </ButtonWrap2>
                    </Wrapper>
                    {isModalView && (
                        <SignUpMadal setIsModalView={setIsModalView} />
                    )}
                </BackImg1>
            )}
        </>
    );
}
export default SignUpPage;

const BackImg1 = styled.div`
    ${BackGroundImg(Background1)}
    display: flex;
    flex-direction: column;
`;
const Wrapper = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Container = styled.div`
    margin-top: 200px;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const ButtonWrap2 = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const ErrorBox = styled.h2`
    color: ${({ isSuccess }) =>
        isSuccess ? '#88d459' : '#a93b3b'}; //성공했으면 초록색, 실패면 빨강이
    font-size: 17px;
    margin-top: 10px;
`;
