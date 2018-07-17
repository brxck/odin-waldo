let zoomLevel = 1

window.onload = () => {
  const container = document.getElementById("container")
  container.addEventListener("click", imageClick)

  const modal = document.getElementById("modal")
  modal.addEventListener("click", modalClick)

  const toggleButton = document.getElementById("toggle")
  toggleButton.addEventListener("click", toggleControls)

  const zoomIn = document.getElementById("in")
  zoomIn.addEventListener("click", () => zoom(0.1))
  const zoomOut = document.getElementById("out")
  zoomOut.addEventListener("click", () => zoom(-0.1))
  const reset = document.getElementById("reset")
  reset.addEventListener("click", () => zoom(0))
  window.addEventListener("wheel", e => zoom(Math.min(0.1, e.deltaY / 100)))
}

const imageClick = e => {
  if (document.body.classList.contains("dragging")) {
    return
  }
  console.log("click at " + e.pageX.toString() + ", " + e.pageY.toString())
  const x = e.pageX / zoomLevel
  const y = e.pageY / zoomLevel
  animateClick(x, y)
  searchPerson(x, y)
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

const zoom = adjustment => {
  console.log("zoom")
  const container = document.getElementById("container")
  if (adjustment === 0) {
    zoomLevel = 1
  } else {
    zoomLevel += adjustment
    zoomLevel = Math.max(0.5, Math.min(1.5, zoomLevel))
  }
  container.style.transform = `scale(${zoomLevel})`
}

const toggleControls = () => {
  const controls = document.getElementById("controls")
  if (controls.style.display === "flex") {
    controls.style.display = "none"
  } else {
    controls.style.display = "flex"
  }
}
