import React from 'react';

import { StyledCell } from './styles/StyledCell';
import { tetrominoS } from '../tetrominos';

const Cell = ({ type }) => (
	<StyledCell type={type} color={tetrominoS[type].color} >{console.log("rerender")}</StyledCell>
)

export default React.memo(Cell);