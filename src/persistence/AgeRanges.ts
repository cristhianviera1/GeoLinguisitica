import AgeRange from "./models/AgeRange";
import Age from "./models/Age";

export const ColorsByAgeRange: AgeRange[] = [
    new AgeRange(
        new Age(0),
        new Age(19),
        'rgba(246,122,182,0.8)'
    ),
    new AgeRange(
        new Age(20),
        new Age(29),
        'rgba(102,119,206,0.8)'
    ),
    new AgeRange(
        new Age(30),
        new Age(39),
        'rgba(116,38,1,0.8)'
    ),
    new AgeRange(
        new Age(40),
        new Age(49),
        'rgba(255,170,1,0.8)'
    ),
    new AgeRange(
        new Age(50),
        new Age(59),
        'rgba(115,254,223,0.8)'
    ),
    new AgeRange(
        new Age(60),
        new Age(69),
        'rgba(255,255,255,0.8)'
    ),
    new AgeRange(
        new Age(70),
        new Age(200),
        'rgba(169,168,0,0.8)'
    ),
];