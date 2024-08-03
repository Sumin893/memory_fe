import styled from 'styled-components';
import PercentBar from './percentBar';
import GlassmorphismModal from '../../../components/glassmorphismModal/glassmorphismModal';
import TitleBox from './titleBox';
import { BackGroundImg } from '../../../styles/common';
import Background from '../../../assets/Img/backgroundImg/logInStatistics.png';
import { UpArrowIcon } from '../../../components/icons/icons';

//NegativeEmotions라는 함수형 컴포넌트 선언. data라는 객체를 props로 받아옴
function NegativeEmotions({ data }) {
    //reduce함수를 통해 data배열을 돌면서 callback함수의 반환값을 누적함.
    //prev는 현재까지의 누적값
    //value는 현재 배열요소
    //만약 prev.count가 value.count보다 크거나 같으면, prev를 반환하고, 아니면 value를 반환함
    const maxObjArr = data.reduce((prev, value) => {
        return prev.count >= value.count ? prev : value;
    });

    //maxObjArr.count를 100으로 나누고 소수점 둘째 자리까지 계산(.toFixed(2))하고 ratio에 계산된 비율 값을 저장함
    let ratio = Math.floor(100 / maxObjArr.count).toFixed(2);

    return (
        <BackImg>
            <UpArrowIcon />
            <GlassmorphismModal height={'70%'}>
                <TitleBox text={'부정적 감정'} />
                <PercentWrapper>
                    {/* data 배열의 각 요소에 대한 map을 수행. 현재 돌고 있는 문자열:val, 현재 요소의 인덱스:idx */}
                    {data.map((val, idx) => (
                        <PercentBar
                            key={idx} //key는 idx 그 자체
                            ratio={ratio} //이 페이지에서 위에 ratio 계산한거 가져와
                            category={val.type} //val의 type를 가져와
                            count={val.count} //val의 count를 가져와
                        />
                    ))}
                </PercentWrapper>
            </GlassmorphismModal>
        </BackImg>
    );
}
export default NegativeEmotions;
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
        margin-top: 15px;
    }
`;
