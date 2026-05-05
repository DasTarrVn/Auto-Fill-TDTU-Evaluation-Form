document.getElementById('fillBtn').addEventListener('click', async () => {
    const selectedLevel = document.getElementById('level').value;
    const isAutoSubmit = document.getElementById('autoSubmit').checked;

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: autoFillForm,
        args: [selectedLevel, isAutoSubmit]
    });
});

function autoFillForm(level, isAutoSubmit) {
    const radios = document.querySelectorAll(`input[type="radio"][value="${level}"]`);
    let checkCount = 0;

    radios.forEach(radio => {
        radio.click();
        checkCount++;
    });

    const txt1 = document.getElementById('txt1');
    const txt2 = document.getElementById('txt2');
    if (txt1) txt1.value = '';
    if (txt2) txt2.value = '';

    if (checkCount > 0) {
        if (isAutoSubmit) {
            const submitBtn = document.getElementById('btnTiepTuc');
            if (submitBtn) {
                // Tự động bấm sau 0.5 giây để web nhận hết dữ liệu radio
                setTimeout(() => {
                    submitBtn.click();
                }, 500);
            } else {
                alert(`Checked ${checkCount} questions, but couldn't find the Submit button. Please click it manually.`);
            }
        } else {
            alert(`Successfully checked ${checkCount} questions at level: ${level}. Remember to click the Submit button manually!`);
        }
    } else {
        alert('No evaluation form found on this page!');
    }
}