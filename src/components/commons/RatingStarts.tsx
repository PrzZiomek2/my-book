import React, {FC, useLayoutEffect, useState} from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { Box } from '@mui/material';

interface RatingStarsProps {
    score: number;
    size?: "small" | "big"
};
 
const RatingStars: FC<RatingStarsProps> = ({score, size = "big"}) => {
    const [renderStars, setRenderStars] = useState<JSX.Element[]>([]);
 
    const ratingPointValue = (Math.floor((score % 1)*1000)/100).toString().charAt(0);
    const scoreRounded = Math.floor(score); 
 
    const gradientChunks = () => new Array(10).fill("x").map((_, i) => {
        const isFilled = i < Number(ratingPointValue);
        return(
            <stop offset={`${(i + 1) * 10}%`} stopColor={isFilled ? "#6169e1" : "#fff"} />
      )}); 
 
    const gradientStar = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size === "small" ? "16" : "22.281"} height={size === "small" ? "16" : "20.707"} viewBox="0 0 22.281 20.707">
            <g id="Warstwa_2" transform="translate(-5.842 -5.661)">
                <defs>
                    <linearGradient id="grad1">
                        {gradientChunks()}
                    </linearGradient>
                </defs>
                <path id="Path_1923" data-name="Path 1923" d="M16.728,5.661,19.6,13.094l8.518-.019L21.705,18.52l3.037,7.848-7.924-5-8.1,5,3.027-7.821-5.9-5.454,8.014-.009Z" stroke="#6169e1" fill="url(#grad1)"/>
            </g>
        </svg>
    );
 
    const ratingStars = () => new Array(5).fill("x").map((_, i) => {
        const isStarMarked = i < Number(scoreRounded);
 
        if(i === Number(scoreRounded) && Number(ratingPointValue)){
            return(
                <div key={i}>
                    {gradientStar()}
                </div>
            )
        }
 
        return(
            <div key={i}>
                 {isStarMarked ? <StarIcon style={{ color: '#6169e1' }} /> : <StarBorderOutlinedIcon style={{ color: '#6169e1' }}/>} 
            </div>
    )});
 
    useLayoutEffect(() => {
        setRenderStars(ratingStars())
    }, [score]);
 
    return(
        <Box sx={{display: "flex"}}>
            {renderStars}
        </Box>
    )
}
 
 
export default RatingStars;
