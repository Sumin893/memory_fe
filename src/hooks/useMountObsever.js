import { useEffect, useRef, useState } from 'react';

////////////////////////여기 다시오자////////////////////////////////
export const useMountObsever = (targetRef) => {
    //useMountObserver는 targetRef를 매개변수로 받음
    const [isView, setIsView] = useState(false); // isView라는 useState 선언. 초기값은 false
    const observer = useRef();

    //useEffect 관련 "https://heeeming.tistory.com/entry/React-React-hooks-%EC%A0%95%EB%A6%AC-part1-useState-useEffect-useRef-useContext-Context-API"

    useEffect(() => {
        if (!observer.current) {
            const observerCallback = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsView(true); //entry.isIntersecting이 true면, setIsView를 true로 상태를 업뎃함
                    }
                });
            };

            observer.current = new window.IntersectionObserver(
                observerCallback,
                {
                    threshold: 0,
                },
            );
        }

        if (targetRef.current) {
            observer.current.observe(targetRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [targetRef]);
    return isView;
};
