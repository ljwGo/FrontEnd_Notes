[toc]

## 构造函数也分"静态"和"对象"

```javascript
function Person(name, age){
    this.name = name
    this.age = age
}

// 定义静态的
Person.a = 'a'
Person.b = 'b'
console.log(Person.a)
console.log(Person.b)

const person = new Person('ljw', 16)
console.log(person.a)
console.log(person.b)

// 支持动态为对象创建新属性和方法, 注意是对函数设置
Person.prototype.a = 'a'
Person.prototype.b = 'b'
console.log(person.a)
console.log(person.b)
```



## 类的继承(组合式)

```javascript
function Person(name, age){
    this.name = name
    this.age = age
}

function Student(name, age, task, grade){
    // 这里很难理解, 类似python中的将本作用域绑定给另外一个类
    Person.call(this, name, age)
    this.task = task
    this.grade = grade
}

const stu = new Student('ljw', 18, 'study', '大一')
```