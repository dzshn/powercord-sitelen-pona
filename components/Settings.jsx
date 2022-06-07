const { React } = require("powercord/webpack");
const { ColorPickerInput } = require("powercord/components/settings");

module.exports = ({ getSetting, updateSetting, toggleSetting }) => (
    <div>
        <ColorPickerInput
            onChange={(x) => updateSetting("textColor", x)}
            defaultValue={getSetting("textColor", "ffffff")}
        >
            Text Color
        </ColorPickerInput>
    </div>
);
