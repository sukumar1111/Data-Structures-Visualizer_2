let heights = [];
let bars = [];
let barValues = [];
let barSlider = document.getElementById('barSlider');
let n = barSlider.value;
let speedSlider = document.getElementById('speedSlider');
let delay = 375 - speedSlider.value;

let container = document.getElementById('container');
let width = container.offsetWidth;
let height = container.offsetHeight;
let lineWidth = width / n - 1;

let isStopped = true;
let isGenerated = true;
let isSorted = false;



function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomArray() {
  isGenerated = true;
  isSorted = false;
  isStopped = true;
  n = barSlider.value;
  lineWidth = width / n - 1;
  container.innerHTML = '';
  for (let i = 0; i < n; i++) {
    heights[i] = parseInt(getRandomValue(1, height));
    bars.push(document.createElement('div'));
    bars[i].style.width = `${lineWidth}px`;
    bars[i].style.height = `${heights[i]}px`;
    bars[i].style.transform = `translate(${i* lineWidth + i}px)`;
    bars[i].style.backgroundColor = 'white';
    bars[i].className = 'bar';
    container.appendChild(bars[i]);
    if (n <= 60) {
      barValues.push(document.createElement('div'));
      barValues[i].innerHTML = heights[i];
      barValues[i].style.marginBottom = `${heights[i] + 5}px`;
      barValues[i].style.transform = `translate(${i * lineWidth + i}px)`;
      barValues[i].className = 'barValue';
      container.appendChild(barValues[i]);
    }
  }
}
generateRandomArray();

function swap(i, minindex) {
  [heights[i], heights[minindex]] = [heights[minindex], heights[i]];
  [bars[i], bars[minindex]] = [bars[minindex], bars[i]];
  [bars[i].style.transform, bars[minindex].style.transform] = [bars[minindex].style.transform, bars[i].style.transform];
  [barValues[i], barValues[minindex]] = [barValues[minindex], barValues[i]];
  [barValues[i].style.transform, barValues[minindex].style.transform] = [
    barValues[minindex].style.transform,
    barValues[i].style.transform,
  ];
}

function draw(coloredBars, colors) {
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = 'white';
    for (let j = 0; j < coloredBars.length; j++) {
      if (i == coloredBars[j]) {
        bars[i].style.backgroundColor = colors[j];
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SortedAnimation(timeComplexity,timeTaken) {
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = 'lime';
    await sleep(10);
  }
  await sleep(300);
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = 'white';
    await sleep(10);
  }
  document.body.insertAdjacentHTML(
    'beforeend',
    `<p id="timeComplexityMessage">Sorting Completed. Time Complexity: ${timeComplexity} , Time Taken: ${timeTaken} seconds.</p>`
  );
  const messageElement = document.getElementById('timeComplexityMessage');
  messageElement.classList.add("sukumar");

  setTimeout(() => {
    const messageElement = document.getElementById('timeComplexityMessage');
    if (messageElement) {
      messageElement.remove();
    }
  }, 10000);
  
}

async function bubbleSort() {
  const startTime = performance.now();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (isStopped) {
        draw([], []);
        return;
      }
      if (heights[j] > heights[j + 1]) {
        swap(j, j + 1);
      }
      draw([j, j + 1], ['green', 'yellow']);
      await sleep(delay);
    }
  }
  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  draw([], []);
  isSorted = true;
  isStopped = true;
  SortedAnimation("O(n^2)",timeTaken);
}

async function selectionSort() {
  const startTime = performance.now();
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (isStopped) {
        draw([], []);
        return;
      }
      if (heights[j] < heights[minIndex]) {
        minIndex = j;
      }
      draw([i, j, minIndex], ['blue', 'red', 'green']);
      await sleep(delay);
    }
    swap(i, minIndex);
  }
  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  draw([], []);
  isSorted = true;
  isStopped = true;
  SortedAnimation("O(n^2)",timeTaken);
}

async function insertionSort() {
  const startTime = performance.now();

  for (let i = 0; i < n; i++) {
    let key = heights[i];
    for (let j = i - 1; j >= 0 && heights[j] > key; j--) {
      if (isStopped) {
        draw([], []);
        return;
      }
      swap(j, j + 1);
      draw([j, i + 1], ['green', 'red']);
      await sleep(delay);
    }
  }
  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  draw([], []);
  isSorted = true;
  isStopped = true;
  SortedAnimation("O(n^2)",timeTaken);
}

async function mergeSort() {
  const startTime = performance.now();
  for (let curSize = 1; curSize < n; curSize *= 2) {
    for (let start = 0; start < n - 1; start += 2 * curSize) {
      let mid = Math.min(start + curSize - 1, n - 1);
      let end = Math.min(start + 2 * curSize - 1, n - 1);
      let n1 = mid - start + 1;
      let n2 = end - mid;
      let L = [],
        R = [];
      for (let i = 0; i < n1; i++) L.push(heights[start + i]);
      for (let j = 0; j < n2; j++) R.push(heights[mid + 1 + j]);
      let i = 0,
        j = 0,
        k = start;

      let barsIndices = [];
      let barsColors = [];
      for (let i1 = start; i1 <= end; i1++) {
        barsIndices.push(i1);
        barsColors.push('yellow');
      }

      while (i < n1 || j < n2) {
        if (isStopped) {
          draw([], []);
          return;
        }
        if (j == n2 || (i < n1 && L[i] <= R[j])) {
          draw([k, ...barsIndices], ['green', ...barsColors]);
          i++;
        } else {
          for (let i1 = mid + 1 + j; i1 > k; i1--) {
            swap(i1, i1 - 1);
          }
          draw([k, ...barsIndices], ['green', ...barsColors]);
          j++;
        }
        k++;
        await sleep(delay);
      }
    }
  }
  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  draw([], []);
  isSorted = true;
  isStopped = true;
  SortedAnimation("n(log(n))",timeTaken);
}



barSlider.oninput = () => {
  document.querySelector('.sliderValue').innerHTML = `Bars: ${barSlider.value}`;
  generateRandomArray();
};
speedSlider.oninput = () => {
  delay = 375 - speedSlider.value;
};


document.getElementById('generateButton').addEventListener('click', generateRandomArray);
document.getElementById('sortButton').addEventListener('click', () => {
  // get the name of selected sorting algorithm.
  type = document.getElementById('sort_type').value;

  // if there is another sorting visualization going on then return from the function.
  if (!isStopped) return;
  // if recently we used visualization and bars are sorted then generate new unsorted array.
  if (isSorted || !isGenerated) generateRandomArray();

  isGenerated = false;
  
  isStopped = false;

  if (type == 'bubble') bubbleSort();
  else if (type == 'selection') selectionSort();
  else if (type == 'insertion') insertionSort();
  else if (type == 'merge') mergeSort();
});

document.getElementById('stopButton').addEventListener('click', () => {
  isStopped = true;
  document.getElementById('pauseButton').innerHTML = 'Pause';
  // if user presses stop button and random bars is not generated then generate rnadom bars.
  if (!isGenerated && !isSorted) generateRandomArray();
});


