// Variable Declaration
const push = document.querySelector(".push");
const pop = document.querySelector(".pop");
const reset = document.querySelector(".reset");
const bucket = document.querySelector(".main-stack-bucket");
const input = document.querySelector(".text");
const massage = document.querySelector(".massage");
const massageBox = document.querySelector(".massage-box");
const box = document.querySelectorAll(".box");
const stack = [];

// Highlight elements for Python code
const pythonPushCode = document.querySelector(".python-push-code");
const pythonPopCode = document.querySelector(".python-pop-code");
const pythonTopCode = document.querySelector(".python-top-code");

// Disable all buttons
const buttonDisable = () => {
    push.disabled = true;
    push.classList.add("disable-button");
    pop.disabled = true;
    pop.classList.add("disable-button");
    reset.disabled = true;
    reset.classList.add("disable-button");
    input.disabled = true;
};
box.innerHTML=5;

// Enable all buttons
const buttonEnable = () => {
    push.disabled = false;
    push.classList.remove("disable-button");
    pop.disabled = false;
    pop.classList.remove("disable-button");
    reset.disabled = false;
    reset.classList.remove("disable-button");
    input.disabled = false;
};

// Function to highlight the Python code
const highlightPythonCode = (codeElement) => {
    codeElement.classList.add("highlight-code");
    setTimeout(() => {
        codeElement.classList.remove("highlight-code");
    }, 1500);
};

// When the push button will be clicked
push.addEventListener("click", () => {
    dfs()
});
async function dfs() {
    if (input.value == "") {
        massage.innerHTML = "Please Enter a value.";
        massageBox.classList.add("error-massage");
        setTimeout(() => {
            massageBox.classList.remove("error-massage");
        }, 1200);
        return;
    }

    if (stack.length == 5) {
        input.value = "";
        massage.innerHTML = "Stack Overflow";
        massageBox.classList.add("error-massage");
        setTimeout(() => {
            massageBox.classList.remove("error-massage");
        }, 1200);
        return;
    }
    let pp=0;

    const itemValue = input.value;
    const ab = parseInt(itemValue, 10);
    while(stack.length>0 && stack[stack.length-1]<ab){
        pp+=10000
        dell();
       await new Promise((resolve) => setTimeout(resolve, 5600))
    }
    

    
    stack.push(itemValue);

    const element = document.createElement("div");
    element.classList.add("ele");
    element.innerText = stack[stack.length - 1];
    bucket.appendChild(element);

    box[0].innerHTML = stack[stack.length - 1];

    input.value = "";

    element.classList.add("ele-add");
    element.classList.add("nanni");

    buttonDisable();

    // Highlight Python push code
    highlightPythonCode(pythonPushCode);

    setTimeout(() => {
        element.classList.remove("ele-add");
        box[1].innerHTML = itemValue;
        massage.innerHTML = `Item ${stack[stack.length - 1]} is Pushed.`;

        buttonEnable();
    }, 1500);
    
}
function dell(){
    if (stack.length == 0) {
        massageBox.classList.add("error-massage");
        massage.innerHTML = "Stack Underflow";
        setTimeout(() => {
            massageBox.classList.remove("error-massage");
        }, 1200);
        return;
    }
    bucket.lastChild.classList.remove("nanni")
    bucket.lastElementChild.classList.add("ele-remove");
    bucket.lastElementChild.classList.add("nani");

    buttonDisable();

    // Highlight Python pop code
    highlightPythonCode(pythonPopCode);

    setTimeout(() => {
        bucket.removeChild(bucket.lastElementChild);
        
        const itemValue = stack.pop();
        box[2].innerHTML = itemValue;

        if (stack.length == 0) {
            box[0].innerHTML = "";
        } else {
            box[0].innerHTML = stack[stack.length - 1];
        }

        massage.innerHTML = `Item ${itemValue} is Popped.`;

        buttonEnable();
    }, 5000);
}
// When the pop button will be clicked
pop.addEventListener("click", () => {
    dell();
});

// When the reset button will be clicked
reset.addEventListener("click", () => {
    while (stack.length > 0) {
        stack.pop();
    }

    box[0].innerHTML = "";
    box[1].innerHTML = "";
    box[2].innerHTML = "";
    massage.innerHTML = "";

    while (bucket.firstChild) {
        bucket.removeChild(bucket.firstChild);
    }
});
