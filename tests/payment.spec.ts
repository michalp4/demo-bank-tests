import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test(
    'simple payment',
    {
      tag: ['@payment', '@integration'],
      annotation: {
        type: 'documentation',
        description:
          'More to find at: https://jaktestowac.pl/lesson/pw1s04l04/',
      },
    },
    async ({ page }) => {
      // Arrange
      const transferReciever = 'Jan Nowak';
      const transferAccount = '12 3456 7890 1234 5678 9012 36459';
      const transferAmount = '222';
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

      // Act
      await paymentPage.makeTransfer(
        transferReciever,
        transferAccount,
        transferAmount,
      );

      // Assert
      await expect(paymentPage.messageText).toHaveText(expectedMessage);
    },
  );
});
