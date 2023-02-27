const { clickElement, putText, getText } = require("./lib/commands.js");
const { selectDateTime, orderTickets } = require("./lib/util.js");

let page;
let data = "nav > a:nth-child(2) > span.page-nav__day-number";
let movieTime = "[data-seance-id='142']";      
let ticketHint = "p.ticket__hint";
let confirmingText = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  test("Should order one ticket for Movie", async () => {
    let row = 3;
    let seat = 2;
    await selectDateTime(page, data, movieTime);
    await orderTickets(page, row, seat);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  }, 50000);

  test("Should order several tickets for Movie", async () => {
    let row = 7;
    let seat1 = 4;
    let seat2 = 5;
    let seat3 = 6;
    let seat4 = 7;
    await selectDateTime(page, data, movieTime);
    await orderTickets(page,  row, seat1, seat2, seat3, seat4);
    const actual = await getText(page, ticketHint);
    expect(actual).toContain(confirmingText);
  }, 50000);

  test("Check if the place is taken after ordering ", async () => {
    let row = 2;
    let seat = 5;
    await selectDateTime(page, data, movieTime);
    await orderTickets(page, row, seat);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectDateTime(page, data, movieTime);
    const classExist = await page.$eval(
      `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`,
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(classExist).toEqual(true);
  });
});