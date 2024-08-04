import styled from 'styled-components';
import { CancelIcon } from '../../../components/icons/icons';
import CustomButton from '../../../components/customButton/customButton';
import { useState } from 'react';
import EmotionModal from './emotionModal';
import CategoryModal from './categoryModal';
import { useGetToday } from '../../../hooks/useGetToday';

//가장 큰 테두리의 modal창임. *월 *일 일정 추가 그 모달창임
//ScheduleModal이라는 함수형 컴포넌트 선언. setIsView와 isView를 props로 받아옴
function ScheduleModal({ setIsView, isView }) {
    //오늘이 언젠지 알아야 *월 *일의 *에 해당하는 날짜를 가져올 수 있으니까
    const today = useGetToday();

    //addDate라는 useState 선언. 초기값은 아래의 6개가 들어간 객체 형태.
    const [addDate, setAddDate] = useState({
        ledgerDate: today,
        emotionCategory: '', //얘는 위에 import 된 EmotionModal에서 받음
        emotion: '', //얘는 위에 import된 EmotionModal에서 받음
        category: '', //얘는 위에 import된 CategoryModal에서 받음
        contents: '', //얘는 아래 return문에서 입력 받음
        takedTime: '', //얘는 아래 return문에서 입력 받음
    });

    //val값을 변화시키는 이벤트를 다룸 ele와 category를 받아서
    const handleChangeVal = (e, category) => {
        //setAddDate는 prev값을 받아서
        setAddDate((prev) => ({ ...prev, [category]: e.target.value }));
    };

    return (
        <Wrapper>
            <Data>
                <div>7월 12일 일정 추가</div>
                <CancelIcon
                    onClick={() =>
                        //엑스 버튼 누르면 모든 모달이 안보이게 됨
                        setIsView(() => ({
                            firstModal: false,
                            emotionModal: false,
                            categoryModal: false,
                        }))
                    }
                />
            </Data>
            <ContentsList>
                <Category>감정 : </Category>
                <CategoryVal
                    onClick={() =>
                        //감정을 누르면 emotionModal창이 보이게 됨!
                        setIsView((prev) => ({ ...prev, emotionModal: true }))
                    }
                    //감정을 선택할 수 있겟지
                    isVal={isView.emotion === ''}
                >
                    {/* 감정이 선택됐다면 선택된 감정을 보여주고, 선택하지 않았다면 '감정을 선택해주세요'라는 글을 보여줌 */}
                    {addDate.emotion ? addDate.emotion : '감정을 선택해주세요'}
                </CategoryVal>
            </ContentsList>
            <ContentsList>
                <Category>분류 : </Category>
                <CategoryVal
                    onClick={() =>
                        //분류를 누르면 categoryModal창이 보이게 됨!
                        setIsView((prev) => ({ ...prev, categoryModal: true }))
                    }
                    //분류를 선택할 수 있겠지
                    isVal={isView.category === ''}
                >
                    {/* 분류가 선택됐다면 선택된 분류를 보여주고, 선택하지 않았다면 '분류를 선택해주세요'라는 글을 보여줌 */}
                    {addDate.category
                        ? addDate.category
                        : '분류를 선택해주세요'}
                </CategoryVal>
            </ContentsList>
            <ContentsList>
                <Category>내용 : </Category>
                <CategoryValInput
                    //여기에서 작성된 내용은 addDate의 contents로 저장되게 됨
                    placeholder="내용을 작성해주세요"
                    value={addDate.contents}
                    //내용을 작성하면 쓴 내용이 바로바로 contents에 저장됨
                    onChange={(e) => handleChangeVal(e, 'contents')}
                />
            </ContentsList>
            <ContentsList>
                <Category>시간 : </Category>
                <CategoryValInput
                    placeholder="소요시간을 작성해주세요 (시간당)"
                    type="number"
                    //여기에 선택된 시간은 바로바로 takedTime에 저장됨
                    onChange={(e) => handleChangeVal(e, 'takedTime')}
                />
            </ContentsList>
            <ButtonWrapper>
                <CustomButton
                    value={addDate.takedTime}
                    onClick={() => alert('서비스 준비중입니다:)')}
                    disabled
                >
                    추가
                </CustomButton>
            </ButtonWrapper>
            {isView.emotionModal && ( //emotionModal이 true일때
                <EmotionModal setIsView={setIsView} setAddDate={setAddDate} /> //EmotionModal을 보여주고 그 모달 내에서 특정 값이 변경되면 상태가 set에 업데이트 됨.
            )}
            {isView.categoryModal && ( //categoryModal이 true일때
                <CategoryModal setIsView={setIsView} setAddDate={setAddDate} /> //CategoryModal을 보여주고 그 모달 내에서 특정 값이 변경되면 상태가 set에 업데이트 됨.
            )}
        </Wrapper>
    );
}
export default ScheduleModal;

const Wrapper = styled.div`
    height: 350px;
    width: 100%;
    left: 0;
    background-color: #cdcbe2;
    position: absolute;
    bottom: 0;
    border-radius: 40px 40px 0 0;
    color: #5d659e;
    padding: 40px 30px;
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
const Data = styled.div`
    font-size: 21px;
    font-weight: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    & > div {
        font-weight: 700;
    }
`;
const ContentsList = styled.div`
    display: flex;
    padding: 11px 0;
    align-items: center;
`;
const Category = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
`;
const CategoryVal = styled.div`
    font-size: 18px;
    cursor: pointer;
    color: #797fab;
    font-weight: ${({ isVal }) => (isVal ? 'bold' : '')};
`;
const CategoryValInput = styled.input`
    background-color: transparent;
    border: none;
    color: #5d659e;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: #797fab;
    }

    font-size: 16px;
    width: 80%;
`;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 10px;
`;
