import styled from 'styled-components';
import { CancelIcon } from '../../../components/icons/icons';
import { emotions } from '../../../constants/emotions';
import { useState } from 'react';

//EmotionModal이라는 함수형 컴포넌트 선언. setIsView랑 setAddDate를 props로 받음
function EmotionModal({ setIsView, setAddDate }) {
    //emotionCategory라는 배열 선언(안에 긍정적, 중립, 부정적 3가지의 객체가 들어있음)
    const emotionCategory = [
        {
            kor: '긍정적',
            en: 'positiveEmotions',
        },
        {
            kor: '중립',
            en: 'neutralEmotions',
        },
        {
            kor: '부정적',
            en: 'negativeEmotions',
        },
    ];

    //clickCategory라는 useState 선언. 초기값은 '긍정적'의 객체
    const [clickCategory, setClickCategory] = useState({
        kor: '긍정적',
        en: 'positiveEmotions',
    });

    //이모티콘 클릭하면 생기는 이벤트에 대해. element, type, emotions를
    const handleClickEmotion = (e, type, emotions) => {
        //setAddDate함수 선언 (prev를 기반으로)
        setAddDate((prev) => ({
            ...prev, //setAddDate 안에 든 특정 값들을 spread연산자를 이용해 전체를 풀어서 보여줌
            emotion: emotions + type, //emotion은 emotions와 type을 결합해서 새롭게 선택한 감정을 저장
            emotionCategory: clickCategory.kor, //emotionCategory는 선택된 카테고리의 한국어를 저장
        }));
        //setIsView함수 선언 (위에서 감정 선택했으니까 선택 모달창을 닫는 거(false로 바꾸기))
        setIsView((prev) => ({ ...prev, emotionModal: false }));
    };

    return (
        <Wrapper>
            <Category>
                <CategoryList>
                    {emotionCategory.map((el, idx) => (
                        <Box
                            key={idx}
                            point={el.kor === clickCategory.kor} //el.kor와 선택한 카테고리의 kor가 맞는지 확인
                            onClick={() =>
                                setClickCategory({
                                    //'긍정적', '중립', '부정적' 이거 중에 클릭할 수 있음
                                    kor: el.kor,
                                    en: el.en,
                                })
                            }
                        >
                            {/* 그 중에 한국어만 보여줌 */}
                            {el.kor}
                        </Box>
                    ))}
                </CategoryList>
                <CancelIcon
                    color={'black'}
                    onClick={() =>
                        //엑스 버튼 누르면 감정모달창 닫힘(false)
                        setIsView((prev) => ({ ...prev, emotionModal: false }))
                    }
                />
            </Category>
            <EmotionList>
                {emotions[clickCategory.en].map((el, idx) => (
                    <Emotion
                        onClick={(e) =>
                            handleClickEmotion(e, el.type, el.emotions)
                        }
                    >
                        {/* 선택한 이모티콘 보여주고 */}
                        {el.emotions}
                        {/* 선택한 감정 보여주고 */}
                        {el.type}
                    </Emotion>
                ))}
            </EmotionList>
        </Wrapper>
    );
}
export default EmotionModal;

const Wrapper = styled.div`
    height: 210px;
    width: 100%;
    overflow-y: auto;
    left: 0;
    background-color: white;
    position: absolute;
    bottom: 0;
    border-radius: 40px 40px 0 0;
    color: #5d659e;
    padding: 20px 30px;
    z-index: 11;
    //CSS 속성 중 하나. transition -> timing-function -> cubic-bezier
    //cubic-bezier옆에 괄호에 (x1,y1,x2,y2)를 대입해야함
    animation: fadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    @keyframes fadeIn {
        0% {
            bottom: -20rem;
            opacity: 0;
        }
        100% {
            bottom: 0;
            opacity: 1;
        }
    }
`;
const Category = styled.div`
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const CategoryList = styled.div`
    display: flex;
    align-items: center;
`;
const Box = styled.div`
    margin-right: 10px;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: ${({ point }) =>
        point
            ? '#D6CDE4'
            : ''}; //버튼 눌렀으면 색을 #D6cde4로 바꾸고 안 눌렀으면 색 없음
`;
const EmotionList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Emotion = styled.div`
    border: 1px solid #b6bbd3;
    font-size: 16px;
    font-weight: bold;
    padding: 5px 12px;
    border-radius: 15px;
    margin: 5px;
`;
