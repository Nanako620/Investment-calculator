function calculate() {
    const A = parseFloat(document.getElementById('A').value) || 0;
    const B = parseFloat(document.getElementById('B').value) || 0;
    const C = parseFloat(document.getElementById('C').value) || 0;
    const D = parseFloat(document.getElementById('D').value) || 0;
    const E = parseFloat(document.getElementById('E').value) || 0;
    let result = '';

    // 計算複利所累計的資金 (E)
    if (A > 0 && B > 0 && C >= 0 && D > 0 && E === 0) {
        const futureValue = A * Math.pow(1 + C, D) + B * ((Math.pow(1 + C, D) - 1) / C);
        result = `複利所累計的資金 (E) 為: ${futureValue.toFixed(2)}`;
    }
    // 計算初始資金 (A)
    else if (B > 0 && C >= 0 && D > 0 && E > 0 && A === 0) {
        const initialCapital = (E - B * ((Math.pow(1 + C, D) - 1) / C)) / Math.pow(1 + C, D);
        result = `初始資金 (A) 為: ${initialCapital.toFixed(2)}`;
    }
    // 計算經過時間 (D)
    else if (C >= 0 && E > 0 && A > 0 && B > 0 && D === 0) {
        const futureValue = E - A * Math.pow(1 + C, 0) - B * (Math.pow(1 + C, 0) - 1) / C;
        if (futureValue <= 0) {
            result = '經過時間 (D) 為: 無法計算';
        } else {
            const time = Math.log((E * C + B) / (A * C + B)) / Math.log(1 + C);
            result = `經過時間 (D) 為: ${time.toFixed(2)}`;
        }
    }
    // 計算投資報酬率 (C)
    else if (D > 0 && E > 0 && A > 0 && B > 0 && C === 0) {
        const annualReturn = Math.pow(E / (A + B * ((Math.pow(1 + C, D) - 1) / C)), 1 / D) - 1;
        result = `投資報酬率 (C) 為: ${(annualReturn * 100).toFixed(2)}%`;
    }
    // 計算經過時間 (D) (另外一種情況)
    else if (E > 0 && A > 0 && B > 0 && C >= 0 && D === 0) {
        const time = Math.log(E / (A + B)) / Math.log(1 + C);
        result = `經過時間 (D) 為: ${time.toFixed(2)}`;
    }
    // 提示用戶提供正確的輸入值
    else {
        result = '請提供正確的輸入值以進行計算';
    }

    document.getElementById('result').innerText = result;
}