import styled from 'styled-components';
import GlassmorphismModal from '../../../components/glassmorphismModal/glassmorphismModal';
import TitleBox from './titleBox';
import { BackGroundImg } from '../../../styles/common';
import Background from '../../../assets/Img/backgroundImg/logInStatistics.png';
import ColumnPercentBar from './columnPercentBar';
import { ArrowIcon, UpArrowIcon } from '../../../components/icons/icons';

//EmotionsSummary라느 함수형 컴포넌트 선언. data를 props로 받음
function EmotionsSummary({ data }) {
    //.reduce함수 (data배열의 요소를 돌면서 callback함수의 실행 값을 누적해서 하나의 결과값을 반환함)
    //여기서는 maxObjArr을 반환함 data.reduce에서 data는 호출한 배열의 이름 (어쩌구.reduce 이렇게 쓰면 되는 듯. 어쩌구는 배열이름이 되는 것)
    //prev는 callback함수의 반환값을 누적함(누적값)
    //value는 배열의 현재 요소
    //만약 prev.count가 value.count보다 크거나 같으면, prev를 반환하고, 아니면 value를 반환함
    const maxObjArr = data.reduce((prev, value) => {
        return Number(prev.count) >= Number(value.count) ? prev : value;
    });

    //maxObjArr.count를 100으로 나누고 소수점 둘째 자리까지 계산(.toFixed(2))하고 ratio에 계산된 비율 값을 저장함
    let ratio = Math.floor(100 / maxObjArr.count).toFixed(2);

    return (
        <BackImg>
            <UpArrowIcon />
            <GlassmorphismModal height={'70%'}>
                <TitleBox
                    text={'이번 달, 내가 가장 많이\n느낀 감정을 확인해 볼까요?'}
                />
                <PercentWrapper>
                    {/* data 배열의 각 요소에 대한 map을 수행. 현재 돌고 있는 문자열:val, 현재 요소의 인덱스:idx */}
                    {data.map((val, idx) => (
                        <ColumnPercentBar
                            key={idx} //key는 idx 그 자체
                            ratio={ratio} //이 페이지에서 위에 ratio 계산한거 가져와
                            category={val.type} //val의 type를 가져와
                            count={val.count} //val의 count를 가져와
                        />
                    ))}
                </PercentWrapper>
            </GlassmorphismModal>
            <ArrowIcon />
        </BackImg>
    );
}
export default EmotionsSummary;

const BackImg = styled.div`
    ${BackGroundImg(Background)}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const PercentWrapper = styled.div`
    margin-top: 20px;
    height: 60%;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
