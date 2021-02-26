import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";


interface CountDownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCountDown: () => void
    resetCountdown: () => void
}
interface CountDownProviderProps {
    children: ReactNode
}

export const CountDownContext = createContext({} as CountDownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountDownProvider({ children }: CountDownProviderProps) {
    const { startNewChallenge } = useContext(ChallengeContext)
    const CYCLE_SIZE = 0.1
    const MINIMUM_UNIT_OF_TIME = 60
    const [time, setTime] = useState(CYCLE_SIZE * MINIMUM_UNIT_OF_TIME);
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHashFinished] = useState(false)

    const minutes = Math.floor(time / MINIMUM_UNIT_OF_TIME);
    const seconds = time % MINIMUM_UNIT_OF_TIME;

    function startCountDown() {
        setIsActive(true)
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(CYCLE_SIZE * MINIMUM_UNIT_OF_TIME)
        setHashFinished(false)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHashFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountdown
        }}>
            {children}
        </CountDownContext.Provider>
    )
}