const readFile = require("util").promisify(require("fs").readFile);
const { join: joinPath } = require("path");

const fontFiles = {
    "Fairfax HD": "fairfax-hd.ttf",
    Fairfax: "fairfax.ttf",
    "linja ante": "linja-ante.ttf",
    "linja luka": "linja-luka.otf",
    "linja pi tomo lipu": "linja-pi-tomo-lipu.ttf",
    "linja pimeja pona": "linja-pimeja-pona.otf",
    "linja pimeja": "linja-pimeja.ttf",
    "linja pona": "linja-pona.otf",
    "linja sike": "linja-sike.otf",
    "linja suwi": "linja-suwi.otf",
    "linja wawa": "linja-wawa.ttf",
    "nasin nanpa": "nasin-nanpa.otf",
    "nasin sitelen pu mono": "nasin-sitelen-pu-mono.otf",
    "sitelen Kotopon": "sitelen-kotopon.otf",
    "sitelen Latin": "sitelen-latin.ttf",
    "sitelen poka / sitelen luka tu tu": "sitelen-luka-tu-tu.otf",
    "sitelen pona kiwen": "sitelen-pona-kiwen.ttf",
    "sitelen pona pona": "sitelen-pona-pona.otf",
    "sitelen telo Momo": "sitelen-telo-momo.ttf",
    "sitelen telo": "sitelen-telo.otf",
    "insa pi supa lape": "supa-lape.otf",
    "Unifont CSUR": "unifont-csur.otf",
};

module.exports = {
    FONTS: Object.freeze(Object.keys(fontFiles)),
    async loadFont(fontSource, external) {
        let font;
        if (external) {
            font = new FontFace(
                "sitelen-pona-font",
                `url(${encodeURI(fontSource)})`
            );
        } else {
            font = new FontFace(
                fontSource,
                await readFile(
                    joinPath(__dirname, "nasin-sitelen", fontFiles[fontSource])
                )
            );
        }

        await font.load();
        document.fonts.add(font);
    },
};
