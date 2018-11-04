let styleTag = document.createElement("style");
styleTag.classList.add(".styleTag");
document.body.appendChild(styleTag);

function insertAnimation({ el, lang, time, eachCallBack }) {
  this.text = "";
  this.el = el;
  this.lang = lang;
  this.time = time;
  this.eachCallBack = eachCallBack;
}

insertAnimation.prototype = {
  strategy: {
    text: function(el, text) {
      el.innerHTML = text;
    },
    css: function(el, text) {
      styleTag.innerHTML = text;
      el.innerHTML = Prism.highlight(text, Prism.languages.css, "css");
    },
    markdown: function(el, text) {
      el.innerHTML = marked(text);
    }
  },
  constructor: insertAnimation,
  addText: function(newText, lang) {
    return new Promise((res, rej) => {
      let currentLang = lang || this.lang;
      let fn 
      if (!newText) {
        fn = this.strategy[currentLang] || this.strategy["text"];
        fn(this.el, this.text);
        this.eachCallBack(this.el, this.text);
        res();
      } else {
        let count = 0;
        let self = this;
        let timeId = window.setTimeout(function run(){
          if (count < newText.length) {
              self.text += newText[count];
              fn = self.strategy[currentLang] || self.strategy["text"];
              fn(self.el, self.text);
              self.eachCallBack(self.el, self.text);
              count++;
              timeId = window.setTimeout(run,self.time)
            } else {
              res();
            }
      }, self.time);
      }
    });
  }
};

let cssCode = document.querySelector(".styleCode");
let cssCodeWrapper = document.querySelector(".styleEditor");

let insertCss = new insertAnimation({
    el: cssCode,
    lang: "css",
    time: 20,
    eachCallBack: (el, text) => {
      cssCodeWrapper.scrollTop = cssCodeWrapper.scrollHeight;
    }
  });

  
  let testText = `
/*一个黄色的底*/
div.preview {
    background-color: #FFE600;
}
/*画眼睛*/
div.eye {
    background-color: black;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
}

div.eye.left {
    right: 50%;
    margin-right: 65px;
}

div.eye.right {
    left: 50%;
    margin-left: 65px;
}
/*眼白*/
div.eye::after {
    content: "";
    position: absolute;
    background: white;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    left: 6px;
    top: 1px;
    border: 4px solid black;
}
/*鼻子*/
div.nose {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    height: 0px;
    border-top: 7px solid black;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    box-shadow: 0 -1px 0 black;
    top: 26px;
}

div.nose::after {
    content: "";
    position: absolute;
    display: block;
    left: -9px;
    top: -12px;
    width: 18px;
    height: 5px;
    background: black;
    border-top-right-radius: 9px 5px;
    border-top-left-radius: 9px 5px;
}
/*上嘴唇*/
div.upperLip {
    top: 43px;
    position: absolute;
    width: 62px;
    height: 20px;
    background-color: #FFE600;
    border: 2px solid black;
    z-index: 1;
}

div.upperLip.left {
    right: 50%;
    border-top: none;
    border-right: none;
    border-bottom-left-radius: 46px 23px;
    transform: rotate(-25deg);
}

div.upperLip.right {
    left: 50%;
    border-top: none;
    border-left: none;
    border-bottom-right-radius: 46px 23px;
    transform: rotate(25deg);
}

div.mouth {
    position: absolute;
    margin-top: 50px;
    height: 110px;
    width: 165px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
}
/*舌头*/
div.tongue {
    position: absolute;
    width: 100%;
    height: 608px;
    background: #990513;
    border: 3px solid black;
    border-bottom-left-radius: 90px 608px;
    border-bottom-right-radius: 90px 608px;
    bottom: 0px;
    margin-left: -3px;
    overflow: hidden;
}

div.tongue::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #FC4A62;
    bottom: -15px;
}
/*高光*/
div.blush {
    top: 84px;
    position: absolute;
    width: 62px;
    height: 62px;
    border: 2px solid black;
    border-radius: 50%;
    background-color: #f00;
    z-index: 1
}

div.blush.left {
    margin-right: 91px;
    right: 50%
}

div.blush.right {
    margin-left: 91px;
    left: 50%
}
/*完工，哈哈，这个皮卡丘就当送给儿子啦！*/
  `
  insertCss.addText(testText)