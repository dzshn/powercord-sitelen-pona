const { React } = require("powercord/webpack");
const { get } = require("powercord/http");
const {
    ColorPickerInput,
    SelectInput,
    SliderInput,
} = require("powercord/components/settings");

const sitelen = require("./sitelen.js");
const { FONTS, loadFont } = require("./fonts.js");

module.exports = ({ getSetting, updateSetting, toggleSetting }) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const font = getSetting("font", "linja sike");

        loadFont(font, FONTS[font]).then(() => {
            sitelen(canvasRef.current, "o sewi e kijetesantakalu", {
                fontColor: "#" + getSetting("fontColor", 0xffffff).toString(16),
                fontSize: getSetting("fontSize", 72),
                font: font,
            });
        });
    });

    const fontOptions = Object.keys(FONTS).map((x) => ({
        value: x,
        label: x,
    }));

    return (
        <>
            <canvas ref={canvasRef} />
            <ColorPickerInput
                onChange={(x) => updateSetting("fontColor", x)}
                value={getSetting("fontColor", 0xffffff)}
            >
                Font Color
            </ColorPickerInput>
            <SliderInput
                stickToMarkers
                minValue={14}
                maxValue={108}
                markers={[14, 16, 20, 28, 36, 48, 72, 96, 108]}
                initialValue={getSetting("fontSize", 72)}
                onValueChange={(x) => updateSetting("fontSize", x)}
            >
                Font Size
            </SliderInput>
            <SelectInput
                options={fontOptions}
                value={getSetting("font", "linja sike")}
                onChange={({ value }) => updateSetting("font", value)}
                rows={1}
            >
                Font
            </SelectInput>
        </>
    );
};
