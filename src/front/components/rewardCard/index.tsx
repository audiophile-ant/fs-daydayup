import React from "react";
import classnames from 'classnames'

import clockIcon from '../../assets/images/icon/clock_black.png'
import styles from './index.scss'
import { rewardStyle } from "./constants";

interface RewardCardProps {
	type: 'blue'|'purple'|'yellow'
}

const RewardCard = ({type}: RewardCardProps) => {
	const [isRotated, setIsRotated] = React.useState(false);

  const onRotate = () => setIsRotated((rotated) => !rotated);
  return (
    <div className={classnames([styles.card, isRotated ? styles.rotated : ''])} onClick={onRotate}>
      <div className={styles.front} style={{ border: `1px solid ${rewardStyle[type][1]}`}}>
				<div />
			</div>
      <div className={styles.back} style={{ background: rewardStyle[type][0], border: `1px solid ${rewardStyle[type][1]}` }}>
				<div className={styles.background}>
					<img src={clockIcon} alt="" />
				</div>
			</div>
    </div>
  )
}

export default RewardCard