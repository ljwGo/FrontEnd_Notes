window.addEventListener("load", function(){
  document.body.addEventListener("mousemove", function(event){
    this.style.perspectiveOrigin = `${event.pageX}px ${event.pageY}px`;
  });
});