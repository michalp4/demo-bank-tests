import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  //test.describe.configure({ retries: 3 }); - powtarzanie testów - 3 razy w tym wypadku
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test(
    'quick payment with correct data',
    {
      tag: ['@pulpit', '@integration'],
      annotation: {
        type: 'documentation',
        description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
      },
    },
    async ({ page }) => {
      // Arrange
      const recieverId = '2';
      const transferAmount = '150';
      const transferTitle = 'pizza';
      const expectedTransferReciever = 'Chuck Demobankowy';

      // Act
      await page.waitForLoadState('domcontentloaded');
      await pulpitPage.executeQuickPayment(
        recieverId,
        transferAmount,
        transferTitle,
      );

      // Assert
      await expect(pulpitPage.messageText).toHaveText(
        `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );

  test(
    'successful mobile top-up',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const topUpReciever = '500 xxx xxx';
      const topUpAmount = '50';
      const expectedMessage = `Doładowanie wykonane!  ${topUpAmount},00PLN na numer ${topUpReciever}`;

      // Act
      await pulpitPage.executeMobileTopUp(topUpReciever, topUpAmount);

      // Assert
      await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    },
  );

  test(
    'correct balance after successful mobile top-up',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const topUpReciever = '500 xxx xxx';
      const topUpAmount = '50';
      const initialBalance = await page.locator('#money_value').innerText();
      const expectedBalance = Number(initialBalance) - Number(topUpAmount);

      // Act
      await pulpitPage.executeMobileTopUp(topUpReciever, topUpAmount);

      // Assert
      await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
    },
  );
});
