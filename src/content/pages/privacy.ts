/** Factual only. No legal text is invented. */
import type { Localized } from "../types";

export interface PrivacyCopy {
  sections: { heading: string; items: string[] }[];
  contactHeading: string;
  pending: string[];
}

export const privacyCopy: Localized<PrivacyCopy> = {
  en: {
    sections: [
      { heading: "What this website does", items: ["The site is a set of static pages.", "The contact form sends the submitted name, email, optional phone number and message directly to the configured n8n webhook. The current frontend configuration targets its test URL.", "After a confirmed submission, the form stores a timestamp in your browser's local storage for a 60-second cooldown.", "This version uses no analytics, advertising pixels or session replay, and no third-party fonts.", "The hosting provider may keep technical server logs. What is kept, and for how long, depends on the hosting provider."] },
      { heading: "External destinations", items: ["The Telegram button opens Telegram, an external service. What you send there is handled by Telegram, not by this website.", "Do not send credentials, confidential documents, third-party personal information or student information in an initial message."] },
    ],
    contactHeading: "Operator and contact",
    pending: ["Site operator", "Legal identity, if applicable", "Privacy contact", "Hosting provider and actual logging practices", "Actual processors or recipients", "Retention", "Legal basis and any required consent wording", "Applicable policy wording and approval date"],
  },
  uk: {
    sections: [
      { heading: "Що робить цей сайт", items: ["Сайт — це набір статичних сторінок.", "Контактна форма надсилає вказані ім’я, email, необов’язковий номер телефону та повідомлення безпосередньо до налаштованого вебхука n8n. Поточна конфігурація frontend використовує тестову URL-адресу.", "Після підтвердженого надсилання форма зберігає часову позначку в локальному сховищі браузера для 60-секундного періоду очікування.", "У цій версії не використовуються аналітика, рекламні пікселі чи запис сесій, а також сторонні шрифти.", "Хостинг-провайдер може зберігати технічні журнали сервера. Що саме зберігається і як довго, залежить від хостинг-провайдера."] },
      { heading: "Зовнішні призначення", items: ["Кнопка Telegram відкриває Telegram, зовнішній сервіс. Те, що ви там надсилаєте, обробляє Telegram, а не цей сайт.", "Не надсилайте в першому повідомленні облікові дані, конфіденційні документи, персональні дані третіх осіб чи дані учнів."] },
    ],
    contactHeading: "Оператор і контакти",
    pending: ["Оператор сайту", "Юридична особа, якщо застосовно", "Контакт з питань приватності", "Хостинг-провайдер і фактичні практики журналювання", "Фактичні обробники чи отримувачі", "Строки зберігання", "Правова підстава та будь-які потрібні формулювання згоди", "Застосовні формулювання політики та дата затвердження"],
  },
  ru: {
    sections: [
      { heading: "Что делает этот сайт", items: ["Сайт — это набор статических страниц.", "Контактная форма отправляет указанные имя, email, необязательный номер телефона и сообщение напрямую в настроенный вебхук n8n. Текущая конфигурация frontend использует тестовый URL.", "После подтверждённой отправки форма сохраняет временную отметку в локальном хранилище браузера для 60-секундного периода ожидания.", "В этой версии не используются аналитика, рекламные пиксели или запись сессий, а также сторонние шрифты.", "Хостинг-провайдер может хранить технические журналы сервера. Что именно хранится и как долго, зависит от хостинг-провайдера."] },
      { heading: "Внешние адресаты", items: ["Кнопка Telegram открывает Telegram, внешний сервис. То, что вы там отправляете, обрабатывает Telegram, а не этот сайт.", "Не отправляйте в первом сообщении учётные данные, конфиденциальные документы, персональные данные третьих лиц или данные учащихся."] },
    ],
    contactHeading: "Оператор и контакты",
    pending: ["Оператор сайта", "Юридическое лицо, если применимо", "Контакт по вопросам приватности", "Хостинг-провайдер и фактические практики журналирования", "Фактические обработчики или получатели", "Сроки хранения", "Правовое основание и любые необходимые формулировки согласия", "Применимые формулировки политики и дата утверждения"],
  },
};
