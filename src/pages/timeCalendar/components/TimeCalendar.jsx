import styled from 'styled-components';
import GlassmorphismModal from '../../../components/glassmorphismModal/glassmorphismModal';

//TimeCalendarPage라는 컴포넌트 선언. timeCalendarPage에 있는 testData를 props로 받아옴
const TimeCalendarPage = ({ testData }) => {
    return (
        <>
            <GlassmorphismModal>
                <Header>
                    <Emotion>감정</Emotion>
                    <Case>분류</Case>
                    <Content>내용</Content>
                    <Hour>시간</Hour>
                </Header>
                <AllContents>
                    {/* testData를 map을 돌려서 idx값을 가져옴. 아직은 완료 안됐으니까 준비중 alert를 띄움 */}
                    {testData.map((el, idx) => (
                        <Contents key={idx} onClick={() => alert('준비중:)')}>
                            <Emotion>
                                <EmotionEmoji>😲</EmotionEmoji>
                                <EmotionContent>{el.emotion}</EmotionContent>
                            </Emotion>
                            <Case>{el.category}</Case>
                            <Content>{el.contents}</Content>
                            <Hour>{el.takedTime}h</Hour>
                        </Contents>
                    ))}
                </AllContents>
            </GlassmorphismModal>
        </>
    );
};

export default TimeCalendarPage;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    color: #f8f9fe;
    font-size: 16px;
    font-weight: 700;
    width: 90%;
    margin-bottom: 10px;
    text-align: center;
`;
const Emotion = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Case = styled.div`
    max-width: 20%;
    min-width: 20%;
`;
const Content = styled.div`
    width: 50%;
`;
const Hour = styled.div`
    width: 10%;
`;

const AllContents = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    font-size: 16px;
    text-align: center;
    color: white;
    flex-direction: column;
    justify-content: center;
`;
const Contents = styled.div`
    display: flex;
    width: 100%;
    padding: 13px 0;
    align-items: center;
`;
const EmotionEmoji = styled.div``;

const EmotionContent = styled.div``;
