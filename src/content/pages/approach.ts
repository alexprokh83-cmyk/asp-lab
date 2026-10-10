import type { Localized } from "../types";

export interface ApproachCopy {
  baseline: { heading: string; lead: string; items: string[] };
  method: { heading: string; lead: string; steps: { title: string; text: string }[] };
  testing: { heading: string; lead: string; items: { title: string; text: string }[] };
  human: { heading: string; text: string };
  report: { heading: string; label: string; items: string[] };
  decision: { heading: string; lead: string; items: { title: string; text: string }[] };
  pilot: { heading: string; lead: string; items: string[] };
  note: string;
}

export const approachCopy: Localized<ApproachCopy> = {
  en: {
    baseline: { heading: "Task definition and baseline", lead: "Before anything is built, the task is described well enough to be measured.", items: ["What is done today, and by whom", "Which data and documents are involved", "What result is wanted", "How long it takes and how accurate it is today (the baseline)", "What would count as success"] },
    method: { heading: "Build → Test → Measure → Automate", lead: "Four steps for one task.", steps: [
      { title: "Build", text: "Build a working solution for one task." },
      { title: "Test", text: "Check normal cases, failures and edge conditions." },
      { title: "Measure", text: "Compare agreed measures against the starting process." },
      { title: "Automate", text: "Integrate a verified scenario within agreed boundaries." } ] },
    testing: { heading: "Ordinary, error and edge-case testing", lead: "A solution that only works on the easy examples has not been tested.", items: [
      { title: "Ordinary cases", text: "Typical inputs, the way the task usually arrives." },
      { title: "Error cases", text: "Missing, malformed or contradictory inputs, and what the solution does with them." },
      { title: "Edge cases", text: "Unusually long, short, noisy or rare inputs." } ] },
    human: { heading: "Human review where relevant", text: "Where a mistake would matter, a person reviews the output before it is used. Which steps need review is decided per task and written down." },
    report: { heading: "Suggested report contents", label: "Template — not a completed report", items: ["Task and scope", "Data used and its limits", "Configuration", "Test cases and results, with absolute counts", "Errors and edge cases found", "Known limitations", "Recommendation: continue, revise or stop"] },
    decision: { heading: "Continue, revise or stop", lead: "The first stage ends with a decision, not automatically with a rollout.", items: [
      { title: "Continue", text: "The agreed measures are met on the tested cases and the limitations are acceptable." },
      { title: "Revise", text: "The idea is sound but results or limitations call for changes, then another round of testing." },
      { title: "Stop", text: "Results do not justify more work, or ordinary automation turns out to be enough." } ] },
    pilot: { heading: "A pilot has separate requirements", lead: "Moving to a pilot is a separate decision based on the results.", items: ["Its own scope and success measures", "Agreed access and data rules", "Where processing happens", "Error handling and logging", "Named responsibility for the results"] },
    note: "This describes how work is intended to proceed. It does not claim that every earlier project followed every practice listed.",
  },
  uk: {
    baseline: { heading: "Визначення задачі та базова лінія", lead: "Перш ніж щось будувати, задачу описують достатньо добре, щоб її можна було виміряти.", items: ["Що робиться сьогодні і ким", "Які дані та документи задіяно", "Який результат потрібен", "Скільки це триває і наскільки точно виконується сьогодні (базова лінія)", "Що вважатиметься успіхом"] },
    method: { heading: "Build → Test → Measure → Automate", lead: "Чотири кроки для однієї задачі.", steps: [
      { title: "Build", text: "Створити робоче рішення для однієї задачі." },
      { title: "Test", text: "Перевірити звичайні випадки, збої та крайні умови." },
      { title: "Measure", text: "Порівняти узгоджені показники з початковим процесом." },
      { title: "Automate", text: "Інтегрувати перевірений сценарій у межах домовленостей." } ] },
    testing: { heading: "Тестування звичайних, помилкових і крайніх випадків", lead: "Рішення, що працює лише на простих прикладах, не протестоване.", items: [
      { title: "Звичайні випадки", text: "Типові вхідні дані, у такому вигляді, як задача зазвичай надходить." },
      { title: "Помилкові випадки", text: "Відсутні, пошкоджені чи суперечливі вхідні дані та те, що з ними робить рішення." },
      { title: "Крайні випадки", text: "Незвично довгі, короткі, зашумлені чи рідкісні вхідні дані." } ] },
    human: { heading: "Перевірка людиною, де це доречно", text: "Там, де помилка має значення, результат перед використанням перевіряє людина. Які кроки потребують перевірки, визначається для кожної задачі та фіксується письмово." },
    report: { heading: "Запропонований зміст звіту", label: "Шаблон — не завершений звіт", items: ["Задача та межі", "Використані дані та їхні обмеження", "Конфігурація", "Тестові випадки та результати з абсолютними числами", "Знайдені помилки та крайні випадки", "Відомі обмеження", "Рекомендація: продовжити, переглянути чи зупинитися"] },
    decision: { heading: "Продовжити, переглянути чи зупинитися", lead: "Перший етап завершується рішенням, а не автоматично впровадженням.", items: [
      { title: "Продовжити", text: "Узгоджені показники досягнуто на перевірених випадках, а обмеження прийнятні." },
      { title: "Переглянути", text: "Ідея слушна, але результати чи обмеження вимагають змін, після чого ще один раунд тестування." },
      { title: "Зупинитися", text: "Результати не виправдовують подальшої роботи, або виявляється, що достатньо звичайної автоматизації." } ] },
    pilot: { heading: "Пілот має окремі вимоги", lead: "Перехід до пілоту — окреме рішення на основі результатів.", items: ["Власний обсяг і показники успіху", "Узгоджений доступ і правила щодо даних", "Де відбувається обробка", "Обробка помилок і журналювання", "Визначена відповідальність за результати"] },
    note: "Тут описано, як передбачається вести роботу. Це не твердження, що кожен попередній проєкт дотримувався кожної з наведених практик.",
  },
  ru: {
    baseline: { heading: "Определение задачи и базовая линия", lead: "Прежде чем что-либо строить, задачу описывают достаточно хорошо, чтобы её можно было измерить.", items: ["Что делается сегодня и кем", "Какие данные и документы задействованы", "Какой результат нужен", "Сколько это длится и насколько точно выполняется сегодня (базовая линия)", "Что будет считаться успехом"] },
    method: { heading: "Build → Test → Measure → Automate", lead: "Четыре шага для одной задачи.", steps: [
      { title: "Build", text: "Создать рабочее решение для одной задачи." },
      { title: "Test", text: "Проверить обычные случаи, сбои и граничные условия." },
      { title: "Measure", text: "Сравнить согласованные показатели с исходным процессом." },
      { title: "Automate", text: "Интегрировать проверенный сценарий в согласованных границах." } ] },
    testing: { heading: "Тестирование обычных, ошибочных и граничных случаев", lead: "Решение, работающее только на простых примерах, не протестировано.", items: [
      { title: "Обычные случаи", text: "Типичные входные данные в том виде, в каком задача обычно поступает." },
      { title: "Ошибочные случаи", text: "Отсутствующие, повреждённые или противоречивые входные данные и то, что с ними делает решение." },
      { title: "Граничные случаи", text: "Необычно длинные, короткие, зашумлённые или редкие входные данные." } ] },
    human: { heading: "Проверка человеком, где это уместно", text: "Там, где ошибка имеет значение, результат перед использованием проверяет человек. Какие шаги требуют проверки, определяется для каждой задачи и фиксируется письменно." },
    report: { heading: "Предлагаемое содержание отчёта", label: "Шаблон — не завершённый отчёт", items: ["Задача и границы", "Использованные данные и их ограничения", "Конфигурация", "Тестовые случаи и результаты с абсолютными числами", "Найденные ошибки и граничные случаи", "Известные ограничения", "Рекомендация: продолжить, пересмотреть или остановиться"] },
    decision: { heading: "Продолжить, пересмотреть или остановиться", lead: "Первый этап завершается решением, а не автоматически внедрением.", items: [
      { title: "Продолжить", text: "Согласованные показатели достигнуты на проверенных случаях, а ограничения приемлемы." },
      { title: "Пересмотреть", text: "Идея разумна, но результаты или ограничения требуют изменений, после чего ещё один раунд тестирования." },
      { title: "Остановиться", text: "Результаты не оправдывают дальнейшей работы, либо оказывается, что достаточно обычной автоматизации." } ] },
    pilot: { heading: "У пилота отдельные требования", lead: "Переход к пилоту — отдельное решение на основе результатов.", items: ["Собственный объём и показатели успеха", "Согласованный доступ и правила по данным", "Где происходит обработка", "Обработка ошибок и журналирование", "Назначенная ответственность за результаты"] },
    note: "Здесь описано, как предполагается вести работу. Это не утверждение, что каждый прежний проект следовал каждой из перечисленных практик.",
  },
};
