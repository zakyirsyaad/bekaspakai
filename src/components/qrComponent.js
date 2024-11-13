'use client'
import { useQRCode } from 'next-qrcode';
import React from 'react';

function QRCodeComponent() {
    const { Canvas } = useQRCode();
    return (
        <div>
            <Canvas
                text={"0002010102##########CO.XENDIT.WWW011893600#######14220002152#####414220010303TTT####015CO.XENDIT.WWW02180000000000000000000TTT52045######ID5911XenditQRIS6007Jakarta6105121606##########3k1mOnF73h11111111#3k1mOnF73h6v53033605401163040BDB"}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                        dark: '#010599FF',
                        light: '#FFBF60FF',
                    },
                }}
            />

        </div>
    );
};

export default QRCodeComponent;
