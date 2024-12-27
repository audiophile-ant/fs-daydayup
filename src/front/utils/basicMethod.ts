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

// 根据盒子高度获取代表时间
export function convertMinutesToHoursAndMinutes(minutes: number) {
  const totalMinutes = minutes;
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return {
    hours: hours,
    minutes: remainingMinutes,
  };
}

// 根据时间推算高度
export function convertHoursAndMinutesToHeight(hours: number, minutes: number) {
  // 将小时转换为分钟
  const totalMinutes = hours * 60 + minutes;

  // 根据时间推算高度
  const heightMinutes = totalMinutes;

  return heightMinutes;
}

// 补零函数

export function zeroFill(number: number) {
  return number < 10 ? `0${number}` : `${number}`;
}
