const chatService = {
  id: "hs-script-loader",
  type: "text/javascript",
  src: `https://js.hs-scripts.com/8112310.js`,

  createChat() {
    const bodyRef = document.body;
    const id = "hs-script-loader";
    if (document.querySelector("#" + id)) {
      return;
    }
    const scriptEl = document.createElement("script");
    scriptEl.id = this.id;
    scriptEl.type = this.type;
    scriptEl.src = this.src;
    scriptEl.setAttribute("defer", "true");
    scriptEl.setAttribute("async", "true");

    bodyRef.appendChild(scriptEl);
  },
};

export default chatService;
