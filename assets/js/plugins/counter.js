/*!
* jquery.countup.js 1.0.3 (Modified)
*
* Copyright 2016, Adrián Guerra Marrero http://agmstudio.io @AGMStudio_io
* Released under the MIT License
*
* Date: Oct 27, 2016
*/
(function($) {
    "use strict";
    $.fn.countUp = function(options) {
      // Defaults
      var settings = $.extend({
        'time': 2000,
        'delay': 10
      }, options);
  
      return this.each(function() {
        // Store the object
        var $this = $(this);
        var $settings = settings;
  
        var counterUpper = function() {
          if (!$this.data('counterupTo')) {
            $this.data('counterupTo', $this.text());
          }
  
          var time = parseInt($this.data("counter-time")) > 0 ? parseInt($this.data("counter-time")) : $settings.time;
          var delay = parseInt($this.data("counter-delay")) > 0 ? parseInt($this.data("counter-delay")) : $settings.delay;
  
          var divisions = time / delay;
          var num = $this.data('counterupTo');
          var nums = [num];
  
          var isComma = /[0-9]+,[0-9]+/.test(num);
          num = num.replace(/,/g, '');
          var isInt = /^[0-9]+$/.test(num);
          var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
          var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
  
          // Generate list of incremental numbers to display
          for (var i = divisions; i >= 1; i--) {
            var newNum = parseInt(Math.round(num / divisions * i));
            if (isFloat) {
              newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
            }
            if (isComma) {
              while (/(\d+)(\d{3})/.test(newNum.toString())) {
                newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
              }
            }
            nums.unshift(newNum);
          }
  
          $this.data('counterup-nums', nums);
          $this.text('0');
  
          // Counter function
          var f = function() {
            var nums = $this.data('counterup-nums');
            if (Array.isArray(nums) && nums.length) {
              $this.text(nums.shift());
              $this.data('counterup-nums', nums); // update after shift
              setTimeout($this.data('counterup-func'), delay);
            } else {
              $this.removeData('counterup-nums');
              $this.removeData('counterup-func');
            }
          };
  
          $this.data('counterup-func', f);
          setTimeout(f, delay);
        };
  
        // Trigger when element is in view
        $this.waypoint(counterUpper, {
          offset: '100%',
          triggerOnce: true
        });
      });
    };
  })(jQuery);
  