export default class Age{
    readonly age: number;
    constructor(age:number) {
        if(age < 0){
            throw new Error("The age can't be less tan 0");
        }
        this.age = age;
    }
}