let obj = {};
let ageValue = 10;
Object.defineProperty(obj,'age',{
    //value:20,
    get(){
        return ageValue;
    },
    set(newValue){
        ageValue=newValue
        return ageValue;
    }
});
console.log(obj.age);
obj.age = 30;
console.log(obj.age);