function calculate() {
    // 讀取所有輸入值
    let A = parseFloat(document.getElementById('A').value) || 0;
    let B = parseFloat(document.getElementById('B').value) || 0;
    let C = parseFloat(document.getElementById('C').value) || 0;
    let D = parseFloat(document.getElementById('D').value) || 0;
    let E = parseFloat(document.getElementById('E').value) || 0;
    let result = '';

    // 計算複利所累計的資金 (E)
    if (A > 0 && B > 0 && C >= 0 && D > 0 && E === 0) {
        E = A * Math.pow(1 + C, D) + B * ((Math.pow(1 + C, D) - 1) / C);
        result = `複利所累計的資金 (E) 為: ${E.toFixed(2)}`;
    }
    // 計算初始資金 (A)
    else if (B > 0 && C >= 0 && D > 0 && E > 0 && A === 0) {
        A = (E - B * ((Math.pow(1 + C, D) - 1) / C)) / Math.pow(1 + C, D);
        result = `初始資金 (A) 為: ${A.toFixed(2)}`;
    }
    // 計算經過時間 (D)
    else if (C >= 0 && E > 0 && A > 0 && B > 0 && D === 0) {
        const futureValue = E - A * Math.pow(1 + C, D);
        if (C === 0) {
            D = (E - A) / B;
        } else {
            const numerator = E - A * Math.pow(1 + C, D);
            const denominator = B * (Math.pow(1 + C, D) - 1) / C;
            if (numerator <= 0 || denominator <= 0) {
                result = '經過時間 (D) 為: 無法計算';
            } else {
                D = Math.log((E - A * Math.pow(1 + C, D)) / (B * (Math.pow(1 + C, D) - 1) / C + A)) / Math.log(1 + C);
                result = `經過時間 (D) 為: ${D.toFixed(2)}`;
            }
        }
    }
    // 計算投資報酬率 (C)
    else if (D > 0 && E > 0 && A > 0 && B > 0 && C === 0) {
        const x = (E - A) / B;
        if (x <= 0) {
            result = '投資報酬率 (C) 為: 無法計算';
        } else {
            C = Math.pow(E / (A + B * ((Math.pow(1 + C, D) - 1) / C)), 1 / D) - 1;
            result = `投資報酬率 (C) 為: ${(C * 100).toFixed(2)}%`;
        }
    }
    // 計算經過時間 (D) 的另一種情況
    else if (E > 0 && A > 0 && B > 0 && C >= 0 && D === 0) {
        if (C === 0) {
            D = (E - A) / B;
        } else {
            D = Math.log((E - A) / (B + A)) / Math.log(1 + C);
            result = `經過時間 (D) 為: ${D.toFixed(2)}`;
        }
    }
    // 提示用戶提供正確的輸入值
    else {
        result = '請提供正確的輸入值以進行計算';
    }

    // 顯示結果
    document.getElementById('result').innerText = result;
}