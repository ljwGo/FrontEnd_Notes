/*
重新渲染列表时，React 获取每个列表项的 key 并搜索前一个列表的项以查找匹配的 key。
如果当前列表有一个之前不存在的 key，React 会创建一个组件。
如果当前列表缺少前一个列表中存在的 key，React 会销毁前一个组件。
如果两个 key 匹配，则落子相应的组件。
key 告诉 React 每个组件的身份，这使得 React 可以在重新渲染时保持 state。
如果组件的 key 发生变化，组件将被销毁，新 state 将重新创建。
key 是 React 中一个特殊的保留属性。
创建元素时，React 提取 key 属性并将 key 直接存储在返回的元素上。
尽管 key 看起来像是作为 props 传递的，但 React 会自动使用 key 来决定要更新哪些组件。
组件无法询问其父组件指定的 key。
强烈建议你在构建动态列表时分配适当的 key。
如果你没有合适的 key，你可能需要考虑重组你的数据，以便你这样做。
如果没有指定 key，React 会报错，默认使用数组索引作为 key。
在尝试重新排序列表项或插入/删除列表项时，使用数组索引作为 key 是有问题的。
(标签内容没有变化,但是位置变化了,react会认为这是一个删除和新增的操作)
显式传递 key={i} 可以消除错误，但与数组索引有相同的问题，在大多数情况下不推荐使用。
key 不需要是全局唯一的；它们只需要在组件及其同级组件之间是唯一的。
*/

function ListItem({arr}){
    const list = arr.map((item) => {
        // 判断逻辑在js中
        if (item.id === 1){
            return <li key={item.id}>I am {item.value}</li>
        }
        return 
        <li key={item.id}>
            {item.value}
        </li>
    })
    return <ul>{list}</ul>
}

// Warning: Each child in a list should have a unique "key" prop.
function ListItemError({arr}){
    const list = arr.map((item) => {
        // 判断逻辑在js中
        return 
        <li>
            {item.value}
        </li>
    })
    return <ul>{list}</ul>
}

const arr = [
    {id: 1, value: 'a'},
    {id: 2, value: 'b'},
    {id: 3, value: 'c'},
]

// 如何设定 key 值 
// 不同来源的数据往往对应不同的 key 值获取方式：
// 来自数据库的数据： 如果你的数据是从数据库中获取的，那你可以直接使用数据表中的主键，因为它们天然具有唯一性。
// 本地产生数据： 如果你数据的产生和保存都在本地（例如笔记软件里的笔记），那么你可以使用一个自增计数器或者一个类似 uuid 的库来生成 key。
// key 需要满足的条件 
// key 值在兄弟节点之间必须是唯一的。 不过不要求全局唯一，在不同的数组中可以使用相同的 key。
// key 值不能改变，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。
// React 中为什么需要 key？ 
// 设想一下，假如你桌面上的文件都没有文件名，取而代之的是，你需要通过文件的位置顺序来区分它们———第一个文件，第二个文件，以此类推。也许你也不是不能接受这种方式，可是一旦你删除了其中的一个文件，这种组织方式就会变得混乱无比。原来的第二个文件可能会变成第一个文件，第三个文件会成为第二个文件……