(function($){
   $.fn.autoShowImage = function(option){
      var $this = $(this);
      
      init();
      
    	function init(){
      	if(option.labels){
         	option.count = option.labels.length;
         	option.labels.each(function(index){
            	$(this).bind("mouseover", function(){
               	option.stop = true;
               	start(this, index);
            	});
            	$(this).bind("mouseout", function(){
                	option.stop=false;
            	});
         	});
      	}
      	
         $this.bind("mouseover", function(){
             option.stop = true;
         }).bind("mouseout", function(){
         	option.stop = false;
         });

         option.currentIndex = 0;
         
         if(option.auto){
            this.autoPlay = setInterval(auto, 3000);
         }
    	};

    	function auto(){
         if(!option.stop){
            option.currentIndex = option.currentIndex == (option.count - 1) ? 0 : ++option.currentIndex;
            start(option.labels[option.currentIndex], option.currentIndex);
         }
    	}

    	function start(obj, index){
       	option.labels.each(function(){
            this.className = "";
          });
          obj.className = option.className;
          option.currentIndex = index;
          scroll();
    	};

    	function scroll(){
         (function(){
            clearInterval(option.timer);
            option.timer=setInterval(function (){
               var diff=(option.currentIndex*option.len - $this.scrollLeft())*0.1;
               console.log("index:" + option.currentIndex);
               $this.scrollLeft($this.scrollLeft() + (diff > 0 ? Math.ceil(diff) : Math.floor(diff)));
               if(diff == 0){
                   clearInterval(option.timer);
               }
            },10);
         })(this);
    	};
   }
})(jQuery);

