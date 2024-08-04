import styled from 'styled-components';
import { CancelIcon } from '../../../components/icons/icons';
import { category } from '../../../constants/category';

//'분류'에 해당하는 모달창
//CategoryModal이라는 함수형 컴포넌트 선언. setIsView와 setAddDate를 props로 받음
function CategoryModal({ setIsView, setAddDate }) {
    //감정을 클릭했을 때 발생하는 이벤트를 처리
    const handleClickEmotion = (el) => {
        //setAddDate의 category를 선택한 애로 저장해줌
        setAddDate((prev) => ({ ...prev, category: el }));
        //setIsView(모달)의 상태를 false로 바꿔서 저장해줌(안보이게)
        setIsView((prev) => ({ ...prev, categoryModal: false }));
    };
    return (
        <Wrapper>
            <Top>
                <CancelIcon
                    color={'black'}
                    onClick={() =>
                        //cancel아이콘 클릭하면 categoryModal이 안보이게!
                        setIsView((prev) => ({ ...prev, categoryModal: false }))
                    }
                />
            </Top>
            <CategoryList>
                {category.map(
                    (
                        el,
                        idx, //category한테 map을 돌려서 el와 idx를 받아옴.
                    ) => (
                        <Category
                            key={idx}
                            onClick={() => handleClickEmotion(el)}
                        >
                            {el}
                        </Category>
                    ),
                )}
            </CategoryList>
        </Wrapper>
    );
}
export default CategoryModal;

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
const Top = styled.div`
    display: flex;
    justify-content: end;
`;

const CategoryList = styled.div`
    text-align: center;
    margin: 10px 0;
`;
const Category = styled.div`
    padding: 6px 0;
    font-size: 16px;
    font-weight: bold;
`;
