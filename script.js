/* ── Loader animation ── */
        const phases = [
            { pct: 18, label: "Loading assets..." },
            { pct: 35, label: "Preparing UI..." },
            { pct: 52, label: "Building layouts..." },
            { pct: 70, label: "Styling components..." },
            { pct: 85, label: "Almost there..." },
            { pct: 100, label: "Ready to launch!" }
        ];
        let phaseIdx = 0, current = 0;
        const fill = document.getElementById('ld-fill');
        const pct = document.getElementById('ld-pct');
        const stat = document.getElementById('ld-status');
        const btn = document.getElementById('ld-btn');
        const chips = document.querySelectorAll('.ld-chip');

        function animateTo(target, label, cb) {
            stat.textContent = label;
            const step = () => {
                if (current < target) {
                    current = Math.min(current + 1, target);
                    fill.style.width = current + '%';
                    pct.textContent = current + '%';
                    setTimeout(step, 20);
                } else { if (cb) setTimeout(cb, 300); }
            };
            step();
        }

        function runPhase() {
            if (phaseIdx >= phases.length) return;
            const p = phases[phaseIdx++];
            setTimeout(() => {
                animateTo(p.pct, p.label, () => {
                    if (phaseIdx < phases.length) {
                        runPhase();
                    } else {
                        chips.forEach((c, i) => setTimeout(() => c.classList.add('on'), i * 130));
                        setTimeout(() => {
                            document.getElementById('ld-dots').style.display = 'none';
                            btn.classList.add('on');
                        }, 500);
                    }
                });
            }, phaseIdx === 1 ? 600 : 400);
        }

        setTimeout(runPhase, 800);

        btn.addEventListener('click', revealSite);

        function revealSite() {
            const loader = document.getElementById('loader');
            const site = document.getElementById('site');
            loader.classList.add('hidden');
            site.classList.add('visible');
            setTimeout(animateSkillBars, 400);
        }

        /* ── Auto-reveal after page load ── */
        window.addEventListener('load', () => {
            // Auto-dismiss after 4.5s if user hasn't clicked
            setTimeout(() => {
                if (!document.getElementById('loader').classList.contains('hidden')) {
                    revealSite();
                }
            }, 4500);
        });

        /* ── Skill bars on scroll ── */
        function animateSkillBars() {
            const bars = document.querySelectorAll('.skill-fill');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.style.width = e.target.dataset.width + '%';
                        observer.unobserve(e.target);
                    }
                });
            }, { threshold: 0.3 });
            bars.forEach(b => observer.observe(b));
        }