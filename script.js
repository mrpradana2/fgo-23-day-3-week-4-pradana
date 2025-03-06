async function getData() {
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed Retrieve Data");
    const dataPosts = await response.json();
    const section = document.querySelector("section");
    dataPosts.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const id = document.createElement("p");
      id.textContent = `User ID : ${data.userId}`;
      card.insertAdjacentElement("beforeend", id);
      const userId = document.createElement("p");
      userId.textContent = `ID : ${data.id}`;
      card.insertAdjacentElement("beforeend", userId);
      const title = document.createElement("h1");
      title.textContent = `${data.title}`;
      card.insertAdjacentElement("beforeend", title);
      const body = document.createElement("p");
      body.textContent = `${data.body}`;
      card.insertAdjacentElement("beforeend", body);
      section.insertAdjacentElement("beforeend", card);
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

getData();

const form = document.querySelector("form");
form.addEventListener("submit", postData);

async function postData(event) {
  try {
    event.preventDefault();

    const id = event.target["id"].value;
    const userId = event.target["userId"].value;
    const title = event.target["title"].value;
    const body = event.target["body"].value;

    const request = new Request("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId, title, body }),
    });

    const response = await fetch(request);
    if (!response.ok) throw new Error("Failed to Fetch data");

    const objResult = await response.json();
    console.log(objResult);

    const card = document.createElement("div");
    card.classList.add("card");
    const userIdResult = document.createElement("p");
    userIdResult.textContent = `User ID : ${objResult.userId}`;
    card.insertAdjacentElement("beforeend", userIdResult);
    const idResult = document.createElement("p");
    idResult.textContent = `ID : ${objResult.id}`;
    card.insertAdjacentElement("beforeend", idResult);
    const titleResult = document.createElement("h1");
    titleResult.textContent = objResult.title;
    card.insertAdjacentElement("beforeend", titleResult);
    const bodyResult = document.createElement("p");
    bodyResult.textContent = objResult.body;
    card.insertAdjacentElement("beforeend", bodyResult);

    const print = document.getElementById("result");
    print.insertAdjacentElement("beforeend", card);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
