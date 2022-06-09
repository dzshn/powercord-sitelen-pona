const { Plugin } = require("powercord/entities");
const { getModule, channels } = require("powercord/webpack");

const sitelen = require("./sitelen.js");
const { FONTS, loadFont } = require("./fonts.js");
const Settings = require("./Settings.jsx");

module.exports = class SitelenPona extends Plugin {
    async startPlugin() {
        powercord.api.commands.registerCommand({
            command: "sitelenpona",
            aliases: ["os", "sp"],
            description: "Write a message in sitelen pona!",
            showTyping: true,
            executor: this.handleCommand.bind(this),
        });
        powercord.api.settings.registerSettings("sitelen-pona", {
            category: this.entityID,
            label: "sitelen pona",
            render: Settings,
        });
    }

    async pluginWillUnload() {
        powercord.api.commands.unregisterCommand("sitelenpona");
        powercord.api.settings.unregisterSettings("sitelen-pona");
    }

    async handleCommand(args) {
        const canvas = document.createElement("canvas");
        const externalFont = this.settings.get("externalFont", false);
        const fontSource = externalFont
            ? this.settings.get("fontUrl", "https://example.com/font.ttf")
            : this.settings.get("font", "linja sike");
        const fontColor =
            "#" + this.settings.get("fontColor", 0xffffff).toString(16);
        const fontSize = this.settings.get("fontSize", 72);
        const font = externalFont ? "sitelen-pona-font" : fontSource;

        await loadFont(fontSource, externalFont);

        sitelen(canvas, [...args].join(" "), {
            fontColor,
            fontSize,
            font,
        });
        await canvas.toBlob(this.uploadBlob);
    }

    async uploadBlob(blob) {
        const { promptToUpload } = await getModule(["promptToUpload"]);
        const { getChannel } = await getModule(["hasChannel"]);

        const file = new File([blob], "sitelen-pona.png", {
            type: "image/png",
        });
        promptToUpload([file], getChannel(channels.getChannelId()), 0);
    }
};
