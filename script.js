let result = document.querySelector('.result')
const buttons = document.querySelector('.numbers')
let firstCLick = true
let operators = ['+', '-', '*', '/', '.']
let operator = ['+', '-', '/', '*']
let allButtons= Array.from(buttons.children)
let childs = []
allButtons.forEach( (btn)=>{
    if(operator.includes(btn.value)){
        childs.push(btn)
    }
})

//----------------------------function for to convert it to easy read mode for calculation -------------------------------------
function TOrpn(expression) {
    const precendence = {'+':1, '-':1, '*':2, '/':2}
    let output = []
    let signs = []
    if (expression[0] === '-') {
        expression = '0' + expression
    }
    let tokens = expression.match(/\d+(\.\d+)?|[+\-*/]/g)
    
    for (let token of tokens) {
        if(!isNaN(token)){
            output.push(token)
        }else{
            while (signs.length && precendence[signs[signs.length - 1]] >= precendence[token]) {
                output.push(signs.pop())

            }
            signs.push(token)
        }

    }
    while (signs.length) {
        output.push(signs.pop())
    }
    return output.join(' ')
}

//-----------------------------------------function to evaluate after converting it in easy read mode ---------------------------------------
function rpnToEvaluation(expression) {
    let stack = []
    let tokens = expression.split(' ')

    for(let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token))
        }else{
            b = stack.pop()
            a = stack.pop()
            if(token === '+') stack.push(a+b);
            if(token === '-') stack.push(a-b);
            if(token === '*') stack.push(a*b);
            if(token === '/') stack.push(a/b);
        }
    }
    return stack[0]
}

function calculate(expression) {
    let rpn = TOrpn(expression)
    return rpnToEvaluation(rpn)
}



buttons.addEventListener('click', (event) => {
    let keyPressed = event.target.value
    let display = result.textContent.split(/[\+\-\*\/]/)
    if(result.textContent === '0') {
        if (event.target.value === 'AC' || event.target.value === 'CE' || event.target.value === '/' || event.target.value === '*' || event.target.value === '+' || event.target.value === '0' || event.target.value === '=') {
            result.textContent = '0'       
        }else if (event.target.value === '.') {
            result.textContent = '0.'
        }else {
            result.textContent = ''
            result.textContent += keyPressed
        }
    }else {
        if (event.target.value === 'AC') {
            result.textContent = result.textContent.slice(0, -1)
        }else if (event.target.value === 'CE') {
            result.textContent = '0'
            // console.log(result.textContent)
        }else if (operator.includes(keyPressed)) {
            if (result.textContent[result.textContent.length - 1] === '.') {
                alert('complete the digit with zero or numbers')           
            }else {
                result.textContent += keyPressed
                childs.forEach( (btn)=>{
                btn.disabled = true
                    })
            }
        }else if (event.target.value === '.') {
            if (operator.includes(result.textContent[result.textContent.length - 1])) {
                // alert('enter zero before decimal')
                result.textContent += '0.'
            }else{
                let numHaveDecimal = display.some( (num)=>(num.includes('.')))                
                    if (numHaveDecimal) {
                        alert('Single decimal point is allowed to a Digit')                       
                    }else{
                        result.textContent += keyPressed
                    }                
            }
        }else if (event.target.value === '=') {
            result.textContent = calculate(result.textContent)
        
        }else {
            result.textContent += keyPressed
            childs.forEach( (child)=>{
                child.disabled = false
            })
        }
    }    
})
