//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    // JSON.stringify нужен, чтобы разные аргументы не давали одинаковый хеш
    let hash = md5(JSON.stringify(args));
    let objectInCache = cache.find((item) => item.hash === hash);

    if (objectInCache) {
      console.log('Из кеша: ' + objectInCache.value);
      return 'Из кеша: ' + objectInCache.value;
    }

    let result = func(...args);
    cache.push({ hash: hash, value: result });

    if (cache.length > 5) {
      cache.shift();
    }

    console.log('Вычисляем: ' + result);
    return 'Вычисляем: ' + result;
  }

  return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;

  function wrapper(...args) {
    wrapper.allCount++;

    if (timeoutId) {
      clearTimeout(timeoutId);
    } else {
      // только самый первый вызов выполняется сразу
      func(...args);
      wrapper.count++;
    }

    timeoutId = setTimeout(() => {
      func(...args);
      wrapper.count++;
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}
