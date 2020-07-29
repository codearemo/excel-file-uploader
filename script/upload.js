const uploadInput = document.querySelector('#upload-input');
const selectFileBtn = document.querySelector('.select-file-btn');
const form = document.querySelector('form');
const alertDialog = document.querySelector('.alert-dialog');
const alertDialogTxt = document.querySelector('.alert-dialog p');

let timeOut;

const headers = [
  'fullname',
  'phone number',
  'address',
  'state',
  'lga',
  'date of birth',
  'salary',
  'gender',
  'call allowance',
  'transport allowance'
];

selectFileBtn.addEventListener('click', () => uploadInput.click());

const validateHeader = (header) => {
  const filteredHeader = headers.filter(h => h === header);
  return filteredHeader.length === 1;
}

uploadInput.addEventListener('change', e => {
  const selectedFile = e.target.files[0];
  let validHeadersFlag = true;
  let rowObj;

  const fileReader = new FileReader();
  fileReader.readAsBinaryString(selectedFile);

  fileReader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: 'binary' })

    workbook.SheetNames.forEach(sheet => {
      rowObj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

      // Check the headers
      for (header in rowObj[0]) {
        if (!validateHeader(header.toLowerCase())) {
          validHeadersFlag = false;
        }
      }
    });

    if (validHeadersFlag) {
      validHeadersFlag = false;
      // Reset form so as to prevent routing issues
      form.reset();

      localStorage.setItem('table', JSON.stringify(rowObj));
      window.open(window.location.origin + '/dashboard.html', '_self');
    } else {
      clearTimeout(timeOut);
      alertDialogTxt.innerText = 'Headers of file do not match what is expected.';
      alertDialog.classList.add('show-alert');
      timeOut = setTimeout(() => {
        alertDialog.classList.remove('show-alert');
      }, 7000);
    }
  }
});
