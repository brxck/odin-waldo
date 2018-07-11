window.onload = () => {
  const container = document.getElementById("container")
  container.addEventListener("click", userClick)
}

const userClick = e => {
  // alert(e.clientX.toString() + ", " + e.clientY.toString())
  animateClick(e.clientX, e.clientY)
  searchPerson(e.clientX, e.clientY)
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
}

const searchPerson = (x, y) => {
  const token = document.getElementsByName("csrf-token")[0].content
  fetch("search", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": token
    },
    body: JSON.stringify({ coord: { x: x, y: y } })
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error))
}
