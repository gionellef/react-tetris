import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, gameOver);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

	const movePlayer = dir => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0 });
		}
	}

	const startGame = () => {
		// Reset everything	
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	}

	const drop = () => {
		// increase level when player clears 10 rows
		if (rows > (level + 1) * 10) {
			setLevel(prev => prev + 1);

			// increase speed
			setDropTime(1000/(level + 1) + 200);
		}

		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false })
		} else {
			//Game Over
			if (player.pos.y - player.tetromino.length < 1) {
				// console.log("GAME OVER!!!");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	}

	const keyUp = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 40) {
				// console.log("interval on");
				setDropTime(1000 / (level + 1) + 200);
			}
		}
	}

	const dropPlayer = () => {
		// console.log("interval off");
		setDropTime(null);
		drop();
	}
	
	const hardDropPlayer = () => {
		// console.log("hard drop");
		
		
		let pot = 0;
		while (!checkCollision(player, stage, { x: 0, y: pot })) {
			pot += 1;
		}

		updatePlayerPos({ x: 0, y: pot-1, collided: true });
	}

	const move = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 37) { // left
				movePlayer(-1);
			} else if (keyCode === 39) { // right
				movePlayer(1);
			} else if (keyCode === 40) { // down
				dropPlayer();
			} else if (keyCode === 38) { 
				playerRotate(stage, 1);
			} else if (keyCode === 32) {
				hardDropPlayer();
				setDropTime(1000 / (level + 1) + 200)
			}
		}
	}

	useInterval(() => {
		drop();
	}, dropTime)
	
	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage}/>
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<div>
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level + 1}`} />
						</div>
					)}
					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	)
};

export default Tetris;