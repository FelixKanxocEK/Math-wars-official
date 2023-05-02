import React, { useState } from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Ken from '../../images/characters/ken.png'
import { positions } from '@mui/system';

let position = 250;
let interval = 100;

let Image;

function stopAnimate() {
    clearInterval(Image)
}

function animatedSprite() {
    Image = setInterval(() => {
        document.getElementById(Ken).style.backgroundPosition = `-${position}px 0px`;

        if (position < 536) {
            position = position + 56;
        } else {
            position = 56;
        }
    }, interval);
}



const Example = () => {



    const [color, setColor] = React.useState();
    return (
        <>
            <p id="image" onMouseOver={animatedSprite} onMouseOut={stopAnimate()}></p>
        </>

    )
}

export default Example