import styled from 'styled-components';
import { BackGroundImg } from '../../styles/common';
import Background from '../../assets/Img/backgroundImg/calendar&question.png';
import NoneTimeCalendarPage from './components/NoneTimeCalendarPage';
import TimeCalendar from './components/TimeCalendar';
import { CalendarIcon, PlusIcon } from '../../components/icons/icons';
import ScheduleModal from './components/scheduleModal';
import { useState } from 'react';
import ReactCalendar from '../../components/datePicker/datePicker';
import { useSearchParams } from 'react-router-dom';
import { useGetToday } from '../../hooks/useGetToday';

//TimeCalendarPage라는 함수형 컴포넌트 선언
function TimeCalendarPage() {
    //useSearchParams: 현재 위치의 쿼리 매개변수(쿼리 문자열)에 대한 데이터를 읽고 수정하는 데 사용하는 react-router-dom 라이브러리에서 제공하는 훅(처음에 커스텀 훅인줄 알았음 근데 import된거에 react-router-dom으로 되어있어서 검색을 통해 알게 됨.)
    //활용예시엔 대표적으로 3가지 : 1.검색기능 구현, 2.필터링 및 정렬, 3.공유 url생성. (아마 여기선 2번으로 쓰인 게 아닐까 생각해본다)
    //searchParams 변수에는 현재 쿼리 문자열이 {key : value} 형식으로 저장되어 있으며  get 메서드에 '키'를 전달하면 해당 키의 value을 읽어서 출력해준다. => get 메서트에 key전달하기!!
    //searchParams: 현재 쿼리 스트링을 나타내는 객체, setSearchParams: 쿼리 스트링을 변경하는 함수
    //쿼리스트링이 기억이 안난다면 구글링해보기!(url에서 ? 다음에 나오는 key=value의 형태의 문자열임)
    const [searchParams, setSearchParams] = useSearchParams();
    let currentDate = searchParams.get('date') //쿼리 매개변수에서 'date'라는 키에 해당하는 값을 가져와.
        ? searchParams.get('date') //만약 searchParams.get('date')가 true면 그 값을 currentDate에 할당함
        : useGetToday(); //그 값이 false(틀리면)라면 useGetToday()함수를 호출해서 반환된 값을 currentDate에 할당함

    //date값이 존재하면 그 값을 currentDate에 바로 할당하고 존재하지 않으면 useGetToday()함수를 호출해서 오늘 날짜를 받아와서 currentDate에 할당한다는 것 같음

    const testData = [
        {
            recordId: '2',
            emotion: '짜증',
            category: '친구',
            contents: '태기랑 주먹다짐했다.',
            takedTime: '2',
        },
        {
            recordId: '3',
            emotion: '기쁨',
            category: '친구',
            contents: '태기랑 화해했다.',
            takedTime: '1',
        },
        {
            recordId: '3',
            emotion: '기쁨',
            category: '친구',
            contents: '태기랑 밥먹었다.',
            takedTime: '11',
        },
        {
            recordId: '3',
            emotion: '기쁨',
            category: '친구',
            contents: '태기랑 놀았다.',
            takedTime: '1',
        },
    ];

    //isView라는 useState선언. 초기값은 모든 모달이 안보이는, false값인 상태를 담은 객체
    const [isView, setIsView] = useState({
        firstModal: false,
        emotionModal: false,
        categoryModal: false,
        dateModal: false,
    });

    //modalCloseFn 컴포넌트 선언 (dateModal 값을 변경하기 위함(모달 창을 열고 닫을 때 많이 쓴대))
    const modalCloseFn = () => {
        setIsView((prev) => ({
            //setIsView를 업뎃함 prev를 기준으로
            ...prev, //spread 연산자 사용해서 firstModal, emotionModal, categoryModal, dateModal 전체의 prev 속성을 가져옴. (특정 키값만 변경하고 싶어서 쓰는 거!)
            dateModal: !prev.dateModal, //dateModal의 이전 값이 true면 dateModal을 보여주지 않고(false고), dateModal값이 false이면 dateModal을 보여줌(true고)
        }));
    };

    //*월 *일의 하루를 기록해 볼까요? 이 부분
    //=> split하기. currentDate가 '2024-08-03'이면 split하면 ['2024', '08', '03'] 이렇게 되고, 순서대로 0,1,2번의 인덱스임. 그래서 월을 가저오기 위해 [1], 일을 가져오기 위해 [2]를 사용해서 가져옴

    return (
        <>
            <BackImg>
                <Title>
                    오늘도 하루가 끝났네요. <br />
                    {currentDate && currentDate.split('-')[1]}월
                    {currentDate && currentDate.split('-')[2]}일의 하루를 <br />
                    기록해 볼까요?
                </Title>
                {testData.length === 0 ? ( //testData의 길이가 0이라면
                    <NoneTimeCalendarPage /> //이 페이지 보여주고
                ) : (
                    <TimeCalendar testData={testData} /> //testData에 뭐라도 들어가 있으면 TimeCalendar페이지에 testData를 보여줌
                )}

                <IconWrapper>
                    <FixedIcon>
                        {currentDate === useGetToday() && ( //currentDate와 useGetToday함수에서 받은 날짜가 일치하면! 'PlusIcon'과 'Circle' 아이콘을 보여줌
                            <PlusIcon
                                onClick={() =>
                                    //이 아이콘을 클릭하면 firstModal의 값이 false에서 true로 바뀜
                                    setIsView((prev) => ({
                                        ...prev,
                                        firstModal: true,
                                    }))
                                }
                            />
                        )}
                        <Circle
                            onClick={() =>
                                //이 아이콘을 클릭하면 dateModal이 나타남! (아마 달력인듯)
                                setIsView((prev) => ({
                                    ...prev,
                                    dateModal: !prev.dateModal,
                                }))
                            }
                        >
                            <CalendarIcon />
                        </Circle>
                    </FixedIcon>
                </IconWrapper>

                {isView.dateModal && ( //dateModal의 isView상태가 true인 경우에만, ReactCalendar컴포넌트를 렌더링 함.
                    <ReactCalendar
                        url={'/?date='}
                        modalCloseFn={modalCloseFn}
                    />
                )}
                {isView.firstModal && ( //firstModal의 isView상태가 true인 경우에만 ScheduleModal컴포넌트를 렌더링 함.
                    <ScheduleModal setIsView={setIsView} isView={isView} />
                )}
            </BackImg>
        </>
    );
}
export default TimeCalendarPage;

const BackImg = styled.div`
    ${BackGroundImg(Background)}
    height: 100%;
    width: 100%;
    position: relative;
`;
const Title = styled.div`
    font-size: 21px;
    color: #f8f9fe;
    font-weight: 600;
    text-align: left;
    margin-bottom: 10%;
`;
const FixedIcon = styled.div`
    width: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Circle = styled.div`
    border: 4px solid #ffe9e9;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;
const IconWrapper = styled.div`
    position: fixed;
    bottom: 5%;
    right: 40%;
    @media screen and (max-width: 500px) {
        bottom: 5%;
        right: 10%;
    }
`;
