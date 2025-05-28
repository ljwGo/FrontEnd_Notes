// 数组应该也被视为immutation不变的
const list = [
    {id: 1, name: 'a'},
    {id: 2, name: 'b'},
    {id: 3, name: 'c'},
]

// 使用useImmer更方便
function Cmp(){
    const [list, setList] = useState(list);

    const handleClick = () => {
        // list.slice() 浅拷贝是不行的

        // 针对每个数组对象成员, 都利用展开运算符进行深拷贝
        setList(list.map(ele=>{
            return {...list};
        }));
    }
}
