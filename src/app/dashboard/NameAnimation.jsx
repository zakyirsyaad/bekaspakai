"use client"; // This marks the component as a Client Component

import { TypeAnimation } from 'react-type-animation';

export default function NameAnimation({ name }) {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                `${name}`,
                1000,
                '',
                1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
        />
    );
}
