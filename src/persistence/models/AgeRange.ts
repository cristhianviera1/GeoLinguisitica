import Age from "./Age";

export default class AgeRange {
    readonly start: Age;
    readonly end: Age;
    readonly color: string;

    constructor(start: Age, end: Age, color: string) {
        if(end < start){
            throw new Error("The end age can't be less than start age");
        }
        this.start = start;
        this.end = end;
        this.color = color;
    }
}