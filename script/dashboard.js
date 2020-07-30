const tableBody = document.querySelector('tbody');
const saveBtn = document.querySelector('.save-btn');
const loader = document.querySelector('.loader-hold');
const alertDialog = document.querySelector('.alert-dialog');
const alertDialogTxt = document.querySelector('.alert-dialog p');

const importedData = JSON.parse(localStorage.getItem('table'));

let timeOut;

const showAlertDialog = text => {
  clearTimeout(timeOut);
  alertDialogTxt.innerText = text;
  alertDialog.classList.add('show-alert');
  timeOut = setTimeout(() => {
    alertDialog.classList.remove('show-alert');
  }, 5000);
}

if (!importedData) {
  window.open(window.location.origin, '_self');
}
tableBody.innerHTML = importedData.map(data => {
  return `<tr>
  <td>${data['Fullname']}</td>
  <td>${data['Phone Number']}</td>
  <td>${data['Address']}</td>
  <td>${data['State']}</td>
  <td>${data['LGA']}</td>
  <td>${data['Date of Birth']}</td>
  <td>${data['Salary']}</td>
  <td>${data['Gender']}</td>
  <td>${data['Call Allowance']}</td>
  <td>${data['Transport Allowance']}</td>
</tr>`
}).join('');

saveBtn.addEventListener('click', () => {
  loader.style.display = 'flex';
  const formData = new FormData();
  formData.append('file', JSON.stringify(importedData));

  fetch(`https://httpbin.org/anything`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(() => {
      loader.style.display = 'none';
      showAlertDialog('File upload succesfull.');
    })
    .catch(() => {
      loader.style.display = 'none';
      showAlertDialog('Error: File upload Failed.');
    })
});