window.onload = () => {
  const container = document.getElementById("container")
  container.addEventListener("click", imageClick)
  const modal = document.getElementById("modal")
  modal.addEventListener("click", modalClick)
}

const imageClick = e => {
  if (document.body.classList.contains("dragging")) {
    return
  }
  console.log("click at " + e.pageX.toString() + ", " + e.pageY.toString())
  animateClick(e.pageX, e.pageY)
  searchPerson(e.pageX, e.pageY)
}

const modalClick = e => {
  const modal = document.getElementById("modal")
  modal.style.display = "none"
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
  setTimeout(() => ripple.remove(), 1050)
}

const logPerson = response => {
  console.log(response)
  if (response.found === false) {
    return
  }

  const container = document.getElementById("container")
  const label = document.createElement("div")

  label.className = "label"
  label.textContent = response.person.name
  label.style.left = response.person.x0 + "px"
  label.style.top = response.person.y0 + "px"
  label.style.width = response.person.x1 - response.person.x0 + "px"
  label.style.height = response.person.y1 - response.person.y0 + "px"
  setTimeout(() => container.append(label), 1050)

  const list = document.getElementById("names")
  const listEntry = document.getElementById(response.person.id)
  list.removeChild(listEntry)
  listEntry.classList.add("found")
  list.appendChild(listEntry)
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
    .then(json => logPerson(json))
    .catch(error => console.error(error))
}
