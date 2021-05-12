import selenium from 'selenium-webdriver';

const builder = selenium.Builder;
const by = selenium.By;
const until = selenium.until;

const capabilities = selenium.Capabilities.chrome();
capabilities.set('chromeOptions', {
  args: [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    // other chrome options
  ],
});

const main = async (): Promise<void> => {
  const driver = await new builder().withCapabilities(capabilities).build();
  // ここに処理を書く
  await driver.get('https://www.youtube.com/');

  // 終了
  const quit = await driver.quit();
  console.log(quit);
};

export default main;
