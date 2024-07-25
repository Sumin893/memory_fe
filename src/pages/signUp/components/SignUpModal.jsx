import GlassmorphismModal from '../../../components/glassmorphismModal/glassmorphismModal';
import CustomModal from '../../../components/customModal/customModal';
import styled from 'styled-components';
import SuccessImg from '../../../assets/Img/meco.png';
import { useNavigate } from 'react-router-dom';

function SignUpMadal({ setIsModalView }) {
    //SignUpModal함수는 setIsModalView를 매개변수로 받음
    const navigate = useNavigate();
    const handleStart = () => {
        setIsModalView(false);
        alert('임시로 회원가입 성공! 튜토리얼 시작합니다'); //회원가입 성공시 alert 띄워줌
        navigate('/metaAbout'); ///metaAbout페이지로 이동함
    };
    return (
        <CustomModal>
            <GlassmorphismModal>
                <Title>회원가입 성공</Title>
                <Img src={SuccessImg} alt="" />
                <Title>
                    이제, 메코와 함께
                    <br />
                    나에 대해 알아보아요.
                </Title>
                <Button onClick={handleStart}>시작하기</Button>
            </GlassmorphismModal>
        </CustomModal>
    );
}
export default SignUpMadal;
const Title = styled.div`
    font-size: 23px;
    font-weight: 600;
    color: #ffffff;
`;

const Img = styled.img`
    width: 150px;
    margin: 20px 0;
`;
const Button = styled.div`
    color: #5a639c;
    font-size: 16px;
    background-color: #ffffff;
    padding: 10px 30px;
    margin-top: 20px;
    border-radius: 7px;
    :hover {
        opacity: 0.7;
    }
    font-weight: 600;
`;
