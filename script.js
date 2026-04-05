(function () {
  const card = document.getElementById("card");
  const toast = document.getElementById("toast");
  const contacts = document.querySelectorAll(".contact[data-copy]");

  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  contacts.forEach(function (el) {
    el.addEventListener("click", function (e) {
      const value = el.getAttribute("data-copy");
      if (!value) return;
      e.preventDefault();
      copyText(value)
        .then(function () {
          showToast("복사했습니다: " + value);
        })
        .catch(function () {
          showToast("복사에 실패했습니다.");
        });
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && card) {
    card.addEventListener(
      "pointermove",
      function (e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const max = 4;
        card.style.transform =
          "perspective(800px) rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg)";
      },
      { passive: true }
    );
    card.addEventListener("pointerleave", function () {
      card.style.transform = "";
    });
  }
})();
