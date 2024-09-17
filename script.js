// 定義複利公式
function futureValue(A, B, C, D) {
    return A * Math.pow(1 + C, D) + B * ((Math.pow(1 + C, D) - 1) / C);
}

// 目標函數，用來計算最終資金和目標資金之間的差距
function targetFunction(A, B, C, D, E) {
    return futureValue(A, B, C, D) - E;
}

// 牛頓迭代法來逼近求解時間 D
function calculateTime(A, B, C, E, tol = 1e-6, maxIter = 1000) {
    let D = 1;  // 初始猜測時間
    for (let i = 0; i < maxIter; i++) {
        let fv = futureValue(A, B, C, D);
        let diff = targetFunction(A, B, C, D, E);

        // 對 D 進行數值微分
        let fvDerivative = A * C * Math.pow(1 + C, D - 1) + B * ((Math.pow(1 + C, D) - 1) / C);
        
        // 更新 D
        let D_next = D - diff / fvDerivative;
        
        // 判斷是否收斂
        if (Math.abs(D_next - D) < tol) {
            return D_next;  // 收斂，返回 D
        }
        
        D = D_next;
    }

    return null;  // 沒有收斂
}

// 主計算函數
function calculate() {
    // 讀取輸入值
    let A = parseFloat(document.getElementById('A').value) || 0;
    let B = parseFloat(document.getElementById('B').value) || 0;
    let C = parseFloat(document.getElementById('C').value) || 0;
    let D = parseFloat(document.getElementById('D').value) || 0;
    let E = parseFloat(document.getElementById('E').value) || 0;
    let result = '';

    // 計算複利後最終資金
    if (A > 0 && B >= 0 && C > 0 && D > 0 && E === 0) {
        E = A * Math.pow(1 + C, D) + B * ((Math.pow(1 + C, D) - 1) / C);
        result = `複利後最終資金為: ${E.toFixed(2)}`;
    }
    // 計算初始資金
    else if (B >= 0 && C > 0 && D > 0 && E > 0 && A === 0) {
        A = (E - B * ((Math.pow(1 + C, D) - 1) / C)) / Math.pow(1 + C, D);
        result = `初始資金為: ${A.toFixed(2)}`;
    }
    // 計算每年投入資金
    else if (A > 0 && C > 0 && D > 0 && E > 0 && B === 0) {
        B = (E - A * Math.pow(1 + C, D)) / ((Math.pow(1 + C, D) - 1) / C);
        result = `每年投入資金為: ${B.toFixed(2)}`;
    }
    // 計算每年投資報酬率
    else if (A > 0 && B >= 0 && D > 0 && E > 0 && C === 0) {
        let lowerBound = 0;
        let upperBound = 1;
        let mid, estimatedE;
        const tolerance = 1e-6;

        while (upperBound - lowerBound > tolerance) {
            mid = (lowerBound + upperBound) / 2;
            estimatedE = A * Math.pow(1 + mid, D) + B * ((Math.pow(1 + mid, D) - 1) / mid);

            if (estimatedE < E) {
                lowerBound = mid;
            } else {
                upperBound = mid;
            }
        }
        C = (lowerBound + upperBound) / 2;
        result = `每年投資報酬率為: ${(C * 100).toFixed(2)}%`;
    }
    // 使用牛頓迭代法計算經過幾年
    else if (A > 0 && B >= 0 && C > 0 && E > 0 && D === 0) {
        D = calculateTime(A, B, C, E);
        if (D !== null) {
            result = `經過幾年為: ${D.toFixed(2)}`;
        } else {
            result = '無法計算出經過幾年';
        }
    }
    // 提示用戶提供正確的輸入值
    else {
        result = '請提供正確的輸入值以進行計算';
    }

    // 顯示結果
    document.getElementById('result').innerText = result;
}