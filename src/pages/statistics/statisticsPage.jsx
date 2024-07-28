import ComparisonWithLastMonth from './components/comparisonWithLastMonth';
import TimeSpent from './components/timeSpent';
import PositiveEmotions from '../statistics/components/positiveEmotions';
import NegativeEmotions from './components/negativeEmotions';
import NeutralEmotions from './components/neutralEmotions';
import EmotionsSummary from './components/emotionsSummary';
import styled from 'styled-components';
// import useScrollFullPage from '../../hooks/useScrollFullPage';

function StatisticsPage() {
    const testData = {
        timeSpent: [
            // 상위5개 + 0시간인 거 빼고
            {
                category: '우울',
                hours: '5',
                percentage: '~',
            },
            {
                category: '즐거움',
                hours: '13',
                percentage: '~',
            },
            {
                category: '화남',
                hours: '10',
                percentage: '~',
            },
            {
                category: '소심',
                hours: '9',
                percentage: '~',
            },
            {
                category: '분노',
                hours: '20',
                percentage: '~',
            },
        ],
        comparisonWithLastMonth: {
            previousCategory: '알바',
            previousMonth: '7',
            previousHours: '57',
            currentCategory: '공부',
            currentMonth: '8',
            currentHours: '62',
        },
        emotionsSummary: [
            {
                type: '긍정',
                count: '18',
            },
            {
                type: '중립',
                count: '10',
            },
            {
                type: '부정',
                count: '3',
            },
        ],
        positiveEmotions: [
            {
                type: '기쁨',
                count: '7',
            },
            {
                type: '사랑',
                count: '3',
            },
            {
                type: '감사',
                count: '1',
            },
            {
                type: '희망',
                count: '2',
            },
            {
                type: '만족',
                count: '5',
            },
            {
                type: '흥분',
                count: '0',
            },
        ],
        negativeEmotions: [
            {
                type: '슬픔',
                count: '7',
            },
            {
                type: '분노',
                count: '3',
            },
            {
                type: '두려움',
                count: '1',
            },
            {
                type: '혐오',
                count: '2',
            },
            {
                type: '실망',
                count: '5',
            },
            {
                type: '불안',
                count: '0',
            },
            {
                type: '외로움',
                count: '1',
            },
            {
                type: '질투',
                count: '2',
            },
            {
                type: '죄책감',
                count: '5',
            },
            {
                type: '수치심',
                count: '0',
            },
        ],
        neutralEmotions: [
            {
                type: '놀람',
                count: '7',
            },
            {
                type: '무관심',
                count: '3',
            },
            {
                type: '혼란',
                count: '6',
            },
            {
                type: '궁금함',
                count: '7',
            },
            {
                type: '평온',
                count: '3',
            },
            {
                type: '평범함',
                count: '6',
            },
            {
                type: '생각에 잠김',
                count: '6',
            },
        ],
    };

    // scroll event hook fn
    // useScrollFullPage();

    return (
        <Wrapper>
            {/* testData의 timeSpent라는 값을 받아옴 */}
            <TimeSpent data={testData.timeSpent} />
            {/* testData의 ComparisonWithLastMonth라는 값을 받아옴 */}
            <ComparisonWithLastMonth data={testData.comparisonWithLastMonth} />
            {/* testData의 EmotionsSummary라는 값을 받아옴 */}
            <EmotionsSummary data={testData.emotionsSummary} />
            {/* testData의 PositiveEmotions라는 값을 받아옴 */}
            <PositiveEmotions data={testData.positiveEmotions} />
            {/* testData의 NeutralEmotions라는 값을 받아옴 */}
            <NeutralEmotions data={testData.neutralEmotions} />
            {/* testData의 NegativeEmotions라는 값을 받아옴 */}
            <NegativeEmotions data={testData.negativeEmotions} />
        </Wrapper>
    );
}
export default StatisticsPage;

const Wrapper = styled.div`
    /* overflow: hidden; */
    height: 100vh;
    width: 100%;
`;
