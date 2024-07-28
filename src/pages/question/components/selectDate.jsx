import styled from 'styled-components';
import CustomButton from '../../../components/customButton/customButton';
import Star1 from '../../../assets/Img/questionImg/star1.png';
import Star2 from '../../../assets/Img/questionImg/star.png';
import Hami from '../../../assets/Img/questionImg/hamham.png';
import { useState } from 'react';
import { ArrowDowIcon } from '../../../components/icons/icons';
import { useNavigate } from 'react-router-dom';
import { useGetToday } from '../../../hooks/useGetToday';
import ReactCalendar from '../../../components/datePicker/datePicker';

function SelectDate() {
    const navigate = useNavigate();
    //선택할 수 있는 데이터들의 배열
    const testData = ['공부함', '바보', '싸움'];
    //val 이라는 useState 선언. 초기값은 빈 문자열. 선택된 카테고리 저장하는 상태
    const [val, setVal] = useState('');
    //isView라는 useState 선언. 초기값은 false(안보이게)
    const [isView, setIsView] = useState(false);
    //isViewModal이라는 useState 선언. 초기값은 false(안보이게)
    const [isViewModal, setIsViewModal] = useState(false);
    //useGetToday라는 커스텀 훅 호출
    const today = useGetToday();
    //카테고리를 선택했을 때
    const handleClickCategory = (el) => {
        setVal(el); //선택한 카테고리 값을 val 상태에 저장하고
        setIsView(false); //카테고리 선택 메뉴를 false로 다시 바꿈 (안보이게)
    };

    const handleGoChatting = () => {
        if (val === '') alert('사건을 선택해주세요'); //위에서 사건(카테고리)을 선택하지 않았다면(val에 값이 없음), 그럼 '사건을 선택해주세요'라고 alert창이 뜨게 됨
        navigate(`/question/${val}`); //선택한 카테고리가 있다면, 이 페이지로 이동함
    };
    return (
        <Wrapper>
            <TopWrapper>
                <TopBox>
                    오늘, 가장 인상깊었던 <br />
                    사건은 무엇인가요?
                    <StarImg1 src={Star1} alt="" />
                    <StarImg2 src={Star2} alt="" />
                </TopBox>
                <MiddleBox>
                    <HamHam src={Hami} alt="" />

                    <CategoryBox
                        isView={isView} //카테고리 박스 클릭하면 아래 카테고리들이 보이게 됨(드롭다운)
                        onClick={() => setIsView((prev) => !prev)} //isView가 false였으니까 true로 반전 시킴 (현재 상태값을 반전시키는 거)
                    >
                        {/* 현재 val(카테고리) 상태가 뭐인지 알려줌 */}
                        <Category val={val}>
                            {/* val이 빈 문자열이 아니면(값이 존재하면), val을 표시하고, 아니면 '사건을 선택해주세요'를 표시함 */}
                            {val ? val : '사건을 선택해주세요.'}
                            {/* rotate: 회전 각도 지정. isView의 상태에 따라 각도 지정. isView가 true면 아이콘이 180도 회전(아래표시, 드롭다운 열림), false면 0도(위표시, 드롭다운 닫힘) */}
                            <ArrowDowIcon rotate={isView ? '180' : '0'} />
                        </Category>
                    </CategoryBox>
                    {isView && ( //isView가 true일 때 카테고리들이 표시됨
                        <CategoryWrapper>
                            {testData.map(
                                (
                                    el,
                                    idx, //testData 배열을 돌면서 요소를 받아. idx를 키로 사용(공부함, 바보, 싸움)
                                ) => (
                                    <CategoryBox key={idx}>
                                        {/* 박스 클릭하면 카테고리 이름을 map함수에 전달 */}
                                        <Category
                                            onClick={() =>
                                                handleClickCategory(el)
                                            }
                                        >
                                            {el}
                                        </Category>
                                    </CategoryBox>
                                ),
                            )}
                        </CategoryWrapper>
                    )}
                </MiddleBox>
            </TopWrapper>
            {/* isViewModal이 true이면, ReactCalendar로 감 */}
            {isViewModal && <ReactCalendar url={'/questionSum/'} />}

            <BottomBox>
                {/* '대화하러' 버튼 누르면 handleGoChatting 함수로 감 */}
                <CustomButton icon={'right'} onClick={handleGoChatting}>
                    대화하러
                </CustomButton>
                {/* '이전 대화 보기' 버튼 누르면 setIsViewModal 실행, true => false 나 false => true로 값 바뀜. */}
                <CustomButton
                    icon={'right'}
                    onClick={() => setIsViewModal((prev) => !prev)}
                >
                    이전 대화 보기
                </CustomButton>
            </BottomBox>
        </Wrapper>
    );
}
export default SelectDate;
const Wrapper = styled.div`
    width: 100%;
    height: 70vh;
`;
const TopWrapper = styled.div`
    height: 100%;
`;
const TopBox = styled.h2`
    margin-top: 20px;
    width: 245px;
    height: 118px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 22px;
    padding-left: 16px;
    color: #5a639c;
    position: relative;
    top: 0px;
`;

const StarImg1 = styled.img`
    position: absolute;
    right: -5px;
    top: -10px;
`;

const StarImg2 = styled.img`
    position: absolute;
    right: -10px;
    top: 25px;
    width: 21px;
`;

const MiddleBox = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const CategoryBox = styled.div`
    width: 100%;
    height: 48px;
    background-color: #5e5b88c8;
    border-radius: ${({ isView }) => (isView ? '10px 10px 0 0 ' : '10px')};
    cursor: pointer;
`;

const CategoryWrapper = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    & > div {
        border-radius: 0;
    }
    & > div:last-child {
        border-radius: 0 0 10px 10px;
    }
`;
const HamHam = styled.img`
    width: 125px;
    height: 143px;
    margin-bottom: 30px;
`;

const Category = styled.div`
    font-size: 16px;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    color: ${({ val }) => (val ? 'white' : '#cccccc')};
`;
const CategoryList = styled.div``;

const BottomBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    & > * {
        margin-bottom: 14px;
    }
`;
