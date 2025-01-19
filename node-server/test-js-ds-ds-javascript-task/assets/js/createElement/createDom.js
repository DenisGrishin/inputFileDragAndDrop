const createDom = () => {
  const root = document.getElementById('root');

  if (root) {
    root.insertAdjacentHTML(
      'beforeend',
      `   <div class="upload-file">
      <div class="upload-file__container">
        <form class="upload-file__form ">
          <div class="upload-file__wrapper-input">
            <input hidden id="file-input" type="file" name="Файлы" accept="image/png, image/jpeg, image/jpg,"
              class="upload-file__input" multiple>
            <label class="upload-file__label btn" for="file-input">
              <span>Загрузить изображения</span>
            </label>
          </div>
          <div class="upload-file__info info-upload">
            <h1>Добавить файлы</h1>
            <ul>
              <li>Правила загрузки файлов:</li>
              <li>Максимальный размер одного файла — <b>10 MB.</b></li>
              <li>Допустимые форматы файлов: <b>JPG, JPEG, PNG</b></li>
              <li>Можно загрузить максимум <b>5</b> файлов.</li>
            </ul>
            <ul>
              <li>Подсказка:</li>
              <li>Просто перетащите файл в окно браузера.</li>
              <li>Наведите курсор на файл для увеличения.</li>
            </ul>

            <button type="submit" class="btn">Отправить</button>
          </div>
        </form>
        <ul class="upload-file__list list-load"></ul>
      </div>
    </div>
    <div class="toast"></div>`
    );
  }
};
export default createDom;
