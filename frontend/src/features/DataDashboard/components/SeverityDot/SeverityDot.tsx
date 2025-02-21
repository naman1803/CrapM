import React from 'react';

export interface SeverityDotProps {
    cx: number;
    cy: number;
    severityLevel: string;
}

const SeverityDot: React.FC<SeverityDotProps> = ({ cx, cy, severityLevel }) => {
    switch (severityLevel) {
        case "Low":
            return (
                <image
                    x={cx - 20}
                    y={cy - 20}
                    width={'40'}
                    height={'40'}
                    href="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e5d0c2ab246786ca1d5e_86.png"
                />
            );
        case "Moderate":
            return (
                <image
                    x={cx - 20}
                    y={cy - 20}
                    width={'40'}
                    height={'40'}
                    href="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58bf4a1d9b1b453e5df_91.png"
                />
            );
        case "High":
            return (
                <image
                    x={cx - 20}
                    y={cy - 20}
                    width={'40'}
                    height={'40'}
                    href="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e67f60bd0c05aa29a1d6_70.png"
                />
            );
        case "Critical":
        default:
            return (
                <image
                    x={cx - 20}
                    y={cy - 20}
                    width={'40'}
                    height={'40'}
                    href="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e5760608f3f68cb0b04b_93.png"
                />
            );
    }
};

export default SeverityDot;