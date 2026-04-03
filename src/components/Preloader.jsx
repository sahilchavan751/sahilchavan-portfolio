import React, { useState, useEffect, useRef } from 'react'

const Preloader = ({ onComplete }) => {
    const [phase, setPhase] = useState('enter') 
    const [progress, setProgress] = useState(0)
    const isExiting = useRef(false)
    
    // Progress animation (drives the load time)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                const remaining = 100 - prev
                const increment = Math.max(0.4, Math.random() * (remaining / 10))
                return Math.min(100, prev + increment)
            })
        }, 30)
        return () => clearInterval(interval)
    }, [])

    // Phase management
    useEffect(() => {
        if (progress >= 100 && !isExiting.current) {
            isExiting.current = true
            setPhase('exit')

            // Wait for exit transition to finish (~800ms)
            const timer = setTimeout(() => {
                onComplete()
            }, 800) 

            return () => clearTimeout(timer)
        }
    }, [progress, onComplete])

    return (
        <div className={`new-preloader ${phase === 'exit' ? 'is-exiting' : ''}`}>
            {/* The SVG from preloader.svg converted to JSX */}
            <svg className="preloader-svg-layer" width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_n_12_5)">
                    <rect width="1920" height="1080" fill="#DBDBDB"/>
                </g>
                <g filter="url(#filter1_d_12_5)">
                    {/* The SC Logo Path with the glow/shimmer applied via fill url */}
                    <path d="M858.06 432.965C869.127 432.965 879.829 433.657 890.164 435.04C900.581 436.342 909.899 438.621 918.118 441.876C926.419 445.05 933.214 449.363 938.504 454.815C943.875 460.268 947.008 467.063 947.903 475.201L916.165 483.99C916.165 479.107 914.497 475.12 911.16 472.027C907.905 468.854 903.551 466.371 898.099 464.581C892.728 462.709 886.543 461.407 879.544 460.675C872.627 459.942 865.465 459.576 858.06 459.576C850.817 459.576 843.696 459.902 836.697 460.553C829.699 461.204 823.392 462.424 817.776 464.215C812.243 466.005 807.767 468.487 804.349 471.661C800.931 474.835 799.222 478.945 799.222 483.99V513.043H947.903V576.275C947.903 581.728 946.683 586.611 944.241 590.924C941.881 595.156 938.585 598.858 934.354 602.032C930.203 605.125 925.239 607.77 919.461 609.967C913.764 612.083 907.579 613.792 900.906 615.094C894.314 616.396 887.356 617.332 880.032 617.901C872.708 618.471 865.384 618.756 858.06 618.756C850.573 618.756 843.208 618.471 835.965 617.901C828.722 617.332 821.845 616.396 815.335 615.094C808.825 613.792 802.762 612.083 797.146 609.967C791.613 607.77 786.73 605.125 782.498 602.032C778.266 598.858 774.848 595.156 772.244 590.924C769.64 586.692 768.053 581.809 767.483 576.275L799.222 567.486C799.222 572.532 800.931 576.642 804.349 579.815C807.767 582.989 812.243 585.471 817.776 587.262C823.392 589.052 829.699 590.273 836.697 590.924C843.696 591.575 850.817 591.9 858.06 591.9C865.465 591.9 872.627 591.575 879.544 590.924C886.543 590.191 892.728 588.93 898.099 587.14C903.551 585.268 907.905 582.745 911.16 579.571C914.497 576.397 916.165 572.369 916.165 567.486V537.701H767.483V475.201C767.483 469.749 768.663 464.947 771.023 460.797C773.465 456.565 776.761 452.903 780.911 449.811C785.143 446.637 790.148 443.992 795.926 441.876C801.704 439.679 807.929 437.929 814.603 436.627C821.357 435.325 828.396 434.389 835.721 433.819C843.126 433.25 850.573 432.965 858.06 432.965ZM1060.94 429.791C1073.23 429.791 1084.87 430.89 1095.85 433.087C1106.84 435.203 1116.4 438.214 1124.54 442.12C1132.76 446.026 1139.27 450.706 1144.07 456.158C1148.87 461.529 1151.27 467.47 1151.27 473.98V495.465H1119.05V483.502C1119.05 480.003 1117.7 476.666 1115.02 473.492C1112.33 470.237 1108.47 467.429 1103.42 465.069C1098.46 462.628 1092.39 460.715 1085.23 459.332C1078.07 457.867 1069.97 457.135 1060.94 457.135C1052.23 457.135 1044.3 457.826 1037.14 459.21C1029.98 460.512 1023.83 462.343 1018.7 464.703C1013.58 467.063 1009.59 469.871 1006.74 473.126C1003.97 476.3 1002.59 479.758 1002.59 483.502V569.684C1002.59 573.264 1003.97 576.642 1006.74 579.815C1009.59 582.989 1013.58 585.756 1018.7 588.116C1023.83 590.395 1029.98 592.226 1037.14 593.609C1044.3 594.911 1052.23 595.562 1060.94 595.562C1069.97 595.562 1078.07 594.871 1085.23 593.487C1092.39 592.022 1098.46 590.11 1103.42 587.75C1108.47 585.39 1112.33 582.664 1115.02 579.571C1117.7 576.397 1119.05 573.102 1119.05 569.684V557.477H1151.27V578.961C1151.27 583.274 1150.17 587.384 1147.98 591.29C1145.78 595.115 1142.69 598.655 1138.7 601.91C1134.79 605.165 1130.07 608.095 1124.54 610.699C1119.09 613.222 1112.98 615.419 1106.23 617.291C1099.56 619.081 1092.39 620.465 1084.74 621.441C1077.09 622.418 1069.16 622.906 1060.94 622.906C1052.72 622.906 1044.79 622.418 1037.14 621.441C1029.49 620.465 1022.28 619.081 1015.53 617.291C1008.86 615.419 1002.75 613.222 997.22 610.699C991.767 608.095 987.047 605.165 983.06 601.91C979.153 598.655 976.102 595.115 973.904 591.29C971.707 587.384 970.608 583.274 970.608 578.961V473.98C970.608 469.667 971.707 465.558 973.904 461.651C976.102 457.745 979.153 454.164 983.06 450.909C987.047 447.654 991.767 444.724 997.22 442.12C1002.75 439.516 1008.86 437.319 1015.53 435.528C1022.28 433.657 1029.49 432.232 1037.14 431.256C1044.79 430.279 1052.72 429.791 1060.94 429.791Z" fill="url(#loopGlowMask)"/>
                </g>
                <defs>
                    <linearGradient id="loopGlowMask" x1="-100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#8A8A8A" />
                        <stop offset="50%" stopColor="#000" />
                        <stop offset="100%" stopColor="#8A8A8A" />
                        <animate attributeName="x1" values="-100%; 200%" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="x2" values="0%; 300%" dur="2s" repeatCount="indefinite" />
                    </linearGradient>

                    {/* Copied from raw SVG: noise and drop shadow filters matching React camelCase rules */}
                    <filter id="filter0_n_12_5" x="0" y="0" width="1920" height="1080" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feTurbulence type="fractalNoise" baseFrequency="10 10" stitchTiles="stitch" numOctaves="3" result="noise" seed="5639" />
                        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                        <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
                        </feComponentTransfer>
                        <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                        <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                        <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                        <feMerge result="effect1_noise_12_5">
                            <feMergeNode in="shape" />
                            <feMergeNode in="color1" />
                        </feMerge>
                    </filter>
                    <filter id="filter1_d_12_5" x="763.483" y="429.791" width="391.789" height="201.115" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_5"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_5" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}

export default Preloader
