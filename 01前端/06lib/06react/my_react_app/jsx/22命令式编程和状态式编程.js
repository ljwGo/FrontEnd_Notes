// 命令时编程
// 你必须一步一步命令你的程序去做事。

// 声明式编程(状态式编程)
// 而在状态式编程中, 你定义程序所有可能的状态, 
// 你只要告诉程序处于什么状态中, 程序会自动帮你完成剩下的工作。并切换到对应的状态

/*
对于独立系统来说，命令式地控制用户界面的效果也不错，
但是当处于更加复杂的系统中时，这会造成管理的困难程度指数级地增长。
如同示例一样，想象一下，当你想更新这样一个包含着不同表单的页面时，
你想要添加一个新 UI 元素或一个新的交互，
为了保证不会因此产生新的 bug（例如忘记去显示或隐藏一些东西），
你必须十分小心地去检查所有已经写好的代码
*/

/*
声明式编程意味着为每个视图状态声明 UI 而非细致地控制 UI（命令式）。
当开发一个组件时：
写出你的组件中所有的视图状态。
确定是什么触发了这些 state 的改变。
通过 useState 模块化内存中的 state。
删除任何不必要的 state 变量。
连接事件处理函数去设置 state。
*/

// 小结
// 自己虽然没有什么实战经验, 但确实写了大量的代码, 而且都是命令式编程, 
// 感觉声明式编程, 更加符合人类思考的方式, 而命令式编程, 更加符合计算机思考的方式。
// 写代码的时候, 还是要多思考, 注重程序的健壮性, 养成好习惯.

// 自己实现的声明式编程
let firstName = 'Jane';
let lastName = 'Jacobs';
let isEditing = false;

function handleFormSubmit(e) {
  e.preventDefault();
  setIsEditing(!isEditing);
}

function handleFirstNameChange(e) {
  setFirstName(e.target.value);
}

function handleLastNameChange(e) {
  setLastName(e.target.value);
}

function setFirstName(value) {
  firstName = value;
  updateDOM();
}

function setLastName(value) {
  lastName = value;
  updateDOM();
}

function setIsEditing(value) {
  isEditing = value;
  updateDOM();
}

function updateDOM() {
  if (isEditing) {
    editButton.textContent = 'Save Profile';
    // TODO: show inputs, hide content
  } else {
    editButton.textContent = 'Edit Profile';
    // TODO: hide inputs, show content
  }
  // TODO: update text labels
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
