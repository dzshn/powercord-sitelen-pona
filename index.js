const { Plugin } = require("powercord/entities");
const { getModule, channels } = require("powercord/webpack");

const Settings = require("./components/Settings.jsx");

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
        const text = [...args].join(" ");
        const lines = text.split("\n");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = "72px nasin-nanpa";

        const metrics = ctx.measureText(text);
        const fontHeight =
            metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

        const line1Metrics = ctx.measureText(lines[0]);
        const line1Ascent = line1Metrics.actualBoundingBoxAscent;
        const line1Height =
            line1Metrics.actualBoundingBoxAscent +
            line1Metrics.fontBoundingBoxDescent;

        const strokeWidth = (72 / 133) * 5 * 2.25;
        const padding = 2 * strokeWidth;

        canvas.width =
            Math.max(lines.map((x) => ctx.measureText(x).width)) + padding;
        canvas.height = fontHeight * (lines.length - 1) + line1Height + padding;

        ctx.font = "72px nasin-nanpa";
        ctx.fillStyle = this.settings.get("textColor", "#ffffff");
        ctx.strokeStyle = "#36393f";
        ctx.lineWidth = strokeWidth;
        ctx.lineJoin = "round";

        lines.map((line, i) => {
            ctx.strokeText(
                line,
                strokeWidth,
                fontHeight * i + padding + line1Ascent
            );

            ctx.fillText(
                line,
                strokeWidth,
                fontHeight * i + padding + line1Ascent
            );
        });

        canvas.toBlob(this.uploadBlob);
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
