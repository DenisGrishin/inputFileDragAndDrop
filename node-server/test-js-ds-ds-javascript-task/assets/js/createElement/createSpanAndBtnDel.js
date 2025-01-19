export function createSpanAndBtnDel(file, li) {
  const { name, size } = file;

  const nameAndType = name.split('.');
  const fileSizeInMegabytes = `${(Number(size) / 1048576).toFixed(2)} MB`;

  [nameAndType[0], fileSizeInMegabytes, nameAndType[1].toUpperCase()].forEach(
    (item, indx) => {
      const span = document.createElement('span');

      if (indx === 0) {
        span.dataset.name = name;
      }

      span.innerText = item;
      li.appendChild(span);
    }
  );

  const button = document.createElement('button');
  button.classList.add('list-load__btn');
  button.type = 'button';
  li.appendChild(button);
}
export default createSpanAndBtnDel;
