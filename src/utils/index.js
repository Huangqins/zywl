export function insertSort(arr) {
  var temp; //temp变量用于临时存储待插入元素
  for (var i = 1; i < arr.length; i++) {
    temp = arr[i];
    //从前往后查找插入位置
    for (var j = i; j > 0 && arr[j - 1] > temp; j--) {
      arr[j] = arr[j - 1]; //将大于temp的arr[j]元素后移
    }
    arr[j] = temp;
  }
}

export function selectSort(arr) {
  var minIndex; //定义minIndex变量用于存储每一趟比较时的最小数的下标
  for (var i = 0; i < arr.length; i++) {
    minIndex = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    //每轮比较后若arr[i]不是我们需要的最小那个数，则进行交换
    if (minIndex != i) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}

export function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      //当第一个数大于第二个时，交换它们
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// 工具方法集
// debounce
export function debounce(fuc, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function() {
    // 距上次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      // 延迟执行被包装函数,使其执行周期最低按照wait的频率执行
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定immediate为true,因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
