function calculate() {
    // 讀取輸入值
    let A = parseFloat(document.getElementById('A').value) || 0;
    let B = parseFloat(document.getElementById('B').value) || 0;
    let C = parseFloat(document.getElementById('C').value) || 0;
    let D = parseFloat(document.getElementById('D').value) || 0;
    let E = parseFloat(document.getElementById('E').value) || 0;
    let result = '';

    // 計算複利後最終資金 (E)
    if (A > 0 && B >= 0 && C > 0 && D > 0 && E === 0) {
        E = A * Math.pow(1 + C, D) + B * ((Math.pow(1 + C, D) - 1) / C);
        result = `複利後最終資金 (E) 為: ${E.toFixed(2)}`;
    }
    // 計算初始資金 (A)
    else if (B >= 0 && C > 0 && D > 0 && E > 0 && A === 0) {
        A = (E - B * ((Math.pow(1 + C, D) - 1) / C)) / Math.pow(1 + C, D);
        result = `初始資金 (A) 為: ${A.toFixed(2)}`;
    }
    // 計算每年投入資金 (B)
    else if (A > 0 && C > 0 && D > 0 && E > 0 && B === 0) {
        B = (E - A * Math.pow(1 + C, D)) / ((Math.pow(1 + C, D) - 1) / C);
        result = `每年投入資金 (B) 為: ${B.toFixed(2)}`;
    }
    // 計算每年投資報酬率 (C)
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
        result = `每年投資報酬率 (C) 為: ${(C * 100).toFixed(2)}%`;
    }
    // 計算經過幾年 (D)
    else if (A > 0 && B >= 0 && C > 0 && E > 0 && D === 0) {
        D = Math.log((E / A) / (1 + B * C / A)) / Math.log(1 + C);
        result = `經過幾年 (D) 為: ${D.toFixed(2)}`;
    }
    // 提示用戶提供正確的輸入值
    else {
        result = '請提供正確的輸入值以進行計算';
    }

    // 顯示結果
    document.getElementById('result').innerText = result;
}