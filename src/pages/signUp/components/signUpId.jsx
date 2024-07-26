import styled from 'styled-components';

function SignUpId({ setUser, id, setIsCheckAndError }) {
    //SignUpId함수는 setUser, id, setIsCheckAndError를 매개변수로 받음
    const [result, setResult] = useState(false); //result라는 useState 선언. 초기값은 false
    const handleCheckId = async () => {
        //handleCheckId함수 선언, async(비동기)함수 await랑 같이 써줌 => promise함수의 단점 보완
        if (!id) setIsCheckAndError((prev) => ({ ...prev, isError: true })); //만약 id가 없으면?아니면? isError를 true로 바꿔서 오류임을 나타냄
        ///////////////try catch문 공부해야겠다/////////////////////////
        try {
            const res = await UserApi.getCheckId(id);
            setResult(res.data);
        } catch (err) {}

        result
            ? setIsCheckAndError((prev) => ({
                  //위의 try catch문의 result가 true면
                  ...prev,
                  isCheckIdMs: '사용할수없는 아이디입니다.', //이 메세지 보여줌
              }))
            : setIsCheckAndError((prev) => ({
                  //위의 try catch문의 result가 false면
                  ...prev,
                  isCheckIdMs: '사용가능한 아이디입니다.', //이 메세지 보여줌
              }));
    };
    const handleOnChangeInput = (val) => {
        //val를 새로 받음
        setUser((prev) => ({ ...prev, userId: val })); //userId를 새로 입력받은 val로 업뎃
        setIsCheckAndError((prev) => ({
            isError: false, //오류상태 false로 초기화
            isCheckIdMs: '중복확인 해주세요.', //오류가 아니더라도 이 메세지 출력시켜놓음
        }));
    };
    return (
        <NameBox0>
            <NameBox1>사용 할 아이디를 작성해주세요.</NameBox1>
            <IdBox>
                <NameInput2
                    type="text"
                    value={id}
                    placeholder="아이디 최대 10글자"
                    onChange={(e) => handleOnChangeInput(e.target.value)} //id는 text형식으로 입력. 입력된 값은 위에 handleOnChangeInput함수로 들어감
                />
                <IdCheckBt
                    type="Button"
                    value="중복확인"
                    onClick={handleCheckId}
                />
                <IdCheckBt type="Button" value="중복확인" />
            </IdBox>
        </NameBox0>
    );
}
export default SignUpId;

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
const IdCheckBt = styled.input`
    border: 0px;
    width: 20%;
    height: 43px;
    border-radius: 10px;
    font-size: 14px;
    background-color: #65628b;
    color: #ffffff;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
        background-color: #e2bbe9a8;
        transition: 0.3s;
        color: #ffffff;
    }
`;
const NameInput2 = styled.input`
    border-width: 0 0 2px;
    border-color: white;
    width: 75%;
    font-size: 22px;
    padding-left: 5px;
    padding-right: 50px;
    padding-bottom: 10px;
    background-color: transparent;
    color: white;

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
const IdBox = styled.div`
    width: 100%;
    display: flex;
`;
