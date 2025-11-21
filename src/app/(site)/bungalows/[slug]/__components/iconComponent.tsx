import React from "react";
import lightPoint from "../../../../../../public/assets/icons/bulb-icon.png";
import fanPoint from "../../../../../../public/assets/icons/fan-icon.png";
import acPoint from "../../../../../../public/assets/icons/ac-icon.png";
import plugPoint from "../../../../../../public/assets/icons/plug-icon.png";
import commode from "../../../../../../public/assets/icons/commode.png";
import chimney from "../../../../../../public/assets/icons/chimney.png";
import faucet from "../../../../../../public/assets/icons/faucet.png";
import shower from "../../../../../../public/assets/icons/shower.png";
import sink from "../../../../../../public/assets/icons/sink.png";
import tap from "../../../../../../public/assets/icons/tap.png";
import twoWaySwitch from "../../../../../../public/assets/icons/twoWaySwitch.png";
import waterTank from "../../../../../../public/assets/icons/water tank.png";


import IconCard from "./iconCard";

const IconSelector = ({ pointName,count }: { pointName: string; count: number }) => {
    switch (pointName) {
        // Electrical
        case "LightPoint":
            return <IconCard url={lightPoint} name="Light Point" count={count} />;
        case "FanPoint":
            return <IconCard url={fanPoint} name="Fan Point" count={count} />;
        case "AcPoint":
            return <IconCard url={acPoint} name="AC Point" count={count} />;
        case "PlugPoint":
            return <IconCard url={plugPoint} name="Plug Point" count={count} />;
        case "ExhaustFanPoint":
            return <IconCard url={fanPoint} name="Exhaust Fan Point" count={count} />;
        case "GeyserPoint":
            return <IconCard url={plugPoint} name="Geyser Point" count={count} />;
        case "ChimneyPoint":
            return <IconCard url={chimney} name="Chimney Point" count={count} />;
        case "TwoWaySwitchPoint":
            return <IconCard url={twoWaySwitch} name="Two Way Switch Point" count={count} />;
        case "MixturePoint":
            return <IconCard url={plugPoint} name="Mixture Point" count={count} />;
        // Plumbing
        case "HealthFaucet":
            return <IconCard url={faucet} name="Health Faucet" count={count} />;
        case "Commode":
            return <IconCard url={commode} name="Commode" count={count} />;
        case "TapPoint":
            return <IconCard url={tap} name="Tap Point" count={count} />;
        case "Shower":
            return <IconCard url={shower} name="Shower" count={count} />;
        case "BasinPoint":
            return <IconCard url={tap} name="Basin Point" count={count} />;
        case "SinkPoint":
            return <IconCard url={sink} name="Sink Point" count={count} />;
        case "OverHeadWaterTank":
            return <IconCard url={waterTank} name="Over Head Water Tank" count={count} />;
    }
};

export default IconSelector;
