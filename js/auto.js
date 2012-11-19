(function ($) {
  $.fn.autoShowImage = function (option) {
    var $this = $(this);
    init();
    
    function init() {
      if(!option.labels || option.labels.length < 2){
        return;
      }
      option.count = option.labels.length;
      option.labels.each(function (index) {
        $(this).bind("mouseover", function () {
          option.stop = true;
          start(this, index);
        });
        $(this).bind("mouseout", function () {
          option.stop = false;
        });
      });
      
      $this.bind("mouseover", function () {
        option.stop = true;
      }).bind("mouseout", function () {
        option.stop = false;
      });
      option.currentIndex = 0;
      if (option.auto) {
        setInterval(auto, 5000);
      }
    }
    function auto() {
      if (!option.stop) {
        option.currentIndex = option.currentIndex == (option.count - 1) ? 0 : ++option.currentIndex;
        start(option.labels[option.currentIndex], option.currentIndex);
      }
    }
    function start(obj, index) {
      option.labels.each(function () {
        this.className = "";
      });
      obj.className = option.className;
      option.currentIndex = index;
      scroll();
    }
    function scroll() {
      clearInterval(option.timer);
      option.timer = setInterval(function () {
        var currentDistance = option.currentIndex * option.len - $this.scrollLeft();        
        var diff = 0;
        if(currentDistance > option.len){
          diff = currentDistance - option.len;    
        }else if(currentDistance < -option.len){
          diff = currentDistance + option.len;  
        }else{
          diff = currentDistance * 0.1; 
        }             
        if (diff == 0) {
          clearInterval(option.timer);
        }
        $this.scrollLeft($this.scrollLeft() + (diff > 0 ? Math.ceil(diff) : Math.floor(diff)));
      }, 20);
    }
  };
})(jQuery);