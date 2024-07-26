import styled from 'styled-components';

function SignUpPassword({ setUser, pw, setIsCheckAndError }) {
    //SignUpPassword함수는 setUser, pw, setIsCheckAndError를 매개변수로 받음
    const handleOnChangeInput = (val) => {
        //val이 새로 입력됨
        setUser((prev) => ({ ...prev, userPw: val })); //setUser의 이전값을 객체로 풀어서 보여주고, userPw를 새로 입력 받은 val로 업데이트
        setIsCheckAndError((prev) => ({ ...prev, isError: false }));
    }; //오류상태를 이전값에서 초기값인 false로 바꿔줌. 오류 있던 걸 초기화시키는 거
    return (
        <NameBox0>
            <NameBox1>사용할 비밀번호를 작성해주세요</NameBox1>
            <NameInput
                type="password"
                value={pw}
                placeholder="비밀번호"
                onChange={(e) => handleOnChangeInput(e.target.value)} //비밀번호는 password형식으로(암호) 입력되고 위에 handleOnChangeInput함수로 들어감
            />
        </NameBox0>
    );
}
export default SignUpPassword;

const NameBox1 = styled.div`
    width: 100%;
    height: 100px;
    font-size: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
`;
const NameBox0 = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const NameInput = styled.input`
    border-width: 0 0 2px;
    border-color: white;
    color: white;
    width: 100%;
    font-size: 22px;
    padding-left: 5px;
    padding-right: 50px;
    padding-bottom: 10px;
    background-color: transparent;
    &::placeholder {
        color: #edecec;
        opacity: 70%;
    }
    &:focus {
        outline: none;
        border-color: #e2bbe9;
        color: white;
    }
`;
