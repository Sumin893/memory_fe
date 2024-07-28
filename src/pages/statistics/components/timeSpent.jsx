import styled from 'styled-components';
import { BackGroundImg } from '../../../styles/common';
import TitleBox from './titleBox'; //여기서 text를 props로 보내줌
import Background from '../../../assets/Img/backgroundImg/logInStatistics.png';
import GlassmorphismModal from '../../../components/glassmorphismModal/glassmorphismModal';
import { ArrowIcon } from '../../../components/icons/icons';
import PieChartComponent from './pieChartComponent';

//TimeSpent라는 함수형 컴포넌트 선언. data를 props로 받음
function TimeSpent({ data }) {
    return (
        <BackImg>
            {/* height 70%는 높이가 전체 화면의 70%를 차지하는 것 */}
            <GlassmorphismModal height={'70%'}>
                <TitleBox
                    text={'이번 달 내가 가장 많이\n쓴 시간을 살펴볼까요?'}
                />
                <PieChartComponent apiData={data} />
            </GlassmorphismModal>
            <ArrowIcon />
        </BackImg>
    );
}
export default TimeSpent;
const BackImg = styled.div`
    ${BackGroundImg(Background)}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    justify-content: center;
`;
