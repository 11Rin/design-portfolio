document.addEventListener("DOMContentLoaded", function () {

    const scrollOffset = 100;
    const portfolioData = [
        {
            category: "UI/Ux",
            works: [
                { points: 100, task: "Студенческий проект. Задача: Создать дизайн интернет магазина. Проработать макет, прототипирование, UIkit", targetId: "work-1" },
                { points: 400, task: "Заказчик - Юрист Косицына О.С. Задача: Разработать сайт-визитку. Нужно чтобы люди смогли ознакомится с моими делами и могли связаться со мной через сайт, оставить заявку", targetId: "work-2" }
            ]
        },
        {
            category: "Соцсети (посты)",
            works: [
                { points: 200, task: "Заказчик - Студклуб. Задача: Подготовить дизайн поста к 9 мая. Форматы 1:1, 3:4, 9:16", targetId: "work-3" },
                { points: 300, task: "Заказчик - Сообщество Студвесна. Задача: Подготовить дизайн постов к отборочному этапу. Всего 9 направлений", targetId: "work-4" },
                { points: 400, task: "Заказчик - Танцевальная команда НГТУ крю (NGTU crew). Задача: Подготовить дизайн постов с итогами отчетного концерта", targetId: "work-5" },
                { points: 500, task: "Заказчик - Юридическая фирма Новбанкрот. Задача: Оформить профиль компании в Яндекс бизнес. Разработать дизайн карточек товара, историй, баннеров", targetId: "work-6" }
            ]
        },
        {
            category: "Презентации",
            works: [
                { points: 300, task: "Заказчик - Сообщество Студвесна. Задача: Подготовить презентацию для собрания руководителей направлений и участников этого мероприятия", targetId: "work-7" }
            ]
        },
        {
            category: "Печать",
            works: [
                { points: 300, task: "Заказчик - Сообщество Студвесна. Задача: Разработать дизайн грамот для награждения победителей, подготовить к печати", targetId: "work-8" },
                { points: 300, task: "Заказчик - Сообщество Студвесна. Задача: Разработать дизайн подарочных абонементов и сертификатов для победителей", targetId: "work-9" }
            ]
        },
        {
            category: "3D",
            works: [
                { points: 100, task: "Студенческий проект. Задача: 3D-визуализация кресла", targetId: "work-10" },
                { points: 200, task: "Тестовое задание. Задача: Разработать для рекламного ролика игры 3D сцену", targetId: "work-11" },
                { points: 400, task: "Студенческий проект. Задача: Разработка VR приложения", targetId: "work-12" }
            ]
        },
        {
            category: "Игры",
            works: [
                { points: 100, task: "Студенческий проект. Задача: Разработка мобильной игры", targetId: "work-13" },
                { points: 200, task: "Студенческий проект (пет-проект). Задача: Разработка мобильной игры", targetId: "work-14" },
            ]
        },
        {
            category: "Другое",
            works: [
                { points: 100, task: "Студенческий проект. Задача: Взять за основу уже существующий бренд, сделать редизайн и подготовить инфографику", targetId: "work-15" },
                { points: 100, task: "Сообщество Студвесна. Задача: Подготовить дизайн диодника для фотосессии участников", targetId: "work-16" },
            ]
        }
    ];

    const gridContainer = document.getElementById("game-grid");
    const modalOverlay   = document.getElementById("portfolioModal");
    const modalTitle     = document.getElementById("modalTitle");
    const modalTask      = document.getElementById("modalTask");
    const modalAnswerBtn = document.getElementById("modalAnswerBtn");
    const modalClose     = document.getElementById("modalClose");

    let currentTargetId = null;

    portfolioData.forEach(function (categoryGroup) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("game-category");

        const title = document.createElement("h2");
        title.classList.add("category-title");
        title.textContent = categoryGroup.category;
        categoryDiv.appendChild(title);

        const cellsDiv = document.createElement("div");
        cellsDiv.classList.add("category-cells");

        categoryGroup.works.forEach(function (work) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = work.points;
            cell.addEventListener("click", function () {
                openModal(work, categoryGroup.category);
            });
            cellsDiv.appendChild(cell);
        });

        categoryDiv.appendChild(cellsDiv);
        gridContainer.appendChild(categoryDiv);
    });

    function openModal(work, categoryName) {
        modalTitle.textContent = categoryName + " — " + work.points + " баллов";
        modalTask.textContent  = work.task;
        currentTargetId = work.targetId;

        modalOverlay.classList.add("active");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function (e) {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
    });

    modalAnswerBtn.addEventListener("click", function () {
        const targetId = currentTargetId;
        closeModal();
        if (!targetId) return;

        setTimeout(function () {
            const target = document.getElementById(targetId);
            if (target) {
                const targetTop = target.getBoundingClientRect().top + window.pageYOffset - scrollOffset;
                window.scrollTo({ top: targetTop, behavior: "smooth" });
            } else {
                console.warn('Блок с ID "' + targetId + '" не найден. Проверьте ID в данных.');
            }
        }, 280);
    });

});