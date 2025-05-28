[toc]

# 1. role属性

role属性, 可以将不同的标签具有其它标签的一些特性

```html
<div role="checkbox">
  
</div>
```



# 2. aria辅助参数

aria-label的作用类似<label>标签

```html
<button aria-label="screen reader only label"></button>
```

控制特定区域的自定义滚动条 (如果没有aria辅助参数, 就只能使用js进行交互控制)

```html
<div role="scrollbar" aria-controls="main"></div>
<div id="main">
. . .
</div>
```

并且 ARIA 可以使页面的某些部分具有“实时性”，让它们在发生变化时立即通知辅助技术。

```html
<div aria-live="true">
  <span>GOOG: $400</span>
</div>
```

* `aria-describeby`允许将DOM中另一个元素的ID指定为当前元素的标签.

* `aria-owns`此属性既允许我们告知辅助技术应将 DOM 中独立的一个元素视为当前元素的子项，也允许我们以不同顺序重排现有子元素. 例如，如果一个弹出式子菜单在视觉上靠近其父菜单，但不能是其父项的 DOM 子项（否则会影响视觉呈现），您可以使用`aria-owns`将子菜单作为父菜单的子项呈现给屏幕阅读器。

* `aria-posinset`（“在集中的位置”）和`aria-setsize`（“集大小”）用于定义集（例如，列表）中同级元素之间的关系。

例如，如果您要创建某个模态 UI 来阻止对主页面的访问，可以使用`aria-hidden`。 在此情况下，视力正常用户可以看到某种半透明叠层，这表示页面的大部分内容当前无法使用，但屏幕阅读器用户仍可探索页面的其他部分

* `aria-live`允许开发者将某个页面部分标记为“活动”，其意义在于，无论处在什么页面位置，都应立即向用户传达更新，而不是在用户恰好探索该页面部分时再行传达。当元素具有`aria-live`属性时，包含它及其子项的页面部分称作*活动区域*。

例如，活动区域可以是因用户操作而出现的状态消息。 如果消息的重要性足以吸引视力正常用户的注意，也就足以吸引辅助技术用户的注意（通过设置其`aria-live`属性）。

将这个简单`div`

```html
<div class="status">Your message has been sent.</div>
```

与其“活动”版本进行比较：

```html
<div class="status" aria-live="polite">Your message has been sent.</div>
```

`aria-live="polite"`指示辅助技术在完成其当前执行的任何操作后提醒用户这一变化。 它非常适合在事情重要但并不紧急时使用，`aria-live`大多作此用途。

`aria-live="assertive"`指示辅助技术中断其正在执行的操作，立即提醒用户这一变化。 这仅适用于重要并且紧急的更新，例如“您的更改因服务器出错而未予保存；请刷新页面”这样的状态消息，或者因用户操作（如按步进器小部件上的按钮）而直接引发的输入字段更新。

`aria-live="off"`指示辅助技术暂停`aria-live`中断。

* `aria-atomic`表示传达更新时是否应将整个区域作为一个整体加以考虑。 例如，如果某个包括日、月和年的日期小部件具有`aria-live=true`和`aria-atomic=true`，并且用户使用的步进器控件只能更改月份值，则会再次读出日期小部件的完整内容。`aria-atomic`的值可以是`true`或`false`（默认值）。

* `aria-relevant`表示应向用户提供哪些类型的更改。有一些选项可以单独使用，或以令牌列表形式使用。

*additions*，表示任何添加到活动区域的元素都是重要内容。 例如，向现有状态消息日志追加 span 意味着将把该 span 告知用户（假定`aria-atomic`为`false`）。

*text*，表示添加到任何子节点的文本内容都是重要内容。 例如，如果修改自定义文本字段的`textContent`属性，将向用户读出修改后的文本。

*removals*，表示应将移除任何文本或子节点的情况传达给用户。

*all*，意味着所有更改都是重要更改。不过，`aria-relevant`的默认值是`additions text`，这表示如果您不指定`aria-relevant` ，它会将对元素的任何添加动态告知用户，而这很可能是您最想获得的信息。

* `aria-busy`允许您通知辅助技术它应暂时忽略对元素的更改（例如在加载内容时）。 一切就位后，`aria-busy`应设置为 false，以使阅读器的工作正常化。

