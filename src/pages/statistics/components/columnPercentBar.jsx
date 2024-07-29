import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useMountObsever } from '../../../hooks/useMountObsever';

//ColumnPercentBar라는 함수형 컴포넌트 선언, props도 받음
function ColumnPercentBar(props) {
    const { ratio, category, count, unit = '회' } = props; //props에서 ratio(비율), category(막대의 카테고리), count(실제 횟수), unit(단위=기본값: '회') 4개의 속성 가져옴

    const ref = useRef(null); //ref라는 변수를 생성. 초기값은 null
    const isInViewport = useMountObsever(ref); //useMountObserver라는 커스텀 훅 선언. ref를 통해서 isInViewport인지 확인함

    return (
        <Wrapper>
            <BarWrapper>
                <Bar
                    height={ratio * count} //높이는 비율 x 실제 횟수
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
            <Title>{category}</Title>
        </Wrapper>
    );
}
export default ColumnPercentBar;

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
`;
const Title = styled.div`
    font-size: 15px;
    padding: 15px 0;
    text-align: center;
    color: white;
    font-weight: bold;
`;
const BarWrapper = styled.div`
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 330px;
    justify-content: end;
`;

//slide되는 애니매이션 : 0인 상태 ~ height까지! (height를 받아서)
const slide = (height) => keyframes`
  from {
    height: 0;
  }
  to {
    height: ${height};
  }
`;

const Bar = styled.div`
    background-color: #ffe4a2;
    min-width: 50px;
    min-height: ${({ height }) => (height ? height : 1)}%;
    border-radius: 30px 30px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    &.animation {
        animation: ${(height) => slide(height)} 2s ease-out;
        //높이는 slide로
    }
`;

//1. 위에 정의한 애니메이션을, 2. 2초동안 3. ease-out 방식으로 표현
