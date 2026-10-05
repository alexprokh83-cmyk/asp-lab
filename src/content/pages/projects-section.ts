/** UI copy of the Projects section (catalogue, project pages, homepage strips). */
import type { Localized } from "../types";
import type { CategoryId } from "../project-types";

export interface ProjectsSectionCopy {
  heading: string; lead: string;
  filterNav: string; filterAll: string; noJs: string; shown: string; projectsWord: string; filterChanged: string; noResults: string;
  categories: Record<CategoryId, string>;
  labels: { about: string; how: string; additionally: string; features: string; uses: string; tech: string; result: string; repo: string; back: string; more: string; open: string; allProjects: string };
  home: { heading: string; lead: string };
  results: { heading: string; lead: string };
}

export const projectsSectionCopy: Localized<ProjectsSectionCopy> = {
  en: {
    heading: "Projects",
    lead: "Engineering projects and AI solutions we built. Each one automates a concrete process — pick a direction or browse them all.",
    filterNav: "Project directions", filterAll: "All", noJs: "Filtering needs JavaScript. All projects are listed below.", shown: "Showing", projectsWord: "projects", filterChanged: "Filter:", noResults: "No projects in this direction yet.",
    categories: { documents: "Documents", requests: "Requests & routing", voice: "Voice & meetings", assistants: "AI assistants & Telegram bots", knowledge: "Knowledge bases & RAG", integrations: "Process automation & integrations", qa: "Test automation & QA", evaluation: "AI evaluation & model selection" },
    labels: { about: "About the project", how: "How it works", additionally: "Additionally", features: "Features", uses: "Where it can be used", tech: "Technologies", result: "Result", repo: "Repository on GitHub", back: "All projects", more: "More projects", open: "Open project", allProjects: "All projects" },
    home: { heading: "Projects", lead: "AI solutions and automations we built — from Telegram assistants to migration, testing and integration tools." },
    results: { heading: "Results", lead: "Real figures from our projects." },
  },
  uk: {
    heading: "Проєкти",
    lead: "Інженерні проєкти та AI-рішення, які ми створили. Кожне автоматизує конкретний процес — оберіть напрям або перегляньте всі.",
    filterNav: "Напрями проєктів", filterAll: "Усі", noJs: "Для фільтрації потрібен JavaScript. Нижче перелічено всі проєкти.", shown: "Показано", projectsWord: "проєктів", filterChanged: "Фільтр:", noResults: "У цьому напрямі поки немає проєктів.",
    categories: { documents: "Документи", requests: "Звернення та маршрутизація", voice: "Голос і зустрічі", assistants: "AI-асистенти та Telegram-боти", knowledge: "Бази знань і RAG", integrations: "Автоматизація процесів та інтеграції", qa: "Автоматизація тестування та QA", evaluation: "Оцінка та вибір AI" },
    labels: { about: "Про проєкт", how: "Як це працює", additionally: "Додатково", features: "Можливості", uses: "Де може застосовуватися", tech: "Технології", result: "Результат", repo: "Репозиторій на GitHub", back: "Усі проєкти", more: "Інші проєкти", open: "Відкрити проєкт", allProjects: "Усі проєкти" },
    home: { heading: "Проєкти", lead: "AI-рішення й автоматизації, які ми створили — від Telegram-асистентів до інструментів міграції, тестування та інтеграції." },
    results: { heading: "Результати", lead: "Реальні цифри з наших проєктів." },
  },
  ru: {
    heading: "Проекты",
    lead: "Инженерные проекты и AI-решения, которые мы создали. Каждое автоматизирует конкретный процесс — выберите направление или посмотрите все.",
    filterNav: "Направления проектов", filterAll: "Все", noJs: "Для фильтрации нужен JavaScript. Ниже перечислены все проекты.", shown: "Показано", projectsWord: "проектов", filterChanged: "Фильтр:", noResults: "В этом направлении пока нет проектов.",
    categories: { documents: "Документы", requests: "Заявки и маршрутизация", voice: "Голос и встречи", assistants: "AI-ассистенты и Telegram-боты", knowledge: "Базы знаний и RAG", integrations: "Автоматизация процессов и интеграции", qa: "Автоматизация тестирования и QA", evaluation: "Оценка и выбор AI" },
    labels: { about: "О проекте", how: "Как это работает", additionally: "Дополнительно", features: "Возможности", uses: "Где может применяться", tech: "Технологии", result: "Результат", repo: "Репозиторий на GitHub", back: "Все проекты", more: "Другие проекты", open: "Открыть проект", allProjects: "Все проекты" },
    home: { heading: "Проекты", lead: "AI-решения и автоматизации, которые мы создали — от Telegram-ассистентов до инструментов миграции, тестирования и интеграции." },
    results: { heading: "Результаты", lead: "Реальные цифры из наших проектов." },
  },
};
