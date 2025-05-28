function App() {
    const style = {
        display: 'block',
        color: 'red',
        fontSize: '12px'
    };
    const className = ["class01", "class02"];
    const display = "none";
    const color = "red";
    
    return (
        <div>
            <h1 style={style}>Hello World</h1>
            <h1 style={{"display":display, "color":color, "fontSize": "18px"}}>Hello World</h1>
            <h1 className={className}>Hello World</h1>
        </div>
    );
}


