function calculate() {
    const A = parseFloat(document.getElementById('A').value) || 0;
    const B = parseFloat(document.getElementById('B').value) || 0;
    const C = parseFloat(document.getElementById('C').value) || 0;
    const D = parseFloat(document.getElementById('D').value) || 0;
    const E = parseFloat(document.getElementById('E').value) || 0;
    let result = '';

    if (A && B && C && D && !E) {
        // Calculate E
        E = A * Math.pow(1 + C, D) + B * ((Math.pow(1 + C, D) - 1) / C);
        result = `複利所累計的資金 (E) 為: ${E.toFixed(2)}`;
    } else if (B && C && D && E && !A) {
        // Calculate A
        A = (E - B * ((Math.pow(1 + C, D) - 1) / C)) / Math.pow(1 + C, D);
        result = `初始資金 (A) 為: ${A.toFixed(2)}`;
    } else if (C && D && E && A && !B) {
        // Calculate D
        const futureValue = E - A * Math.pow(1 + C, D);
        if (futureValue <= 0) {
            result = '經過時間 (D) 為: 無法計算';
        } else {
            D = Math.log((E / A) - 1) / Math.log(1 + C);
            result = `經過時間 (D) 為: ${D.toFixed(2)}`;
        }
    } else if (D && E && A && B && !C) {
        // Calculate C
        const C = Math.pow(E / (A + B * ((Math.pow(1 + C, D) - 1) / C)), 1 / D) - 1;
        result = `投資報酬率 (C) 為: ${(C * 100).toFixed(2)}%`;
    } else if (E && A && B && C && !D) {
        // Calculate D
        const numerator = E - A * Math.pow(1 + C, 0);
        const denominator = B;
        if (denominator <= 0) {
            result = '經過時間 (D) 為: 無法計算';
        } else {
            D = Math.log((E / (A + B)) / A) / Math.log(1 + C);
            result = `經過時間 (D) 為: ${D.toFixed(2)}`;
        }
    } else {
        result = '請提供正確的輸入值以進行計算';
    }

    document.getElementById('result').innerText = result;
}