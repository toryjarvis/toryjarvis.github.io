document.addEventListener("DOMContentLoaded", () => {
    const commands = [
        { label: "About", type: "anchor", target: "#about"},
        { label: "Skills", type: "anchor", target: "#skills" },
        { label: "Contact", type: "anchor", target: "#contact" },
        { label: "Work", type: "anchor", target: "#work" },
        { label: "GitHub", type: "link", target: "https://github.com/toryjarvis", external: true },
        { label: "LinkedIn", type: "link", target: "https://www.linkedin.com/in/victorjarvis/", external: true }
    ];

    const trigger = document.getElementById("palette-trigger");
    const overlay = document.getElementById("command-palette");
    const input = document.getElementById("palette-input");
    const list = document.getElementById("palette-list");

    let activeIndex = 0;

    let filtered = commands;

    function render() {
        list.innerHTML = "";
        filtered.forEach((command, index) => {
            const item = document.createElement("li");
            item.textContent = command.label;
            item.className = "palette-item" + (index === activeIndex ? " active" : "");
            item.addEventListener("mousemove", () => {
                activeIndex = index;
                render()
            });
            item.addEventListener("click", () => runCommand(command));
            list.appendChild(item)
        })
    };

    function runCommand(command) {
        if (command.type === "anchor") {
            document.querySelector(command.target)?.scrollIntoView({ behavior: "smooth" });
        } else if (command.external) {
            window.open(command.target, "_blank");
        } else {
            window.location.href = command.target;
        }
        closePalette();
    };

    function openPalette() {
        overlay.style.display = "flex";
        input.value = "";
        filtered = commands;
        activeIndex = 0;
        render();
        input.focus();
    };

    function closePalette() {
        overlay.style.display = "none";
    };

    trigger.addEventListener("click", openPalette);

    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            openPalette();
        } else if (e.key === "Escape" && overlay.style.display === "flex") {
            closePalette();
        }
    });

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        filtered = commands.filter((c) => c.label.toLowerCase().includes(query));
        activeIndex = 0;
        render();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
            render();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
            render();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[activeIndex]) runCommand(filtered[activeIndex]);
        }
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePalette();
    });

});