// 单向数据流, 只要state不变,value就不会变. 和vue的双向数据绑定不一样
function MyInput() {
    const [text, setText] = useState('');

    function handleChange(e) {
        setText(e.target.value);
    }

    return <input value={text} onChange={handleChange} />;
}

//Error
function MyInputError() {
    const [text, setText] = useState('I am an constant');

    return <input value={text}/>;
}