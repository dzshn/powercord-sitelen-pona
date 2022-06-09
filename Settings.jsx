const { React } = require("powercord/webpack");
const { get } = require("powercord/http");
const {
    ColorPickerInput,
    SelectInput,
    SliderInput,
    SwitchItem,
    TextInput,
} = require("powercord/components/settings");

const sitelen = require("./sitelen.js");
const { FONTS, loadFont } = require("./fonts.js");

module.exports = ({ getSetting, updateSetting, toggleSetting }) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const externalFont = getSetting("externalFont", false);
        const fontSource = externalFont
            ? getSetting("fontUrl", "https://example.com/font.ttf")
            : getSetting("font", "linja sike");
        const fontName = externalFont ? "sitelen-pona-font" : fontSource;

        loadFont(fontSource, externalFont).then(() => {
            sitelen(canvasRef.current, "o sewi e kijetesantakalu", {
                fontColor: "#" + getSetting("fontColor", 0xffffff).toString(16),
                fontSize: getSetting("fontSize", 72),
                font: fontName,
            });
        });
    });

    const fontOptions = FONTS.map((x) => ({ value: x, label: x }));

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
                minValue={14}
                maxValue={108}
                markers={[14, 16, 20, 28, 36, 48, 72, 96, 108]}
                initialValue={getSetting("fontSize", 72)}
                onValueChange={(x) => updateSetting("fontSize", x)}
            >
                Font Size
            </SliderInput>
            <SwitchItem
                value={getSetting("externalFont", false)}
                onChange={() => toggleSetting("externalFont")}
            >
                Use external font
            </SwitchItem>
            {getSetting("externalFont", false) ? (
                <TextInput
                    value={getSetting(
                        "fontUrl",
                        "https://example.com/font.ttf"
                    )}
                    onChange={(x) => updateSetting("fontUrl", x)}
                    required={true}
                >
                    Font URL
                </TextInput>
            ) : (
                <SelectInput
                    options={fontOptions}
                    value={getSetting("font", "linja sike")}
                    onChange={({ value }) => updateSetting("font", value)}
                    rows={1}
                >
                    Font
                </SelectInput>
            )}
        </>
    );
};
