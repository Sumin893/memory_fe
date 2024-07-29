import styled from 'styled-components';
import PercentBar from './percentBar';
import GlassmorphismModal from '../../../components/glassmorphismModal/glassmorphismModal';
import Background from '../../../assets/Img/backgroundImg/logInStatistics.png';
import { BackGroundImg } from '../../../styles/common';
import TitleBox from './titleBox';
import { ArrowIcon, UpArrowIcon } from '../../../components/icons/icons';

//ComparisonWithLastMonth라는 함수형 컴포넌트 선언. data를 props로 받음
function ComparisonWithLastMonth({ data }) {
    let ratio = //비율은 100중에
        (
            100 /
            //currentHours와 previousHours중 더 큰것을 선택할거임
            (data.currentHours >= data.previousHours //'현재'가 더 크거나 같으면
                ? data.currentHours //현재를 선택.
                : data.previousHours)
        ) //현재가 작다면, 이전을 선택
            .toFixed(2); //결과를 소수점 두 자리까지 반올림하여 출력함. (100을 선택된 값으로 나누어 비율을 계산하는 거니까)

    return (
        <BackImg>
            <UpArrowIcon />
            <GlassmorphismModal height={'70%'}>
                <TitleBox
                    text={'지난 달과 비교하여\n 시간을 한 눈에 확인해 볼까요?'}
                />
                <PercentWrapper>
                    {/* percentBar는 props로 ratio,height,category,count,unit을 받음.  */}
                    <PercentBar
                        ratio={ratio}
                        heigth={'bold'}
                        category={data.previousCategory}
                        count={data.previousHours}
                        unit={'시간'}
                    />
                    <PercentBar
                        ratio={ratio}
                        heigth={'bold'}
                        category={data.currentCategory}
                        count={data.currentHours}
                        unit={'시간'}
                    />
                </PercentWrapper>
            </GlassmorphismModal>
            <ArrowIcon />
        </BackImg>
    );
}
export default ComparisonWithLastMonth;
const BackImg = styled.div`
    ${BackGroundImg(Background)}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const PercentWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    & > * {
        margin-top: 10px;
        height: 100px;
    }
`;
