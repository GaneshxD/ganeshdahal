        document.getElementById("year").textContent = new Date().getFullYear();

        const form = document.getElementById("contactForm");
        const alertBox = document.getElementById("formAlert");
        const musicBtn = document.getElementById("musicToggle");
        const musicTrack = new Audio("image/music.m4a");
        musicTrack.loop = true;
        musicTrack.preload = "auto";

        form?.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                message: form.message.value.trim()
            };

            const emailOk = /.+@.+\..+/.test(data.email);

            if (!data.name || !emailOk || data.message.length < 5) {
                alertBox.textContent = "Please fill all fields with valid details.";
                alertBox.className = "text-sm font-medium text-red-600";
                return;
            }

            localStorage.setItem("contactData", JSON.stringify(data));
            alertBox.textContent = "Details saved. Taking you to the summary...";
            alertBox.className = "text-sm font-medium text-emerald-600";
            setTimeout(() => {
                window.location.href = "form-details.html";
            }, 400);
        });

        musicBtn?.addEventListener("click", () => {
            if (musicTrack.paused) {
                musicTrack.play().then(() => {
                    musicBtn.textContent = "❚❚";
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                musicTrack.pause();
                musicTrack.currentTime = 0;
                musicBtn.textContent = "♪";
            }
        });

        (function () {
            const v = document.getElementById("heroVideo");
            const btn = document.getElementById("videoToggle");
            if (!v || !btn) return;

            btn.addEventListener("click", () => {
                if (v.paused) {
                    v.play().catch(() => {});
                    btn.textContent = "❚❚";
                    btn.setAttribute("aria-label", "Pause video");
                } else {
                    v.pause();
                    btn.textContent = "▶︎";
                    btn.setAttribute("aria-label", "Play video");
                }
            });

            v.addEventListener("play", () => btn.classList.add("opacity-70"));
            v.addEventListener("pause", () => btn.classList.remove("opacity-70"));
        })();
        (function () {
            const canvas = document.getElementById("myCanvas");
            if (!canvas) return;
            
            // Hide canvas on mobile devices
            if (window.innerWidth < 768) {
            canvas.style.display = 'none';
            return;
            }
            
            const ctx = canvas.getContext("2d");

            function draw() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            const width = rect.width;
            const height = rect.height;

            ctx.fillStyle = "#f3f4f6";
            ctx.fillRect(0, 0, width, height);

            const titleSize = 48;
            const subtitleSize = 24;

            ctx.textAlign = "center";

            ctx.fillStyle = "#111827";
            ctx.font = `bold ${titleSize}px sans-serif`;
            ctx.fillText("Hey", width / 2, height * 0.45);

            ctx.fillStyle = "#6b7280"; 
            ctx.font = `${subtitleSize}px sans-serif`;
            ctx.fillText("Welcome to my portfolio.", width / 2, height * 0.7);
            }

            window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                canvas.style.display = 'none';
            } else {
                canvas.style.display = 'block';
                draw();
            }
            });
            
            draw();
        })();

        (function() {
            const slides = document.querySelectorAll('.gallery-slide');
            const next = document.getElementById('galNext');
            const prev = document.getElementById('galPrev');
            let active = 0;

            if (!slides.length) return;

            const update = () => {
                slides.forEach((slide, i) => {
                    slide.style.opacity = i === active ? '1' : '0';
                });
            };

            next?.addEventListener('click', () => {
                active = (active + 1) % slides.length;
                update();
            });

            prev?.addEventListener('click', () => {
                active = (active - 1 + slides.length) % slides.length;
                update();
            });
        })();

        const themeBtn = document.getElementById("themeToggle");
        const body = document.body;
        let isLight = true;
        const colors = ["#fafafa", "#fff5f7", "#fffaeb", "#f0f9ff", "#f5f3ff", "#faf5ff", "#ecfdf5"];
        let colorIndex = 0;

        themeBtn?.addEventListener("click", () => {
            colorIndex = (colorIndex + 1) % colors.length;
            body.style.backgroundColor = colors[colorIndex];
            
            const sakura = document.createElement("div");
            sakura.textContent = "🌸";
            sakura.style.position = "fixed";
            sakura.style.top = "-50px";
            sakura.style.left = Math.random() * 100 + "%";
            sakura.style.fontSize = "24px";
            sakura.style.pointerEvents = "none";
            sakura.style.zIndex = "9999";
            sakura.style.transition = "top 3s linear, transform 3s ease-in-out";
            body.appendChild(sakura);
            
            setTimeout(() => {
                sakura.style.top = "100vh";
                sakura.style.transform = `rotate(${Math.random() * 360}deg)`;
            }, 10);
            
            setTimeout(() => sakura.remove(), 3100);
        });
