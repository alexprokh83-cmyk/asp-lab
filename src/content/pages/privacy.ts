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
      { heading: "What this website does", items: ["The site is a set of static pages.", "This version has no contact form. Nothing you type is submitted through the site.", "This version uses no analytics, advertising pixels or session replay, and no third-party fonts.", "The hosting provider may keep technical server logs. What is kept, and for how long, has not yet been documented here."] },
      { heading: "External destinations", items: ["The Telegram button opens Telegram, an external service. What you send there is handled by Telegram, not by this website.", "Do not send credentials, confidential documents, third-party personal information or student information in an initial message."] },
    ],
    contactHeading: "Operator and contact",
    pending: ["Site operator", "Legal identity, if applicable", "Privacy contact", "Hosting provider and actual logging practices", "Actual processors or recipients", "Retention", "Legal basis and any required consent wording", "Applicable policy wording and approval date"],
  },
  uk: {
    sections: [
      { heading: "Що робить цей сайт", items: ["Сайт — це набір статичних сторінок.", "У цій версії немає контактної форми. Нічого з того, що ви вводите, не надсилається через сайт.", "У цій версії не використовуються аналітика, рекламні пікселі чи запис сесій, а також сторонні шрифти.", "Хостинг-провайдер може зберігати технічні журнали сервера. Що саме зберігається і як довго, тут поки не задокументовано."] },
      { heading: "Зовнішні призначення", items: ["Кнопка Telegram відкриває Telegram, зовнішній сервіс. Те, що ви там надсилаєте, обробляє Telegram, а не цей сайт.", "Не надсилайте в першому повідомленні облікові дані, конфіденційні документи, персональні дані третіх осіб чи дані учнів."] },
    ],
    contactHeading: "Оператор і контакти",
    pending: ["Оператор сайту", "Юридична особа, якщо застосовно", "Контакт з питань приватності", "Хостинг-провайдер і фактичні практики журналювання", "Фактичні обробники чи отримувачі", "Строки зберігання", "Правова підстава та будь-які потрібні формулювання згоди", "Застосовні формулювання політики та дата затвердження"],
  },
  ru: {
    sections: [
      { heading: "Что делает этот сайт", items: ["Сайт — это набор статических страниц.", "В этой версии нет контактной формы. Ничего из того, что вы вводите, не отправляется через сайт.", "В этой версии не используются аналитика, рекламные пиксели или запись сессий, а также сторонние шрифты.", "Хостинг-провайдер может хранить технические журналы сервера. Что именно хранится и как долго, здесь пока не задокументировано."] },
      { heading: "Внешние адресаты", items: ["Кнопка Telegram открывает Telegram, внешний сервис. То, что вы там отправляете, обрабатывает Telegram, а не этот сайт.", "Не отправляйте в первом сообщении учётные данные, конфиденциальные документы, персональные данные третьих лиц или данные учащихся."] },
    ],
    contactHeading: "Оператор и контакты",
    pending: ["Оператор сайта", "Юридическое лицо, если применимо", "Контакт по вопросам приватности", "Хостинг-провайдер и фактические практики журналирования", "Фактические обработчики или получатели", "Сроки хранения", "Правовое основание и любые необходимые формулировки согласия", "Применимые формулировки политики и дата утверждения"],
  },
};
