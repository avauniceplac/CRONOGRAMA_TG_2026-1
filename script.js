document.addEventListener("DOMContentLoaded", function() {
    const monthTitles = document.querySelectorAll(".month-title");
    const monthCategories = document.querySelectorAll(".month-category");

    function getDaysUntil(dateStr) {
        const today = new Date();
        const targetDate = new Date(dateStr + "T00:00:00");
        const diffTime = targetDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    // Para cada mês, vamos verificar se tem algum evento ativo
    monthCategories.forEach(month => {
        const eventItems = month.querySelectorAll(".event-item");
        let hasActiveEvent = false;

        eventItems.forEach(item => {
            const startDate = new Date(item.getAttribute('data-start') + "T00:00:00");
            const endDate = new Date(item.getAttribute('data-end') + "T00:00:00");

            if (endDate < today) {
                item.classList.add('past');
            } else if (startDate <= today && today <= endDate) {
                hasActiveEvent = true;

                const daysUntilEnd = getDaysUntil(item.getAttribute('data-end'));

                if (daysUntilEnd <= 3) {
                    item.classList.add('upcoming-3');
                } else if (daysUntilEnd <= 7) {
                    item.classList.add('upcoming-7');
                } else {
                    item.classList.add('upcoming');
                }
            }
        });

        const eventList = month.querySelector(".event-list");

        // Se tem evento ativo, deixa aberto, senão fecha
        if (hasActiveEvent) {
            eventList.style.display = "block";
        } else {
            eventList.style.display = "none";
        }
    });

    // Toggle para abrir/fechar meses ao clicar no título
    monthTitles.forEach(title => {
        title.addEventListener("click", function() {
            const eventList = this.nextElementSibling;
            eventList.style.display = (eventList.style.display === "none" || eventList.style.display === "") ? "block" : "none";
        });
    });
});
