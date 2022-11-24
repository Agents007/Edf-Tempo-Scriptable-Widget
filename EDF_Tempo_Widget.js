// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: magic;

// url
const url = `https://particulier.edf.fr/services/rest/referentiel/searchTempoStore?dateRelevant=`;
const urlNB = `https://particulier.edf.fr/services/rest/referentiel/getNbTempoDays?TypeAlerte=TEMPO`;
// end url 

// Date
const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1);
const day = date.getDate();
const resultDate = year + "-" + month + "-" + day;

function DayWeektoday() {
    const date = new Date();
    const today = date.getDay();
    if (today == 1) {
        return "Lundi";
    }
    if (today == 2) {
        return "Mardi";
    }
    if (today == 3) {
        return "Mercredi";
    }
    if (today == 4) {
        return "Jeudi";
    }
    if (today == 5) {
        return "Vendredi";
    }
    if (today == 6) {
        return "Samedi";
    }
    if (today == 0) {
        return "Dimanche";
    }
}
function DayWeektomorrow() {
    const date = new Date();
    const today = date.getDay();
    const tomorrow = today + 1;
    if (tomorrow == 1) {
        return "Lundi";
    }
    if (tomorrow == 2) {
        return "Mardi";
    }
    if (tomorrow == 3) {
        return "Mercredi";
    }
    if (tomorrow == 4) {
        return "Jeudi";
    }
    if (tomorrow == 5) {
        return "Vendredi";
    }
    if (tomorrow == 6) {
        return "Samedi";
    }
    if (tomorrow == 7) {
        return "Dimanche";
    }
}
// End Date

// Tempo color today & tomorrow
const colorajd_data = new Request(`${url + resultDate}`);
const color_Res = await colorajd_data.loadJSON();
const colorajd = color_Res["couleurJourJ"];
const colordem = color_Res["couleurJourJ1"];
// End Tempo color today & tomorrow

// Tempo nombre J couleur
const colorNB_data = new Request(`${urlNB}`);
const colorNB_Res = await colorNB_data.loadJSON();
const colorBleu = colorNB_Res["PARAM_NB_J_BLEU"];
const colorBlanc = colorNB_Res["PARAM_NB_J_BLANC"];
const colorRouge = colorNB_Res["PARAM_NB_J_ROUGE"];
// End Tempo nombre J couleur

// log
// console.log ("la couleur du jour est " + colorajd);
// console.log ("la couleur de demain est " + colordem);
// console.log ("il reste " + colorBleu + " jour bleu");
// console.log ("il reste " + colorBlanc + " jour blanc");
// console.log ("il reste " + colorRouge + " jour rouge");
// end log

// widget
const widget = new ListWidget();
widget.backgroundColor = new Color("#161616");
// end widget

// title
title = widget.addText("Edf Tempo");
title.textColor = Color.white();
title.font = Font.systemFont(20);
title.centerAlignText();
// end title

// default stack
const stack = widget.addStack();
stack.setPadding(12, 0, 0, 0);
stack.layoutHorizontally();
stack.centerAlignContent();
stack.addSpacer(5);
// end default stack

// color today
const colorajdStack = stack.addStack();
colorajdStack.setPadding(20, 30, 20, 30);
colorajdStack.cornerRadius = 8;
colorajdStack.layoutVertically();

if (colorajd == "TEMPO_BLEU") {
    colorajdStack.backgroundColor = Color.blue();
    colorajdStackText = colorajdStack.addText("Jour Bleu");
    colorajdStackText.textColor = Color.white();
}
if (colorajd == "TEMPO_BLANC") {
    colorajdStack.backgroundColor = Color.white();
    colorajdStackText = colorajdStack.addText("Jour Blanc");
    colorajdStackText.textColor = Color.black();
}
if (colorajd == "TEMPO_ROUGE") {
    colorajdStack.backgroundColor = Color.red();
    colorajdStackText = colorajdStack.addText("Jour Rouge");
    colorajdStackText.textColor = Color.white();
}
colorajdStackText.font = Font.systemFont(22);
colorajdStackText.centerAlignText();
colorajdStackTextDay = colorajdStack.addText(DayWeektoday());
colorajdStackTextDay.textColor = Color.white();
colorajdStackTextDay.font = Font.systemFont(16);
colorajdStackTextDay.centerAlignText();
// end color today

// add spacing between today & tomorrow
stack.addSpacer(20);
// end add spacing between today & tomorrow

// color tomorrow
const colordemStack = stack.addStack();
colordemStack.setPadding(20, 30, 20, 30);
colordemStack.cornerRadius = 8;
colordemStack.layoutVertically();

if (colordem == "TEMPO_BLEU") {
    colordemStack.backgroundColor = Color.blue();
    colordemStackText = colordemStack.addText("Jour Bleu");
    colordemStackText.textColor = Color.white();
}
if (colordem == "TEMPO_BLANC") {
    colordemStack.backgroundColor = Color.white();
    colordemStackText = colordemStack.addText("Jour Blanc");
    colordemStackText.textColor = Color.black();
}
if (colordem == "TEMPO_ROUGE") {
    colordemStack.backgroundColor = Color.red();
    colordemStackText = colordemStack.addText("Jour Rouge");
    colordemStackText.textColor = Color.white();
}
if (colordem == "NON_DEFINI") {
    colordemStack.backgroundColor = Color.black();
    colordemStackText = colordemStack.addText("Pas d'info");
    colordemStackText.textColor = Color.white();
}
colordemStackText.font = Font.systemFont(22);
colordemStackText.centerAlignText();
colordemStackTextDay = colordemStack.addText(DayWeektomorrow());
colordemStackTextDay.textColor = Color.white();
colordemStackTextDay.font = Font.systemFont(16);
colordemStackTextDay.centerAlignText();
// end color tomorrow

// number of days remaining
const stackB = widget.addStack();
stackB.layoutHorizontally();
stackB.setPadding(10, 0, 0, 0);
const spaceB = 25;
const spaceE = 51;

stackB.addSpacer(spaceE);

NbcolorBleu = stackB.addText(colorBleu + "/300");
NbcolorBleu.textColor = Color.blue();
NbcolorBleu.font = Font.systemFont(18);

stackB.addSpacer(spaceB);

NbcolorBlanc = stackB.addText(colorBlanc + "/43");
NbcolorBlanc.textColor = Color.white();
NbcolorBlanc.font = Font.systemFont(18);

stackB.addSpacer(spaceB);

NbcolorRouge = stackB.addText(colorRouge + "/22");
NbcolorRouge.textColor = Color.red();
NbcolorRouge.font = Font.systemFont(18);

stackB.addSpacer(spaceE);
// end number of days remaining

// widget refresh
const now = Date.now();
widget.refreshAfterDate = new Date(now + (2 * 60 * 60 * 1000));
// end widget refresh

// Scriptable
Script.complete();
// end Scriptable

// display preview widget
widget.presentMedium();
// end display preview widget