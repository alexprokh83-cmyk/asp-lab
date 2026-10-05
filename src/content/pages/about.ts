import type { Localized } from "../types";

export interface AboutCopy {
  purpose: { heading: string; text: string };
  principles: { heading: string; items: string[] };
  foundations: { heading: string; text: string };
  capabilities: { heading: string; lead: string };
}

export const aboutCopy: Localized<AboutCopy> = {
  en: {
    purpose: { heading: "Purpose", text: "ASP Lab (Automation of Systems & Processes) is a practical AI engineering laboratory. It turns an AI idea into a concrete solution: define the task, choose the approach, build a prototype, evaluate the result and determine the next step." },
    principles: { heading: "Engineering principles", items: ["Start with one concrete process, not a model.", "Measure against the starting process.", "Show limitations next to results.", "Keep external services visible as external.", "Evaluation is a discipline, not a final check."] },
    foundations: { heading: "Automation and evaluation", text: "The laboratory’s work rests on workflow automation and on testing AI systems: functional checks, adversarial checks and model comparison. It is developing toward Local / Private AI model engineering." },
    capabilities: { heading: "Current, developing and planned capabilities", lead: "Kept separate on purpose. “Confirmed by projects” does not mean deployed for customers." },
  },
  uk: {
    purpose: { heading: "Мета", text: "ASP Lab (Автоматизація систем і процесів) — практична лабораторія AI-інженерії. Вона перетворює AI-ідею на конкретне рішення: визначити задачу, обрати підхід, створити прототип, оцінити результат і визначити наступний крок." },
    principles: { heading: "Інженерні принципи", items: ["Починати з одного конкретного процесу, а не з моделі.", "Вимірювати відносно початкового процесу.", "Показувати обмеження поруч із результатами.", "Тримати зовнішні сервіси видимими як зовнішні.", "Оцінювання — це дисципліна, а не фінальна перевірка."] },
    foundations: { heading: "Автоматизація та оцінювання", text: "Робота лабораторії спирається на автоматизацію процесів і тестування AI-систем: функціональні перевірки, змагальні перевірки та порівняння моделей. Лабораторія розвивається в бік інженерії Local / Private AI моделей." },
    capabilities: { heading: "Поточні, розвиваються та заплановані можливості", lead: "Розділено навмисно. «Підтверджено проєктами» не означає впровадження для клієнтів." },
  },
  ru: {
    purpose: { heading: "Цель", text: "ASP Lab (Автоматизация систем и процессов) — практическая лаборатория AI-инженерии. Она превращает AI-идею в конкретное решение: определить задачу, выбрать подход, создать прототип, оценить результат и определить следующий шаг." },
    principles: { heading: "Инженерные принципы", items: ["Начинать с одного конкретного процесса, а не с модели.", "Измерять относительно исходного процесса.", "Показывать ограничения рядом с результатами.", "Держать внешние сервисы видимыми как внешние.", "Оценка — это дисциплина, а не финальная проверка."] },
    foundations: { heading: "Автоматизация и оценка", text: "Работа лаборатории опирается на автоматизацию процессов и тестирование AI-систем: функциональные проверки, состязательные проверки и сравнение моделей. Лаборатория развивается в сторону инженерии Local / Private AI моделей." },
    capabilities: { heading: "Текущие, развивающиеся и запланированные возможности", lead: "Разделены намеренно. «Подтверждено проектами» не означает внедрения для клиентов." },
  },
};
