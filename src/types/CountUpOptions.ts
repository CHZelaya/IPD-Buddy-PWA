interface CountUpOptions {
  startVal?: number; // number to start at (0) 开始数值，默认 0
  decimalPlaces?: number; // number of decimal places (0) 小数点 位数
  duration?: number; // animation duration in seconds (2) 动画时长
  useGrouping?: boolean; // example: 1,000 vs 1000 (true) 是否使用千分位
  useIndianSeparators?: boolean; // example: 1,00,000 vs 100,000 (false)
  useEasing?: boolean; // ease animation (true) 是否开启动画过渡，默认动画函数为 easeOutExpo
  smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
  smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
  separator?: string; // grouping separator (',') 千分位分隔符
  decimal?: string; // decimal ('.') 小数点分隔符
  // easingFn: easing function for animation (easeOutExpo) 动画函数
  easingFn?: (t: number, b: number, c: number, d: number) => number;
  formattingFn?: (n: number) => string; // this function formats result 格式化结果
  prefix?: string; // text prepended to result 数值前缀
  suffix?: string; // text appended to result 数值后缀
  numerals?: string[]; // numeral glyph substitution 数字符号替换 0 - 9，例如替换为 [a,b,c,d,e,f,g,h,i,j]
  enableScrollSpy?: boolean; // start animation when target is in view 在可视范围内才开始动画
  scrollSpyDelay?: number; // delay (ms) after target comes into view  目标进入可视范围内后的延迟时间(毫秒)
  scrollSpyOnce?: boolean; // run only once
  onCompleteCallback?: () => any; // gets called when animation completes
}
