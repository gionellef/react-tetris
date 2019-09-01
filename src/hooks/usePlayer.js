import { useState, useCallback } from 'react';

import { tetrominoS, randomtetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

export const usePlayer = () => {
 const [player, setPlayer] = useState({
   pos: { x: 0, y: 0 },
   tetromino: tetrominoS[0].shape,
   collided: false,
 });

 const rotate = (matrix, dir) => {
  // transpose cols to rows (transpose)
  
 }

 const playerRotate = (stage, dir) => {

 }

 const updatePlayerPos = ({ x, y, collided }) => {
   setPlayer(prev => ({
     ...prev,
     pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
     collided,
   }))
 }
 
 const resetPlayer = useCallback(() => {
  setPlayer({
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: randomtetromino().shape,
    collided: false,
  })
 }, [])

 return [player, updatePlayerPos, resetPlayer];
}