import selenium from 'selenium-webdriver';

const builder = selenium.Builder;
const by = selenium.By;
const until = selenium.until;
const url = '';
const setting = {
  id: '',
  first: { x: 0, y: 0 },
  second: { x: 0, y: 0 },
};

//calc
const first_s = setting.first.x * setting.first.y * 4 - 4;
const second_s = setting.second.x * setting.second.y * 4 - 4;
const keyArr = [
  `BTN${first_s}`,
  `BTN${first_s + 1}`,
  `BTN${first_s + 2}`,
  `BTN${first_s + 3}`,
  `BTN${second_s}`,
  `BTN${second_s + 1}`,
  `BTN${second_s + 2}`,
  `BTN${second_s + 3}`,
];

const capabilities = selenium.Capabilities.chrome();
capabilities.set('chromeOptions', {
  args: [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    // other chrome options
  ],
});

const getKey = async (): Promise<void> => {
  const driver = await new builder().withCapabilities(capabilities).build();
  await driver.get(url);
  await driver.findElement(by.name('LOGIN_ID')).sendKeys(setting.id);
  const buttons = await driver.findElements(by.className('btnCustom'));
  await buttons[0].click();
  await driver.wait(until.elementLocated(by.id('printMatrix0')), 10000);
  await driver.wait(until.elementLocated(by.name('BTN0')), 10000);

  // get keys
  let result = '';
  /* eslint prefer-const: 0 */
  for (let val of keyArr) {
    const keynum = await driver.findElement(by.name(val)).getAttribute('alt');
    result = result + keynum;
  }
  console.log(result);
  await driver.quit();
  return;
};

export default getKey;
