import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useMountObsever } from '../../../hooks/useMountObsever';

//PercentBar라는 함수형 컴포넌트 선언, props도 받음
function PercentBar(props) {
    const { ratio, heigth = 'regular', category, count, unit = '회' } = props; //props에서 ratio(비율), height, category(막대의 카테고리), count(실제 횟수), unit(단위=기본값: '회') 5개의 속성 가져옴

    const ref = useRef(null); //ref라는 변수를 생성. 초기값은 null
    const isInViewport = useMountObsever(ref); //useMountObserver라는 커스텀 훅 선언. ref를 통해서 isInViewport인지 확인함

    return (
        <Wrapper>
            <Title>{category}</Title>
            <BarWrapper>
                <Bar
                    width={ratio * count} //가로는 비율 x 실제 횟수
                    heigth={heigth} //높이는 높이
                    ref={ref} //useRef에서 생성된 ref 객체
                    className={isInViewport ? 'animation' : ''} //className은 isInViewport가 true일 경우 animation이 보여지고 아니면 빈 문자열(안보여지는 듯)
                >
                    {/* 비율 x 실제 횟수가 0인 경우 빈 문자열 반환, 화면에 표시x. 0이 아니라면 count와 unit을 같이 보여줌(count가 5고, unit이 회 => '5회'라고 출력) */}
                    {ratio * count === 0 ? (
                        ''
                    ) : (
                        <div>
                            {count}
                            {unit}
                        </div>
                    )}
                </Bar>
            </BarWrapper>
        </Wrapper>
    );
}
export default PercentBar;

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
`;
const Title = styled.div`
    font-size: 15px;
    margin-right: 10px;
    color: #ffffff;
    min-width: 20%;
    max-width: 20%;
`;
const BarWrapper = styled.div`
    width: 80%;
`;

//slide되는 애니매이션 : 20%인 상태 ~ width까지! (width를 받아서)
const slide = (width) => keyframes`
  from {
    width: 20%;
  }
  to {
    width: ${width};
  }
`;

const Bar = styled.div`
    background-color: #ffe4a2;
    width: ${({ width }) => (width ? width : 1)}%;
    height: ${({ heigth }) =>
        heigth === 'bold'
            ? '45px'
            : '30px'}; //height를 받아서 height가 볼드체면 45px, 볼드체가 아니면 30px
    border-radius: 0 30px 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    &.animation {
        animation: ${(width) => slide(width)} 1.5s ease-out; //넓이는 slide로
    }
`;
//1. 위에 정의한 애니메이션을, 2. 1.5초동안 3. ease-out 방식으로 표현
