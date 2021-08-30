function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');
    var oper;
    var calcQueue = [];
    var operStack = [];
    var operPriority = {
      '(': 0,
      ')': 0,
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
    
    var token = '';
    var arr = expr.split('');
    
    for (var char of arr) {
        if (char >= '0' && char <= '9') {
            token += char;
        } else {
            if (token.length) {
                calcQueue.push(token);
                token = '';
            }
            
            if (char in operPriority) {
              
                if (')' == char) {
                    while (operStack.length !== 0) {
                        oper = operStack.pop();
                        if ('(' == oper) {
                            break;
                        }
                        calcQueue.push(oper);
                    }
                    if ('(' !== oper) {
                        throw new Error("ExpressionError: Brackets must be paired");
                    }
                } else {
                    while (operStack.length !== 0 && '(' !== char) {
                        oper = operStack.pop();
                        if (operPriority[char] > operPriority[oper]) {
                            operStack.push(oper);
                            break;
                        }
                        if ('(' !== oper) {
                            calcQueue.push(oper);
                        }
                    }
                    operStack.push(char);
                }
            }
        }
    }
    
    
    if (token.length !== 0) {
      calcQueue.push(token);
      token = '';
    }
    
    if (operStack.length !== 0) {
        while (operStack.length !== 0) {
          oper = operStack.pop();
            if ('(' == oper) {
                throw new Error("ExpressionError: Brackets must be paired");
            }
          calcQueue.push(oper);
          
        }
    }
      
    var calcStack = [];
    var arg1, arg2;
    
    for (token of calcQueue) {
        switch (token) {
        case '+':
            arg2 = calcStack.pop();
            arg1 = calcStack.pop();
            calcStack.push(+arg1 + +arg2);
            break;
        case '-':
            arg2 = calcStack.pop();
            arg1 = calcStack.pop();
            calcStack.push(arg1 - arg2);
            break;
        case '*':
            arg2 = calcStack.pop();
            arg1 = calcStack.pop();
            calcStack.push(arg1 * arg2);
            break;
        case '/':
            arg2 = calcStack.pop();
            arg1 = calcStack.pop();
            if (arg1 == 0 || arg2 == 0) { throw new Error("TypeError: Division by zero."); }
            calcStack.push(arg1 / arg2);
            break;
        default:
            calcStack.push(token);
        }
    }
    
    return calcStack.pop();
}

module.exports = {
    expressionCalculator
}