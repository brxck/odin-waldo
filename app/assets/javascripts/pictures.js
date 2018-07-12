window.onload = () => {
  const container = document.getElementById("container")
  container.addEventListener("click", userClick)
}

const userClick = e => {
  console.log("click at " + e.pageX.toString() + ", " + e.pageY.toString())
  animateClick(e.pageX, e.pageY)
  searchPerson(e.pageX, e.pageY)
}

const animateClick = (x, y) => {
  const container = document.getElementById("container")
  const ripple = document.createElement("div")

  ripple.className = "ripple"
  ripple.style.top = y + "px"
  ripple.style.left = x + "px"

  container.append(ripple)

  setTimeout(() => ripple.classList.add("ripple-full"), 50)
  setTimeout(() => ripple.classList.add("ripple-fade"), 550)
  setTimeout(() => ripple.remove(), 550)
}

const logPerson = person => {
  console.log("found " + person.name)
  const container = document.getElementById("container")
  const label = document.createElement("div")

  label.className = "label"
  label.textContent = person.name
  label.style.left = person.x0 + "px"
  label.style.top = person.y0 + "px"

  container.append(label)
}

const searchPerson = (x, y) => {
  const token = document.getElementsByName("csrf-token")[0].content
  const pictureId = document.getElementById("id").textContent
  fetch(pictureId + "/search", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": token
    },
    body: JSON.stringify({ person: { x: x, y: y } })
  })
    .then(response => response.json())
    .then(json => logPerson(json[0]))
    .catch(error => console.error(error))
}
