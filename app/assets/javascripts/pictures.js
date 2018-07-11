window.onload = () => {
  const container = document.getElementById("container")
  container.addEventListener("click", userClick)
}

const userClick = e => {
  animateClick(e.clientX, e.clientY)
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
