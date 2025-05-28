console.log("demo.js记载了")

window.addEventListener('load', function(){
  this.document.querySelector('div').addEventListener('click', function(){
    // 生成对象
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:8080/api")
    xhr.send()
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if (xhr.status >= 200 && xhr.status<300){
          let img = document.createElement('img')
          img.src = xhr.responseText
          document.body.append(img)
          // console.log(xhr.responseText)
        }
      }
    }
  })
})