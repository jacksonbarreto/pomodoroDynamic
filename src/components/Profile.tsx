import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'

export function Profile() {
    const { level } = useContext(ChallengeContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/13190121?s=460&v=4" alt="Jackson Barreto" />
            <div>
                <strong>Jackson Barreto</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}