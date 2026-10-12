import type { Localized } from "../types";

export interface AboutCopy {
  purpose: { heading: string; text: string };
  principles: { heading: string; items: string[] };
  author: {
    heading: string;
    name: string;
    role: string;
    photoAlt: string;
    socialProfilesLabel: string;
    paragraphs: string[];
    shareLead: string;
    linkedinText: string;
  };
  foundations: { heading: string; text: string };
  capabilities: { heading: string; lead: string };
}

export const aboutCopy: Localized<AboutCopy> = {
  en: {
    purpose: { heading: "Purpose", text: "ASP Lab (Automation of Systems & Processes) is a practical AI engineering laboratory. It turns an AI idea into a concrete solution: define the task, choose the approach, build a working solution, evaluate the result and determine the next step." },
    principles: { heading: "Engineering principles", items: ["Start with one concrete process, not a model.", "Measure against the starting process.", "Show limitations next to results.", "Keep external services visible as external.", "Evaluation is a discipline, not a final check."] },
    author: {
      heading: "Initiative founder",
      name: "Alexandr Prokhoda",
      role: "Initiative founder & Systems Engineer",
      photoAlt: "Portrait of Alexandr Prokhoda",
      socialProfilesLabel: "Social profiles",
      paragraphs: [
        "With over 20 years of hands-on systems engineering experience, my work has ranged from assembling hardware, configuring networks and deploying local infrastructure to integrating systems. In recent years, my focus has shifted to practical AI, workflow automation with n8n and quality assurance (QA).",
        "ASP Lab is not about abstract theory. We build working automation setups from real components, test them for reliability and implement them so technology works predictably and consistently.",
      ],
      shareLead: "I share practical experience, automation breakdowns and local LLM tests on",
      linkedinText: "my LinkedIn",
    },
    foundations: { heading: "Automation and evaluation", text: "The laboratory’s work rests on workflow automation and on testing AI systems: functional checks, adversarial checks and model comparison. It is developing toward Local / Private AI model engineering." },
    capabilities: { heading: "Current, developing and planned capabilities", lead: "Kept separate on purpose. “Confirmed by projects” does not mean deployed for customers." },
  },
  uk: {
    purpose: { heading: "Мета", text: "ASP Lab (Автоматизація систем і процесів) — практична лабораторія AI-інженерії. Вона перетворює AI-ідею на конкретне рішення: визначити задачу, обрати підхід, створити робоче рішення, оцінити результат і визначити наступний крок." },
    principles: { heading: "Інженерні принципи", items: ["Починати з одного конкретного процесу, а не з моделі.", "Вимірювати відносно початкового процесу.", "Показувати обмеження поруч із результатами.", "Тримати зовнішні сервіси видимими як зовнішні.", "Оцінювання — це дисципліна, а не фінальна перевірка."] },
    author: {
      heading: "Автор ініціативи",
      name: "Олександр Прохода",
      role: "Автор ініціативи та системний інженер",
      photoAlt: "Портрет Олександра Проходи",
      socialProfilesLabel: "Профілі в соціальних мережах",
      paragraphs: [
        "За плечима — понад 20 років практичного досвіду в системній інженерії: від складання обладнання, налаштування мереж і розгортання локальних інфраструктур до інтеграції систем. Останніми роками фокус змістився на практичне застосування AI, автоматизацію робочих процесів на n8n і забезпечення якості (QA).",
        "ASP Lab не займається абстрактною теорією. Ми збираємо робочі контури автоматизації з реальних компонентів, тестуємо їх на надійність і впроваджуємо так, щоб технології працювали передбачувано та стабільно.",
      ],
      shareLead: "Ділюся практичним досвідом, розборами автоматизацій і тестами локальних LLM у",
      linkedinText: "моєму LinkedIn",
    },
    foundations: { heading: "Автоматизація та оцінювання", text: "Робота лабораторії спирається на автоматизацію процесів і тестування AI-систем: функціональні перевірки, змагальні перевірки та порівняння моделей. Лабораторія розвивається в бік інженерії Local / Private AI моделей." },
    capabilities: { heading: "Поточні, розвиваються та заплановані можливості", lead: "Розділено навмисно. «Підтверджено проєктами» не означає впровадження для клієнтів." },
  },
  ru: {
    purpose: { heading: "Цель", text: "ASP Lab (Автоматизация систем и процессов) — практическая лаборатория AI-инженерии. Она превращает AI-идею в конкретное решение: определить задачу, выбрать подход, создать рабочее решение, оценить результат и определить следующий шаг." },
    principles: { heading: "Инженерные принципы", items: ["Начинать с одного конкретного процесса, а не с модели.", "Измерять относительно исходного процесса.", "Показывать ограничения рядом с результатами.", "Держать внешние сервисы видимыми как внешние.", "Оценка — это дисциплина, а не финальная проверка."] },
    author: {
      heading: "Автор инициативы",
      name: "Александр Прохода",
      role: "Автор инициативы & Системный инженер",
      photoAlt: "Портрет Александра Проходы",
      socialProfilesLabel: "Профили в социальных сетях",
      paragraphs: [
        "За плечами — более 20 лет практического опыта в системной инженерии: от сборки оборудования, настройки сетей и развертывания локальных инфраструктур до интеграции систем. Последние годы фокус сместился на практическое применение AI, автоматизацию рабочих процессов на n8n и обеспечение качества (QA).",
        "ASP Lab не занимается абстрактной теорией. Мы собираем рабочие контуры автоматизации из реальных компонентов, тестируем их на надежность и внедряем так, чтобы технологии работали предсказуемо и стабильно.",
      ],
      shareLead: "Делюсь практическим опытом, разборами автоматизаций и тестами локальных LLM в",
      linkedinText: "моем LinkedIn",
    },
    foundations: { heading: "Автоматизация и оценка", text: "Работа лаборатории опирается на автоматизацию процессов и тестирование AI-систем: функциональные проверки, состязательные проверки и сравнение моделей. Лаборатория развивается в сторону инженерии Local / Private AI моделей." },
    capabilities: { heading: "Текущие, развивающиеся и запланированные возможности", lead: "Разделены намеренно. «Подтверждено проектами» не означает внедрения для клиентов." },
  },
};
