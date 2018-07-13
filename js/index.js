  var w, h, $babbleBall = document.querySelector(".babbleBall"),
      _babbleBallCon, _colors = [],
      _babbleBallRunTime = 1000 / 60,
      _babbleBallArr = [],
      _mouseTop = 0,
      _mouseLeft = 0;
  ~~ function setSize() {
      window.onresize = arguments.callee;
      w = window.innerWidth;
      h = window.innerHeight;
      $babbleBall.width = w;
      $babbleBall.height = h;
  }();

  _colors = ["#81C2B6", "#8192D6", "#D9B3E6", "#DEF7A1", "#83FCD8"];

  function random(min, max) {
      return Math.random() * (max - min) + min;
  }
  _babbleBallCon = $babbleBall.getContext("2d");

  function Babble() {};
  Babble.prototype = {
      init: function() {
          this.x = random(0, w);
          this.y = random(0, h);
          this.r = random(1, 3);
          this.color = _colors[Math.floor(random(0, 5))];
          this.vx = random(-1, 1);
          this.vy = random(-1, 1);
          this.preR = this.r;
          this.vr = 2;
          this.maxR = 30;
      },
      draw: function() {
          _babbleBallCon.beginPath();
          _babbleBallCon.fillStyle = this.color;
          _babbleBallCon.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          _babbleBallCon.fill();
      },
      move: function() {
          this.x += this.vx;
          this.y += this.vy;
          if ((this.x - this.r) < 0 || (this.x + this.r) > w) {
              this.vx = -this.vx;
          }
          if ((this.y - this.r) < 0 || (this.y + this.r) > h) {
              this.vy = -this.vy;
          }
          var inVertical = Math.abs(this.y - _mouseTop);
          var inHorizontal = Math.abs(this.x - _mouseLeft);
          if ((this.r < this.maxR) && (inVertical < 66) && (inHorizontal < 66)) {
              this.r += this.vr;
          }
          if ((this.r > this.preR) && ((inVertical > 66) || (inHorizontal > 66))) {
              this.r -= this.vr;
              if (this.r < 0) this.r = random(1, 3);
          }
          this.draw();
      }
  }

  function create(num) {
      for (var i = 0; i < num; i++) {
          var _newBabbleBall = new Babble();
          _newBabbleBall.init();
          _newBabbleBall.draw();
          _babbleBallArr.push(_newBabbleBall);
      }
  }
  create(1314);
  setInterval(function() {
      _babbleBallCon.clearRect(0, 0, w, h);
      for (var item of _babbleBallArr) {
          item.move();
      }
  }, _babbleBallRunTime)

  document.body.addEventListener("mousemove", function(e) {
      _mouseTop = e.clientY;
      _mouseLeft = e.clientX;
  });

  function warnYourself() {
      console.log('%c 前端小白者（Me）:UI框架王、插件王、复制粘贴王...', 'color:#009688');
      console.log('%c 哦嚯，完蛋！结果最后前端生涯亡。', 'color:#FF5722');
      console.log('%c =========================================', 'color:#FFB800');
      console.log('%c 二颜（一只徘徊在学习边沿的菜鸡）', 'color:#01AAED');
      console.log("    ");
      console.log('%c 运行时间：' + getCurrDate(), 'color:#D9B3E6');
  }
  warnYourself();

  //获取当前时间
  function getCurrDate() {
      var _date = new Date();
      var _newDate =
          _date.getFullYear() + "年" +
          fullNumber((_date.getMonth() + 1)) + "月" +
          fullNumber(_date.getDate()) + "日 " +
          fullNumber(_date.getHours()) + ":" +
          fullNumber(_date.getMinutes());
      return _newDate;
  }

  function fullNumber(parm) {
      return parm < 10 ? "0" + parm : parm;
  }