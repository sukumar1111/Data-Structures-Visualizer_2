// Variable Declaration
const enqueue = document.querySelector(".enqueue");
const dequeue = document.querySelector(".dequeue");
const reset = document.querySelector(".reset");
const bucket = document.querySelector(".main-queue-bucket");
const input = document.querySelector(".text");
const message = document.querySelector(".message");
const messageBox = document.querySelector(".message-box");
const box = document.querySelectorAll(".box");
const queue = [];

// Highlight elements for Python code
const pythonEnqueueCode = document.querySelector(".python-enqueue-code");
const pythonDequeueCode = document.querySelector(".python-dequeue-code");
const pythonFrontCode = document.querySelector(".python-front-code");


const buttonDisable = () => {
    enqueue.disabled = true;
    enqueue.classList.add("disable-button");
    dequeue.disabled = true;
    dequeue.classList.add("disable-button");
    reset.disabled = true;
    reset.classList.add("disable-button");
    input.disabled = true;
};


const buttonEnable = () => {
    enqueue.disabled = false;
    enqueue.classList.remove("disable-button");
    dequeue.disabled = false;
    dequeue.classList.remove("disable-button");
    reset.disabled = false;
    reset.classList.remove("disable-button");
    input.disabled = false;
};

const highlightPythonCode = (codeElement) => {
    codeElement.classList.add("highlight-code");
    setTimeout(() => {
        codeElement.classList.remove("highlight-code");
    }, 2000);
};

enqueue.addEventListener("click", () => {
    if (input.value == "") {
        message.innerHTML = "Please Enter a value.";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    if (queue.length === 5) {
        input.value = "";
        message.innerHTML = "Queue Overflow";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    const itemValue = input.value;
    queue.push(itemValue);

    const element = document.createElement("div");
    element.classList.add("ele");
    element.classList.add("nanni")
    element.innerText = queue[queue.length - 1];
    bucket.appendChild(element);

    box[0].innerHTML = queue[0]; 
    box[1].innerHTML = itemValue; 
    input.value = "";

    element.classList.add("ele-add");
    highlightPythonCode(pythonEnqueueCode);
    buttonDisable();

    setTimeout(() => {
        element.classList.remove("ele-add");
        message.innerHTML = `Item ${itemValue} is Enqueued.`;
        box[3].innerHTML = queue.length; // Queue size
        buttonEnable();
    }, 5000);
});

dequeue.addEventListener("click", () => {
    if (queue.length === 0) {
        messageBox.classList.add("error-message");
        message.innerHTML = "Queue Underflow";
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    const itemValue = queue.shift(); 
    box[2].innerHTML = itemValue; 
    bucket.firstChild.classList.remove("nanni")

    bucket.firstElementChild.classList.add("ele-remove");
    bucket.firstElementChild.classList.add("nani");
    buttonDisable();
    highlightPythonCode(pythonDequeueCode);

    setTimeout(() => {
        bucket.removeChild(bucket.firstElementChild);
        box[0].innerHTML = queue.length > 0 ? queue[0] : ""; 
        message.innerHTML = `Item ${itemValue} is Dequeued.`;
        box[3].innerHTML = queue.length; 
        buttonEnable();
    }, 5000);
});
reset.addEventListener("click", () => {
    while (queue.length > 0) {
        queue.shift(); 
    }

    box[0].innerHTML = ""; 
    box[1].innerHTML = ""; 
    box[2].innerHTML = ""; 
    message.innerHTML = "";

    while (bucket.firstChild) {
        bucket.removeChild(bucket.firstChild);
    }

    box[3].innerHTML = "0"; 
});
