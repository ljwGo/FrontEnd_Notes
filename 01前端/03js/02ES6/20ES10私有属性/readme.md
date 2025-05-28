[toc]

## #开头为私有属性

```javascript
class Female{
    myName = 'lisi';
    #age = 19;
    #height = 20;

    constructor(age){
        this.#age = age
    }

    getAge(){
        return this.#age;
    }
}

const obj = new Female(11)
// 返回结果为undefined
console.log(obj.age)
// 直接编辑器提示错误
// console.log(obj.#age)
console.log(obj.getAge())
```