import createToast from "../createElement/createToast";
import { removeAllLoadFile, sortFile } from "../common/functions";

const resetStatus = (form, listLoadFile) => {
  setTimeout(() => {
    form.classList.remove("_preloader");
    listLoadFile.classList.remove("_preloader");
    removeAllLoadFile(listLoadFile);

    createToast(["Отправлено успешно."], true);
  }, 1000);
};

const handleSubmit = (fileInput, listLoadFile) => {
  const form = document.querySelector(".upload-file__form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    sortFile(fileInput, listLoadFile);
    const formData = new FormData();

    if (fileInput.files.length === 0) {
      createToast(["<b>Ошибка:</b> Файлы не загружены. Попробуйте снова."]);
      return;
    }

    for (let i = 0; i < fileInput.files.length; i += 1) {
      formData.append("files", fileInput.files[i]);
    }
    debugger;
    form.classList.add("_preloader");
    listLoadFile.classList.add("_preloader");

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Сетевая ошибка");
        }
        return response.json();
      })
      .then((data) => {
        // имитация лоадера,т.к node отправляет мгновенно файлы
        resetStatus(form, listLoadFile);
        fileInput.value = "";
        console.log("Ответ от сервера:", data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        console.error(
          "Ошибка:",
          "нужно скачать сервер с репозитория https://github.com/DenisGrishin/node_server"
        );
      });
  });
};

export default handleSubmit;
