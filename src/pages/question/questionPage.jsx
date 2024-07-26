import styled from 'styled-components';
import Background from '../../assets/Img/backgroundImg/calendar&question.png';
import { BackGroundImg } from '../../styles/common';
import NoneCalendarPage from './components/NoneCalendarPage';
import SelectDate from './components/selectDate';

function QuestionPage() {
    //Data는 아래의 배열안에 들어있는 객체의 형식
    /////////////////////근데 얘는 어디에 쓰는 애지????///////////////////////////
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
    ];
    //return문 안에 작동: testData 배열에 아무것도 없다! => "NoneCalendarPage"페이지를 표시, 배열에 하나라도 들어있다! => "SelectDate" 페이지를 표시
    return (
        <>
            <BackImg>
                {testData.length === 0 ? <NoneCalendarPage /> : <SelectDate />}
            </BackImg>
        </>
    );
}
export default QuestionPage;

const BackImg = styled.div`
    ${BackGroundImg(Background)}
    padding: 72px 30px 0 30px;
`;
