[toc]

## class的使用方式

```javascript
class Person{
    // 构造器
    constructor(name, age){
        this.name = name 
        this.age = age
    }
    // 属性
    property = "hello"
    // 方法
    call(){
        console.log("我会说话")
    }
    // 静态成员
    static sleep(){
        console.log('人都会睡觉')
    }

    static height = "124cm"
}

let person = new Person()
console.log(person.age)
console.log(person.call())
console.log(Person.sleep())
console.log(Person.height)
```

## 类的继承

```javascript
class Person{
    // 构造器
    constructor(name, age){
        this.name = name 
        this.age = age
    }
}

class Student extends Person{
    constructor(name, age, task, grade){
        // 调用父类的构造器
        super(name, age)
        this.task = task
        this.grade = grade
    }
}

const stu = new Student('ljw', 19, 'study', '大一')
console.log(stu.name)
console.log(stu.age)
console.log(stu.task)
console.log(stu.grade)
```

## 属性访问限制

```javascript
class Person{
    // 构造器
    constructor(name, age){
        this.name = name 
        this.age = age
    }
}

class Student extends Person{
    constructor(name, age, task, grade){
        // 调用父类的构造器
        super(name, age)
        this.task = task
        this.grade = grade
    }

    // 设置不能够访问年龄 
    get age(){
        return "年龄不详"
    }

    set age(value){
        return value - 1
    }
}

const stu = new Student('ljw', 19, 'study', '大一')
console.log(stu.age)
```