import React from 'react'
import Marquee from "react-fast-marquee";

export default function HomeMarque() {
    return (
        <Marquee >
            <div className='flex items-center gap-3 text-xl'>
                <p>Selamat datang di Bekaspakai</p>
                <p>Ingin berbagi kebahagiaan?</p>
                <p>atau mencari kesederhanaan?</p>
                <p>atau mencari kesempurnaan?</p>
                <p className='font-bold'>Dari yang lama, jadi lebih berarti. </p>
            </div>
        </Marquee>
    )
}
