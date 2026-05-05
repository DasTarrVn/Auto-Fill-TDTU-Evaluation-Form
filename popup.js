document.getElementById('fillBtn').addEventListener('click', async () => {
  const selectedLevel = document.getElementById('level').value;
  
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: autoFillForm,
    args: [selectedLevel]
  });
});

function autoFillForm(level) {
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
        alert(`Successfully checked ${checkCount} questions at level: ${level}. Remember to click the Submit button manually!`);
    } else {
        alert('No evaluation form found on this page!');
    }
}