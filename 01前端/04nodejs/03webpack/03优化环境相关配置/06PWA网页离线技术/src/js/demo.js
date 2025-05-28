window.addEventListener('load', function(){
  const div = this.document.querySelector('div');
  div.addEventListener("click", function(){
    div.style.backgroundColor = "green";
  })
})