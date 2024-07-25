import styled from 'styled-components';

<<<<<<< Updated upstream
function SignUpName({ setUser, name }) {
=======
function SignUpName({ setUser, name, setIsCheckAndError }) {
    //SignUpName함수는 setUser, name, setIsCheckAndError를 매개변수로 받음
    const handleOnChangeInput = (val) => {
        //val이 새로 입력됨
        setUser((prev) => ({ ...prev, name: val })); //setUser의 이전상태 객체를 보여주고(name,userId,userPw), name을 새로 입력 받은 val로 바꿔줌
        setIsCheckAndError((prev) => ({ ...prev, isError: false })); //오류상태를 이전값에서 초기값인 false로 바꿔줌. 오류 있던 걸 초기화시키는 거.
    };
>>>>>>> Stashed changes
    return (
        <NameBox0>
            <NameBox1>당신의 이름은 무엇인가요?</NameBox1>
            <NameInput
                type="text"
                value={name}
                placeholder="이름을 작성해주세요"
<<<<<<< Updated upstream
                onChange={(e) =>
                    setUser((prev) => ({ ...prev, name: e.target.value }))
                }
=======
                onChange={(e) => handleOnChangeInput(e.target.value)} //이름은 text형식으로 입력되는 것이 위에 handleOnChangeInput함수로 들어감
>>>>>>> Stashed changes
            />
        </NameBox0>
    );
}
export default SignUpName;

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
    width: 100%;
    font-size: 22px;
    padding-left: 5px;
    padding-right: 50px;
    padding-bottom: 10px;
    color: white;
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
