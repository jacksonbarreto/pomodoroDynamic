import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function CountDown() {
    const { startNewChallenge } = useContext(ChallengeContext)
    const CYCLE_SIZE = 0.1
    const MINIMUM_UNIT_OF_TIME = 60
    const [time, setTime] = useState(CYCLE_SIZE * MINIMUM_UNIT_OF_TIME);
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHashFinished] = useState(false)

    const minutes = Math.floor(time / MINIMUM_UNIT_OF_TIME);
    const seconds = time % MINIMUM_UNIT_OF_TIME;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown() {
        setIsActive(true)
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(CYCLE_SIZE * MINIMUM_UNIT_OF_TIME)
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
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>

            </div>
            {
                hasFinished ?
                    (
                        <button
                            disabled

                            className={styles.countDownButton}

                        >
                            Ciclo encerrado

                        </button>
                    )
                    :
                    (
                        <>
                            {
                                isActive ?
                                    (
                                        <button
                                            type="button"
                                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                                            onClick={resetCountdown}
                                        >
                                            Abandonar ciclo

                                        </button>
                                    ) :
                                    (
                                        <button
                                            type="button"
                                            className={styles.countDownButton}
                                            onClick={startCountDown}
                                        >
                                            Iniciar um ciclo

                                        </button>
                                    )
                            }
                        </>
                    )

            }




        </div>
    );
}