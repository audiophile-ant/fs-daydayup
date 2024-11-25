// 生成随机背景色
export function getColorCode() {
  let makingColorCode = '0123456789ABCDEF';
  let finalCode = '#';
  for (let counter = 0; counter < 6; counter++) {
    finalCode += makingColorCode[Math.floor(Math.random() * 16)];
  }
  return finalCode;
}

// 生成随机背景色对应字体色
export function getTextColor(bgColor: String) {
  // 移除 '#' 字符
  let color = bgColor.slice(1);

  // 转换为 RGB 格式
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  // 计算背景色的亮度值
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // 根据亮度值决定字体颜色
  if (luminance > 0.5) {
    return 'black';
  } else {
    return 'white';
  }
}
